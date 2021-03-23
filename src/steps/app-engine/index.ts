import {
  createDirectRelationship,
  Entity,
  IntegrationStep,
  RelationshipClass,
} from '@jupiterone/integration-sdk-core';
import { appengine_v1 } from 'googleapis';
import { IntegrationConfig, IntegrationStepContext } from '../../types';
import { publishMissingPermissionEvent } from '../../utils/events';
import { AppEngineClient } from './client';
import {
  STEP_APP_ENGINE_APPLICATION,
  STEP_APP_ENGINE_SERVICES,
  STEP_APP_ENGINE_VERSIONS,
  STEP_APP_ENGINE_INSTANCES,
  ENTITY_TYPE_APP_ENGINE_APPLICATION,
  ENTITY_CLASS_APP_ENGINE_APPLICATION,
  ENTITY_TYPE_APP_ENGINE_SERVICE,
  ENTITY_CLASS_APP_ENGINE_SERVICE,
  ENTITY_TYPE_APP_ENGINE_VERSION,
  ENTITY_CLASS_APP_ENGINE_VERSION,
  ENTITY_TYPE_APP_ENGINE_INSTANCE,
  ENTITY_CLASS_APP_ENGINE_INSTANCE,
  RELATIONSHIP_TYPE_APP_ENGINE_APPLICATION_HAS_SERVICE,
  RELATIONSHIP_TYPE_APP_ENGINE_SERVICE_HAS_VERSION,
  RELATIONSHIP_TYPE_APP_ENGINE_VERSION_HAS_INSTANCE,
  RELATIONSHIP_TYPE_APP_ENGINE_APPLICATION_USES_BUCKET,
  RELATIONSHIP_TYPE_USER_CREATED_VERSION,
  RELATIONSHIP_TYPE_SERVICE_ACCOUNT_CREATED_VERSION,
} from './constants';
import {
  createAppEngineApplicationEntity,
  createAppEngineInstanceEntity,
  createAppEngineServiceEntity,
  createAppEngineVersionEntity,
} from './converters';
import { getCloudStorageBucketKey } from '../storage/converters';
import {
  CLOUD_STORAGE_BUCKET_ENTITY_TYPE,
  STEP_CLOUD_STORAGE_BUCKETS,
} from '../storage';
import { STEP_RESOURCE_MANAGER_IAM_POLICY } from '../resource-manager';
import {
  IAM_SERVICE_ACCOUNT_ENTITY_TYPE,
  IAM_USER_ENTITY_TYPE,
  STEP_IAM_SERVICE_ACCOUNTS,
} from '../iam';

export async function fetchAppEngineApplication(
  context: IntegrationStepContext,
): Promise<void> {
  const {
    jobState,
    instance: { config },
    logger,
  } = context;
  const client = new AppEngineClient({ config });

  let application: appengine_v1.Schema$Application;

  try {
    application = await client.getAppEngineApplication();
  } catch (err) {
    if (err.code === 403) {
      logger.trace(
        { err },
        'Could not fetch app engine application. Requires additional permission',
      );

      publishMissingPermissionEvent({
        logger,
        permission: 'appengine.applications.get',
        stepId: STEP_APP_ENGINE_APPLICATION,
      });

      return;
    }

    throw err;
  }

  if (application) {
    const applicationEntity = createAppEngineApplicationEntity(
      application,
      client.projectId,
    );

    // There's 1:1 mapping of GCloud project to AppEngine application, we can use this for easy access later
    await jobState.setData(
      ENTITY_TYPE_APP_ENGINE_APPLICATION,
      applicationEntity,
    );
    await jobState.addEntity(applicationEntity);

    if (application.defaultBucket) {
      const defaultBucketEntity = await jobState.findEntity(
        getCloudStorageBucketKey(application.defaultBucket),
      );
      if (defaultBucketEntity) {
        await jobState.addRelationship(
          createDirectRelationship({
            _class: RelationshipClass.USES,
            from: applicationEntity,
            to: defaultBucketEntity,
          }),
        );
      }
    }

    if (application.codeBucket) {
      const codeBucketEntity = await jobState.findEntity(
        getCloudStorageBucketKey(application.codeBucket),
      );
      if (codeBucketEntity) {
        await jobState.addRelationship(
          createDirectRelationship({
            _class: RelationshipClass.USES,
            from: applicationEntity,
            to: codeBucketEntity,
          }),
        );
      }
    }
  }
}

