import {
  createDirectRelationship,
  IntegrationStep,
  RelationshipClass,
} from '@jupiterone/integration-sdk-core';
import { CloudFunctionsClient } from './client';
import { IntegrationConfig, IntegrationStepContext } from '../../types';
import { createCloudFunctionEntity } from './converters';
import {
  CLOUD_FUNCTION_ENTITY_TYPE,
  STEP_CLOUD_FUNCTIONS,
  CLOUD_FUNCTION_ENTITY_CLASS,
  RELATIONSHIP_TYPE_CLOUD_FUNCTION_USES_IAM_SERVICE_ACCOUNT,
  STEP_CLOUD_FUNCTIONS_SERVICE_ACCOUNT_RELATIONSHIPS,
} from './constants';
import {
  IAM_SERVICE_ACCOUNT_ENTITY_TYPE,
  STEP_IAM_SERVICE_ACCOUNTS,
} from '../iam';

export * from './constants';

export async function fetchCloudFunctions(
  context: IntegrationStepContext,
): Promise<void> {
  const { jobState } = context;
  const client = new CloudFunctionsClient({ config: context.instance.config });

  await client.iterateCloudFunctions(async (cloudFunction) => {
    await jobState.addEntity(createCloudFunctionEntity(cloudFunction));
  });
}

export async function buildCloudFunctionServiceAccountRelationships(
  context: IntegrationStepContext,
): Promise<void> {
  const { jobState } = context;

  await jobState.iterateEntities(
    {
      _type: CLOUD_FUNCTION_ENTITY_TYPE,
    },
    async (cloudFunctionEntity) => {
      const serviceAccountEmail = cloudFunctionEntity.serviceAccountEmail as
        | string
        | undefined;

      if (!serviceAccountEmail) {
        return;
      }

      const serviceAccountEntity = await jobState.findEntity(
        serviceAccountEmail,
      );

      if (!serviceAccountEntity) {
        return;
      }

      await jobState.addRelationship(
        createDirectRelationship({
          _class: RelationshipClass.USES,
          from: cloudFunctionEntity,
          to: serviceAccountEntity,
        }),
      );
    },
  );
}

export const functionsSteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: STEP_CLOUD_FUNCTIONS,
    name: 'Cloud Functions',
    dependsOn: [],
    entities: [
      {
        resourceName: 'Cloud Function',
        _type: CLOUD_FUNCTION_ENTITY_TYPE,
        _class: CLOUD_FUNCTION_ENTITY_CLASS,
      },
    ],
    relationships: [],
    executionHandler: fetchCloudFunctions,
  },
  {
    id: STEP_CLOUD_FUNCTIONS_SERVICE_ACCOUNT_RELATIONSHIPS,
    name: 'Cloud Function Service Account Relationships',
    dependsOn: [STEP_CLOUD_FUNCTIONS, STEP_IAM_SERVICE_ACCOUNTS],
    entities: [],
    relationships: [
      {
        _class: RelationshipClass.USES,
        _type: RELATIONSHIP_TYPE_CLOUD_FUNCTION_USES_IAM_SERVICE_ACCOUNT,
        sourceType: CLOUD_FUNCTION_ENTITY_TYPE,
        targetType: IAM_SERVICE_ACCOUNT_ENTITY_TYPE,
      },
    ],
    executionHandler: buildCloudFunctionServiceAccountRelationships,
  },
];
