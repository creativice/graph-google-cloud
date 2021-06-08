import { IntegrationStep } from '@jupiterone/integration-sdk-core';
import { IntegrationConfig } from '../..';
import { IntegrationStepContext } from '../../types';
import { publishMissingPermissionEvent } from '../../utils/events';
import { CloudAssetClient } from './client';
import { bindingEntities, CLOUD_ASSET_STEPS } from './constants';
import { createIamBindingEntity } from './converters';

export async function fetchIamBindings(
  context: IntegrationStepContext,
): Promise<void> {
  const { jobState, instance, logger } = context;
  const client = new CloudAssetClient({ config: instance.config });
  let iamBindingsCount = 0;

  try {
    await client.iterateAllIamPolicies(context, async (policyResult) => {
      const resource = policyResult.resource;
      const project = policyResult.project;
      const bindings = policyResult.policy?.bindings ?? [];

      for (const binding of bindings) {
        await jobState.addEntity(
          createIamBindingEntity(binding, project, resource),
        );
        iamBindingsCount++;
      }
    });

    logger.info(
      { numIamBindings: iamBindingsCount },
      'Created IAM binding entities',
    );
  } catch (err) {
    if (err.status === 403) {
      publishMissingPermissionEvent({
        logger,
        permission: 'cloudasset.assets.searchAllIamPolicies',
        stepId: CLOUD_ASSET_STEPS.BINDINGS,
      });

      return;
    }

    throw err;
  }
}

export const cloudAssetSteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: CLOUD_ASSET_STEPS.BINDINGS,
    name: 'IAM Bindings',
    entities: [bindingEntities.BINDINGS],
    relationships: [],
    dependsOn: [],
    executionHandler: fetchIamBindings,
  },
];