export async function fetchAppEngineServices(
  context: IntegrationStepContext,
): Promise<void> {
  const {
    jobState,
    instance: { config },
  } = context;

  const client = new AppEngineClient({ config });

  await client.iterateAppEngineServices(async (service) => {
    const serviceEntity = createAppEngineServiceEntity(service);
    await jobState.addEntity(serviceEntity);

    // There's 1:1 mapping of GCloud project to AppEngine application
    // So we can safely map these to the only one existing app engine application
    const applicationEntity = await jobState.getData<Entity>(
      ENTITY_TYPE_APP_ENGINE_APPLICATION,
    );
    if (applicationEntity) {
      await jobState.addRelationship(
        createDirectRelationship({
          _class: RelationshipClass.HAS,
          from: applicationEntity,
          to: serviceEntity,
        }),
      );
    }
  });
}

export async function fetchAppEngineServiceVersions(
  context: IntegrationStepContext,
): Promise<void> {
  const {
    jobState,
    instance: { config },
  } = context;

  const client = new AppEngineClient({ config });

  await jobState.iterateEntities(
    {
      _type: ENTITY_TYPE_APP_ENGINE_SERVICE,
    },
    async (serviceEntity) => {
      if (serviceEntity) {
        const serviceId = (serviceEntity.name as string).split('/')[3];

        await client.iterateAppEngineServiceVersions(
          serviceId,
          async (version) => {
            const versionEntity = createAppEngineVersionEntity(
              version,
              client.projectId,
            );
            await jobState.addEntity(versionEntity);
            await jobState.addRelationship(
              createDirectRelationship({
                _class: RelationshipClass.HAS,
                from: serviceEntity,
                to: versionEntity,
              }),
            );

            if (version.createdBy) {
              // This can either be google_user or google_iam_service_account (both use email as their _key, so it depends on who created this)
              const creatorEntity = await jobState.findEntity(
                version.createdBy,
              );

              if (creatorEntity) {
                await jobState.addRelationship(
                  createDirectRelationship({
                    _class: RelationshipClass.CREATED,
                    from: creatorEntity,
                    to: versionEntity,
                  }),
                );
              }
            }
          },
        );
      }
    },
  );
}

export async function fetchAppEngineVersionInstances(
  context: IntegrationStepContext,
): Promise<void> {
  const {
    jobState,
    instance: { config },
  } = context;

  const client = new AppEngineClient({ config });

  await jobState.iterateEntities(
    {
      _type: ENTITY_TYPE_APP_ENGINE_VERSION,
    },
    async (versionEntity) => {
      if (versionEntity) {
        const serviceId = (versionEntity.name as string).split('/')[3];
        const versionId = (versionEntity.name as string).split('/')[5];

        await client.iterateAppEngineVersionInstances(
          serviceId,
          versionId,
          async (instance) => {
            const instanceEntity = createAppEngineInstanceEntity(instance);

            await jobState.addEntity(instanceEntity);
            await jobState.addRelationship(
              createDirectRelationship({
                _class: RelationshipClass.HAS,
                from: versionEntity,
                to: instanceEntity,
              }),
            );
          },
        );
      }
    },
  );
}

export const appEngineSteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: STEP_APP_ENGINE_APPLICATION,
    name: 'AppEngine Application',
    entities: [
      {
        resourceName: 'AppEngine Application',
        _type: ENTITY_TYPE_APP_ENGINE_APPLICATION,
        _class: ENTITY_CLASS_APP_ENGINE_APPLICATION,
      },
    ],
    relationships: [
      {
        _class: RelationshipClass.USES,
        _type: RELATIONSHIP_TYPE_APP_ENGINE_APPLICATION_USES_BUCKET,
        sourceType: ENTITY_TYPE_APP_ENGINE_APPLICATION,
        targetType: CLOUD_STORAGE_BUCKET_ENTITY_TYPE,
      },
    ],
    dependsOn: [STEP_CLOUD_STORAGE_BUCKETS],
    executionHandler: fetchAppEngineApplication,
  },
  {
    id: STEP_APP_ENGINE_SERVICES,
    name: 'AppEngine Services',
    entities: [
      {
        resourceName: 'AppEngine Service',
        _type: ENTITY_TYPE_APP_ENGINE_SERVICE,
        _class: ENTITY_CLASS_APP_ENGINE_SERVICE,
      },
    ],
    relationships: [
      {
        _class: RelationshipClass.HAS,
        _type: RELATIONSHIP_TYPE_APP_ENGINE_APPLICATION_HAS_SERVICE,
        sourceType: ENTITY_TYPE_APP_ENGINE_APPLICATION,
        targetType: ENTITY_TYPE_APP_ENGINE_SERVICE,
      },
    ],
    dependsOn: [STEP_APP_ENGINE_APPLICATION],
    executionHandler: fetchAppEngineServices,
  },
  {
    id: STEP_APP_ENGINE_VERSIONS,
    name: 'AppEngine Versions',
    entities: [
      {
        resourceName: 'AppEngine Version',
        _type: ENTITY_TYPE_APP_ENGINE_VERSION,
        _class: ENTITY_CLASS_APP_ENGINE_VERSION,
      },
    ],
    relationships: [
      {
        _class: RelationshipClass.HAS,
        _type: RELATIONSHIP_TYPE_APP_ENGINE_SERVICE_HAS_VERSION,
        sourceType: ENTITY_TYPE_APP_ENGINE_SERVICE,
        targetType: ENTITY_TYPE_APP_ENGINE_VERSION,
      },
      {
        _class: RelationshipClass.CREATED,
        _type: RELATIONSHIP_TYPE_USER_CREATED_VERSION,
        sourceType: IAM_USER_ENTITY_TYPE,
        targetType: ENTITY_TYPE_APP_ENGINE_VERSION,
      },
      {
        _class: RelationshipClass.CREATED,
        _type: RELATIONSHIP_TYPE_SERVICE_ACCOUNT_CREATED_VERSION,
        sourceType: IAM_SERVICE_ACCOUNT_ENTITY_TYPE,
        targetType: ENTITY_TYPE_APP_ENGINE_VERSION,
      },
    ],
    dependsOn: [
      STEP_APP_ENGINE_SERVICES,
      STEP_RESOURCE_MANAGER_IAM_POLICY,
      STEP_IAM_SERVICE_ACCOUNTS,
    ],
    executionHandler: fetchAppEngineServiceVersions,
  },
  {
    id: STEP_APP_ENGINE_INSTANCES,
    name: 'AppEngine Instances',
    entities: [
      {
        resourceName: 'AppEngine Instance',
        _type: ENTITY_TYPE_APP_ENGINE_INSTANCE,
        _class: ENTITY_CLASS_APP_ENGINE_INSTANCE,
      },
    ],
    relationships: [
      {
        _class: RelationshipClass.HAS,
        _type: RELATIONSHIP_TYPE_APP_ENGINE_VERSION_HAS_INSTANCE,
        sourceType: ENTITY_TYPE_APP_ENGINE_VERSION,
        targetType: ENTITY_TYPE_APP_ENGINE_INSTANCE,
      },
    ],
    dependsOn: [STEP_APP_ENGINE_VERSIONS],
    executionHandler: fetchAppEngineVersionInstances,
  },
];
