import {
  iam_v1,
  compute_v1,
  cloudresourcemanager_v1,
  bigquery_v2,
  sqladmin_v1beta4,
  dns_v1,
  container_v1,
  cloudkms_v1,
  logging_v2,
  storage_v1,
  monitoring_v3,
  binaryauthorization_v1,
  cloudfunctions_v1,
  serviceusage_v1,
  pubsub_v1,
  run_v1,
  appengine_v1,
} from 'googleapis';

export function getMockIamRole(
  partial?: Partial<iam_v1.Schema$Role>,
): iam_v1.Schema$Role {
  return {
    name: 'projects/j1-gc-integration-dev-v2/roles/myrole',
    title: 'Role',
    description: 'Description',
    includedPermissions: [
      'cloudfunctions.functions.get',
      'cloudfunctions.functions.getIamPolicy',
    ],
    stage: 'GA',
    etag: 'abc123',
    ...partial,
  };
}

export function getMockServiceAccount(
  partial?: Partial<iam_v1.Schema$ServiceAccount>,
): iam_v1.Schema$ServiceAccount {
  return {
    name:
      'projects/j1-gc-integration-dev-v2/serviceAccounts/j1-gc-integration-dev-v2-sa@j1-gc-integration-dev-v2.iam.gserviceaccount.com',
    projectId: 'j1-gc-integration-dev-v2',
    uniqueId: '1234567890',
    email:
      'j1-gc-integration-dev-v2-sa@j1-gc-integration-dev-v2.iam.gserviceaccount.com',
    etag: 'abc=',
    description: 'J1 Google Cloud integration execution',
    oauth2ClientId: '1234567890',
    ...partial,
  };
}

export function getMockServiceAccountKey(
  partial?: Partial<iam_v1.Schema$ServiceAccountKey>,
): iam_v1.Schema$ServiceAccountKey {
  return {
    name:
      'projects/j1-gc-integration-dev-v2/serviceAccounts/j1-gc-integration-dev-v2-sa-tf@j1-gc-integration-dev-v2.iam.gserviceaccount.com/keys/12345',
    validAfterTime: '2020-08-05T18:05:19Z',
    validBeforeTime: '2020-08-21T18:05:19Z',
    keyAlgorithm: 'KEY_ALG_RSA_2048',
    keyOrigin: 'GOOGLE_PROVIDED',
    keyType: 'SYSTEM_MANAGED',
    ...partial,
  };
}

export function getMockComputeDisk(
  partial?: Partial<compute_v1.Schema$Disk>,
): compute_v1.Schema$Disk {
  return {
    id: '123456789',
    creationTimestamp: '2020-08-12T08:20:05.930-07:00',
    name: 'testvm',
    sizeGb: '10',
    zone:
      'https://www.googleapis.com/compute/v1/projects/j1-gc-integration-dev-v2/zones/us-central1-a',
    status: 'READY',
    selfLink:
      'https://www.googleapis.com/compute/v1/projects/j1-gc-integration-dev-v2/zones/us-central1-a/disks/testvm',
    sourceImage:
      'https://www.googleapis.com/compute/v1/projects/debian-cloud/global/images/debian-9-stretch-v20200805',
    sourceImageId: '6709658075886210235',
    type:
      'https://www.googleapis.com/compute/v1/projects/j1-gc-integration-dev-v2/zones/us-central1-a/diskTypes/pd-standard',
    licenses: [
      'https://www.googleapis.com/compute/v1/projects/debian-cloud/global/licenses/debian-9-stretch',
    ],
    guestOsFeatures: [
      {
        type: 'VIRTIO_SCSI_MULTIQUEUE',
      },
    ],
    lastAttachTimestamp: '2020-08-12T08:20:05.930-07:00',
    users: [
      'https://www.googleapis.com/compute/v1/projects/j1-gc-integration-dev-v2/zones/us-central1-a/instances/testvm',
    ],
    labelFingerprint: '42WmSpB8rSM=',
    licenseCodes: ['1000205'],
    physicalBlockSizeBytes: '4096',
    kind: 'compute#disk',
    ...partial,
  };
}

export function getMockComputeInstance(
  partial?: Partial<compute_v1.Schema$Instance>,
): compute_v1.Schema$Instance {
  return {
    id: '2248191918776890954',
    creationTimestamp: '2020-08-12T08:20:05.921-07:00',
    name: 'testvm',
    tags: {
      items: ['testvmtag1', 'testvmtag2'],
      fingerprint: 'f_TpKvEudUc=',
    },
    machineType:
      'https://www.googleapis.com/compute/v1/projects/j1-gc-integration-dev-v2/zones/us-central1-a/machineTypes/n1-standard-1',
    status: 'RUNNING',
    zone:
      'https://www.googleapis.com/compute/v1/projects/j1-gc-integration-dev-v2/zones/us-central1-a',
    canIpForward: false,
    networkInterfaces: [
      {
        network:
          'https://www.googleapis.com/compute/v1/projects/j1-gc-integration-dev-v2/global/networks/default',
        subnetwork:
          'https://www.googleapis.com/compute/v1/projects/j1-gc-integration-dev-v2/regions/us-central1/subnetworks/default',
        networkIP: '10.128.0.2',
        name: 'nic0',
        fingerprint: 'RpvQNHzHRp8=',
        kind: 'compute#networkInterface',
      },
    ],
    disks: [
      {
        type: 'PERSISTENT',
        mode: 'READ_WRITE',
        source:
          'https://www.googleapis.com/compute/v1/projects/j1-gc-integration-dev-v2/zones/us-central1-a/disks/testvm',
        deviceName: 'persistent-disk-0',
        index: 0,
        boot: true,
        autoDelete: true,
        licenses: [
          'https://www.googleapis.com/compute/v1/projects/debian-cloud/global/licenses/debian-9-stretch',
        ],
        interface: 'SCSI',
        guestOsFeatures: [
          {
            type: 'VIRTIO_SCSI_MULTIQUEUE',
          },
        ],
        diskSizeGb: '10',
        kind: 'compute#attachedDisk',
      },
      {
        type: 'SCRATCH',
        mode: 'READ_WRITE',
        deviceName: 'local-ssd-0',
        index: 1,
        boot: false,
        autoDelete: true,
        interface: 'SCSI',
        diskSizeGb: '375',
        kind: 'compute#attachedDisk',
      },
    ],
    metadata: {
      fingerprint: '9yLGkjCLBTs=',
      items: [
        {
          key: 'foo',
          value: 'bar',
        },
        {
          key: 'startup-script',
          value: 'echo Hello',
        },
      ],
      kind: 'compute#metadata',
    },
    serviceAccounts: [
      {
        email:
          'j1-gc-integration-dev-v2-sa-tf@j1-gc-integration-dev-v2.iam.gserviceaccount.com',
        scopes: [
          'https://www.googleapis.com/auth/compute.readonly',
          'https://www.googleapis.com/auth/devstorage.read_only',
          'https://www.googleapis.com/auth/userinfo.email',
        ],
      },
    ],
    selfLink:
      'https://www.googleapis.com/compute/v1/projects/j1-gc-integration-dev-v2/zones/us-central1-a/instances/testvm',
    scheduling: {
      onHostMaintenance: 'MIGRATE',
      automaticRestart: true,
      preemptible: false,
    },
    cpuPlatform: 'Intel Haswell',
    labelFingerprint: '42WmSpB8rSM=',
    startRestricted: false,
    deletionProtection: false,
    fingerprint: '4gmEF7tlfn8=',
    kind: 'compute#instance',
    ...partial,
  };
}

export function getMockComputeProject(
  partial?: Partial<compute_v1.Schema$Project>,
): compute_v1.Schema$Project {
  return {
    id: '8075573275056338764',
    kind: 'compute#project',
    creationTimestamp: '2021-01-04T09:00:19.752-08:00',
    name: 'j1-gc-integration-dev-v2',
    commonInstanceMetadata: {
      fingerprint: '3rFva159u8A=',
      kind: 'compute#metadata',
    },
    quotas: [
      {
        metric: 'SNAPSHOTS',
        limit: 1000,
        usage: 0,
      },
      {
        metric: 'NETWORKS',
        limit: 5,
        usage: 3,
      },
      {
        metric: 'FIREWALLS',
        limit: 100,
        usage: 7,
      },
    ],
    selfLink:
      'https://www.googleapis.com/compute/v1/projects/j1-gc-integration-dev-v2',
    defaultServiceAccount: '165882964161-compute@developer.gserviceaccount.com',
    xpnProjectStatus: 'UNSPECIFIED_XPN_PROJECT_STATUS',
    defaultNetworkTier: 'PREMIUM',
    ...partial,
  };
}

export function getMockComputeFirewall(
  partial?: compute_v1.Schema$Firewall,
): compute_v1.Schema$Firewall {
  return {
    id: '1234567890',
    creationTimestamp: '2020-09-23T07:47:24.809-07:00',
    name: 'public-compute-app-fw-allow-https',
    description: '',
    network:
      'https://www.googleapis.com/compute/v1/projects/j1-gc-integration-dev-v2/global/networks/public-compute-app-vpc',
    priority: 1000,
    sourceRanges: ['0.0.0.0/0'],
    targetTags: ['https'],
    allowed: [
      {
        IPProtocol: 'tcp',
        ports: ['443'],
      },
    ],
    direction: 'INGRESS',
    logConfig: {
      enable: false,
    },
    disabled: false,
    selfLink:
      'https://www.googleapis.com/compute/v1/projects/j1-gc-integration-dev-v2/global/firewalls/public-compute-app-fw-allow-https',
    kind: 'compute#firewall',
    ...partial,
  };
}

export function getMockSubnet(
  partial?: compute_v1.Schema$Subnetwork,
): compute_v1.Schema$Subnetwork {
  return {
    id: '1234567890',
    creationTimestamp: '2020-08-07T10:20:16.033-07:00',
    name: 'default',
    network:
      'https://www.googleapis.com/compute/v1/projects/j1-gc-integration-dev-v2/global/networks/default',
    ipCidrRange: '10.164.0.0/20',
    gatewayAddress: '10.164.0.1',
    region:
      'https://www.googleapis.com/compute/v1/projects/j1-gc-integration-dev-v2/regions/europe-west4',
    selfLink:
      'https://www.googleapis.com/compute/v1/projects/j1-gc-integration-dev-v2/regions/europe-west4/subnetworks/default',
    privateIpGoogleAccess: false,
    fingerprint: 'whfZBEBCda4=',
    privateIpv6GoogleAccess: 'DISABLE_GOOGLE_ACCESS',
    purpose: 'PRIVATE',
    kind: 'compute#subnetwork',
    ...partial,
  };
}

export function getMockNetwork(
  partial?: compute_v1.Schema$Network,
): compute_v1.Schema$Network {
  return {
    id: '4319333979087364382',
    creationTimestamp: '2020-09-23T07:47:13.320-07:00',
    name: 'public-compute-app-vpc',
    selfLink:
      'https://www.googleapis.com/compute/v1/projects/j1-gc-integration-dev-v2/global/networks/public-compute-app-vpc',
    autoCreateSubnetworks: false,
    subnetworks: [
      'https://www.googleapis.com/compute/v1/projects/j1-gc-integration-dev-v2/regions/us-central1/subnetworks/public-compute-app-public-subnet-1',
    ],
    routingConfig: {
      routingMode: 'GLOBAL',
    },
    kind: 'compute#network',
    ...partial,
  };
}

export function getMockProject(
  partial?: cloudresourcemanager_v1.Schema$Project,
): cloudresourcemanager_v1.Schema$Project {
  return {
    projectNumber: '545240943112',
    projectId: 'j1-gc-integration-dev-v2',
    lifecycleState: 'ACTIVE',
    name: 'j1-gc-integration-dev-v2',
    createTime: '2020-07-28T14:38:24.744Z',
    parent: {
      type: 'organization',
      id: '158838481165',
    },
    ...partial,
  };
}

export function getMockBigQueryDataset(
  partial?: Partial<bigquery_v2.Schema$Dataset>,
): bigquery_v2.Schema$Dataset {
  return {
    kind: 'bigquery#dataset',
    etag: 'Q1RJczpo1aoPRRoUJ1pElQ==',
    id: 'j1-gc-integration-dev-v2:test_big_query_dataset',
    selfLink:
      'https://www.googleapis.com/bigquery/v2/projects/j1-gc-integration-dev-v2/datasets/test_big_query_dataset',
    datasetReference: {
      datasetId: 'test_big_query_dataset',
      projectId: 'j1-gc-integration-dev-v2',
    },
    access: [
      { role: 'WRITER', specialGroup: 'projectWriters' },
      { role: 'OWNER', specialGroup: 'projectOwners' },
      { role: 'OWNER', userByEmail: 'admin@creativice.com' },
      { role: 'READER', specialGroup: 'projectReaders' },
    ],
    creationTime: '1610919167542',
    lastModifiedTime: '1610919344642',
    location: 'US',
    ...partial,
  };
}

export function getMockSQLInstance(
  partial?: Partial<sqladmin_v1beta4.Schema$DatabaseInstance>,
): sqladmin_v1beta4.Schema$DatabaseInstance {
  return {
    kind: 'sql#instance',
    state: 'RUNNABLE',
    settings: {
      authorizedGaeApplications: [],
      tier: 'db-custom-1-3840',
      kind: 'sql#settings',
      availabilityType: 'ZONAL',
      pricingPlan: 'PER_USE',
      activationPolicy: 'ALWAYS',
      ipConfiguration: {
        authorizedNetworks: [],
        ipv4Enabled: true,
      },
      locationPreference: {
        zone: 'europe-west3-b',
        kind: 'sql#locationPreference',
      },
      dataDiskType: 'PD_SSD',
      maintenanceWindow: {
        kind: 'sql#maintenanceWindow',
        hour: 0,
        day: 0,
      },
      backupConfiguration: {
        startTime: '06:00',
        kind: 'sql#backupConfiguration',
        location: 'eu',
        backupRetentionSettings: {
          retentionUnit: 'COUNT',
          retainedBackups: 7,
        },
        enabled: true,
        replicationLogArchivingEnabled: true,
        pointInTimeRecoveryEnabled: true,
        transactionLogRetentionDays: 7,
      },
      settingsVersion: '19',
      storageAutoResizeLimit: '0',
      storageAutoResize: true,
      dataDiskSizeGb: '10',
    },
    etag: '98de3deaeeca4420e21a891488c187b0b029235e2e0cb551fc00a388d1ac4f7d',
    ipAddresses: [],
    instanceType: 'CLOUD_SQL_INSTANCE',
    project: 'j1-gc-integration-dev-v2',
    serviceAccountEmailAddress:
      'p165882964161-x5ifig@gcp-sa-cloud-sql.iam.gserviceaccount.com',
    selfLink:
      'https://www.googleapis.com/sql/v1beta4/projects/j1-gc-integration-dev-v2/instances/cloud-sql-postgres',
    connectionName: 'j1-gc-integration-dev-v2:europe-west3:cloud-sql-postgres',
    name: 'cloud-sql-postgres',
    region: 'europe-west3',
    gceZone: 'europe-west3-b',
    ...partial,
  };
}

export function getMockDNSManagedZone(
  partial?: dns_v1.Schema$ManagedZone,
): dns_v1.Schema$ManagedZone {
  return {
    name: 'example-zone',
    dnsName: 'example.com.',
    description: '',
    id: '778386319953398157',
    nameServers: [
      'ns-cloud-a1.googledomains.com.',
      'ns-cloud-a2.googledomains.com.',
      'ns-cloud-a3.googledomains.com.',
      'ns-cloud-a4.googledomains.com.',
    ],
    creationTime: '2021-01-22T16:48:27.272Z',
    visibility: 'public',
    kind: 'dns#managedZone',
    ...partial,
  };
}

export function getMockContainerCluster(
  partial?: container_v1.Schema$Cluster,
): container_v1.Schema$Cluster {
  return {
    name: 'j1-gc-integration-dev-v2-gke-cluster',
    initialNodeCount: 1,
    nodeConfig: {
      machineType: 'e2-micro',
      diskSizeGb: 100,
      oauthScopes: ['https://www.googleapis.com/auth/cloud-platform'],
      metadata: {
        'disable-legacy-endpoints': 'true',
      },
      imageType: 'COS',
      serviceAccount:
        'j1-gc-integration-dev-v2-gke-sa@j1-gc-integration-dev-v2.iam.gserviceaccount.com',
      preemptible: true,
      diskType: 'pd-standard',
      shieldedInstanceConfig: {
        enableIntegrityMonitoring: true,
      },
    },
    masterAuth: {
      clusterCaCertificate: 'abc123',
    },
    loggingService: 'logging.googleapis.com/kubernetes',
    monitoringService: 'monitoring.googleapis.com/kubernetes',
    network: 'default',
    clusterIpv4Cidr: '10.16.0.0/14',
    addonsConfig: {
      kubernetesDashboard: {
        disabled: true,
      },
      networkPolicyConfig: {
        disabled: true,
      },
    },
    subnetwork: 'default',
    nodePools: [
      {
        name: 'j1-gc-integration-dev-v2-gke-node-pool',
        config: {
          machineType: 'e2-micro',
          diskSizeGb: 100,
          oauthScopes: ['https://www.googleapis.com/auth/cloud-platform'],
          metadata: {
            'disable-legacy-endpoints': 'true',
          },
          imageType: 'COS',
          serviceAccount:
            'j1-gc-integration-dev-v2-gke-sa@j1-gc-integration-dev-v2.iam.gserviceaccount.com',
          preemptible: true,
          diskType: 'pd-standard',
          shieldedInstanceConfig: {
            enableIntegrityMonitoring: true,
          },
        },
        initialNodeCount: 1,
        management: {
          autoUpgrade: true,
          autoRepair: true,
        },
        podIpv4CidrSize: 24,
        locations: ['us-central1-f', 'us-central1-c', 'us-central1-a'],
        selfLink:
          'https://container.googleapis.com/v1/projects/j1-gc-integration-dev-v2/locations/us-central1/clusters/j1-gc-integration-dev-v2-gke-cluster/nodePools/j1-gc-integration-dev-v2-gke-node-pool',
        version: '1.17.14-gke.1600',
        instanceGroupUrls: [
          'https://www.googleapis.com/compute/v1/projects/j1-gc-integration-dev-v2/zones/us-central1-f/instanceGroupManagers/gke-j1-gc-integratio-j1-gc-integratio-d0942024-grp',
          'https://www.googleapis.com/compute/v1/projects/j1-gc-integration-dev-v2/zones/us-central1-c/instanceGroupManagers/gke-j1-gc-integratio-j1-gc-integratio-2a95071a-grp',
          'https://www.googleapis.com/compute/v1/projects/j1-gc-integration-dev-v2/zones/us-central1-a/instanceGroupManagers/gke-j1-gc-integratio-j1-gc-integratio-6817e506-grp',
        ],
        status: 'RUNNING',
        upgradeSettings: {
          maxSurge: 1,
        },
      },
    ],
    locations: ['us-central1-f', 'us-central1-c', 'us-central1-a'],
    labelFingerprint: 'a9dc16a7',
    legacyAbac: {},
    ipAllocationPolicy: {
      useRoutes: true,
    },
    masterAuthorizedNetworksConfig: {},
    maintenancePolicy: {
      resourceVersion: 'e3b0c442',
    },
    binaryAuthorization: {},
    autoscaling: {},
    networkConfig: {
      network: 'projects/j1-gc-integration-dev-v2/global/networks/default',
      subnetwork:
        'projects/j1-gc-integration-dev-v2/regions/us-central1/subnetworks/default',
    },
    databaseEncryption: {
      state: 'DECRYPTED',
    },
    shieldedNodes: {},
    releaseChannel: {
      channel: 'REGULAR',
    },
    selfLink:
      'https://container.googleapis.com/v1/projects/j1-gc-integration-dev-v2/locations/us-central1/clusters/j1-gc-integration-dev-v2-gke-cluster',
    zone: 'us-central1',
    endpoint: '34.69.222.23',
    initialClusterVersion: '1.17.14-gke.1600',
    currentMasterVersion: '1.17.14-gke.1600',
    currentNodeVersion: '1.17.14-gke.1600',
    createTime: '2021-02-07T17:17:28+00:00',
    status: 'RUNNING',
    nodeIpv4CidrSize: 24,
    servicesIpv4Cidr: '10.19.240.0/20',
    instanceGroupUrls: [
      'https://www.googleapis.com/compute/v1/projects/j1-gc-integration-dev-v2/zones/us-central1-f/instanceGroupManagers/gke-j1-gc-integratio-j1-gc-integratio-d0942024-grp',
      'https://www.googleapis.com/compute/v1/projects/j1-gc-integration-dev-v2/zones/us-central1-c/instanceGroupManagers/gke-j1-gc-integratio-j1-gc-integratio-2a95071a-grp',
      'https://www.googleapis.com/compute/v1/projects/j1-gc-integration-dev-v2/zones/us-central1-a/instanceGroupManagers/gke-j1-gc-integratio-j1-gc-integratio-6817e506-grp',
    ],
    currentNodeCount: 3,
    location: 'us-central1',
    ...partial,
  };
}

export function getMockLoggingProjectSink(
  partial?: Partial<logging_v2.Schema$LogSink>,
): logging_v2.Schema$LogSink {
  return {
    name: 'example-sink',
    destination:
      'bigquery.googleapis.com/projects/j1-gc-integration-dev-v2/datasets/test_big_query_dataset',
    writerIdentity:
      'serviceAccount:p165882964161-737968@gcp-sa-logging.iam.gserviceaccount.com',
    bigqueryOptions: {},
    createTime: '2021-01-27T18:44:26.303792531Z',
    updateTime: '2021-01-27T18:44:26.303792531Z',
    ...partial,
  };
}

export function getMockContainerNodePool(
  partial?: container_v1.Schema$NodePool,
): container_v1.Schema$NodePool {
  return {
    name: 'j1-gc-integration-dev-gke-node-pool',
    config: {
      machineType: 'e2-micro',
      diskSizeGb: 100,
      oauthScopes: ['https://www.googleapis.com/auth/cloud-platform'],
      metadata: {
        'disable-legacy-endpoints': 'true',
      },
      imageType: 'COS',
      preemptible: true,
      diskType: 'pd-standard',
      shieldedInstanceConfig: {
        enableIntegrityMonitoring: true,
      },
    },
    initialNodeCount: 1,
    management: {
      autoUpgrade: true,
      autoRepair: true,
    },
    podIpv4CidrSize: 24,
    locations: ['us-central1-f', 'us-central1-c', 'us-central1-a'],
    selfLink:
      'https://container.googleapis.com/v1/projects/j1-gc-integration-dev/locations/us-central1/clusters/j1-gc-integration-dev-gke-cluster/nodePools/j1-gc-integration-dev-gke-node-pool',
    version: '1.17.14-gke.1600',
    instanceGroupUrls: [
      'https://www.googleapis.com/compute/v1/projects/j1-gc-integration-dev/zones/us-central1-f/instanceGroupManagers/gke-j1-gc-integratio-j1-gc-integratio-d0942024-grp',
      'https://www.googleapis.com/compute/v1/projects/j1-gc-integration-dev/zones/us-central1-c/instanceGroupManagers/gke-j1-gc-integratio-j1-gc-integratio-2a95071a-grp',
      'https://www.googleapis.com/compute/v1/projects/j1-gc-integration-dev/zones/us-central1-a/instanceGroupManagers/gke-j1-gc-integratio-j1-gc-integratio-6817e506-grp',
    ],
    status: 'RUNNING',
    upgradeSettings: {
      maxSurge: 1,
    },
    ...partial,
  };
}

export function getMockKmsKeyRing(
  partial?: cloudkms_v1.Schema$KeyRing,
): cloudkms_v1.Schema$KeyRing {
  return {
    name:
      'projects/j1-gc-integration-dev-v2/locations/us/keyRings/j1-gc-integration-dev-v2-bucket-ring',
    createTime: '2020-07-28T18:34:26.034565002Z',
    ...partial,
  };
}

export function getMockStorageBucket(
  partial?: Partial<storage_v1.Schema$Bucket>,
): storage_v1.Schema$Bucket {
  return {
    kind: 'storage#bucket',
    selfLink:
      'https://www.googleapis.com/storage/v1/b/customer-managed-encryption-key-bucket-1234',
    id: 'customer-managed-encryption-key-bucket-1234',
    name: 'customer-managed-encryption-key-bucket-1234',
    projectNumber: '1234',
    metageneration: '1',
    location: 'US',
    storageClass: 'STANDARD',
    etag: 'CAE=',
    timeCreated: '2020-07-28T19:06:14.033Z',
    updated: '2020-07-28T19:06:14.033Z',
    encryption: {
      defaultKmsKeyName:
        'projects/j1-gc-integration-dev-v2/locations/us/keyRings/j1-gc-integration-dev-v2-bucket-ring/cryptoKeys/j1-gc-integration-dev-v2-bucket-key',
    },
    iamConfiguration: {
      bucketPolicyOnly: {
        enabled: false,
      },
      uniformBucketLevelAccess: {
        enabled: false,
      },
    },
    locationType: 'multi-region',
    ...partial,
  };
}

export function getMockKmsCryptoKey(
  partial?: cloudkms_v1.Schema$CryptoKey,
): cloudkms_v1.Schema$CryptoKey {
  return {
    name:
      'projects/j1-gc-integration-dev-v2/locations/us/keyRings/j1-gc-integration-dev-v2-bucket-ring/cryptoKeys/j1-gc-integration-dev-v2-bucket-key',
    primary: {
      name:
        'projects/j1-gc-integration-dev-v2/locations/us/keyRings/j1-gc-integration-dev-v2-bucket-ring/cryptoKeys/j1-gc-integration-dev-v2-bucket-key/cryptoKeyVersions/68',
      state: 'ENABLED',
      createTime: '2020-10-03T19:01:13.428484662Z',
      protectionLevel: 'SOFTWARE',
      algorithm: 'GOOGLE_SYMMETRIC_ENCRYPTION',
      generateTime: '2020-10-03T19:01:13.428484662Z',
    },
    purpose: 'ENCRYPT_DECRYPT',
    createTime: '2020-07-28T18:59:59.513564921Z',
    nextRotationTime: '2020-10-04T19:01:14.428484Z',
    rotationPeriod: '86401s',
    versionTemplate: {
      protectionLevel: 'SOFTWARE',
      algorithm: 'GOOGLE_SYMMETRIC_ENCRYPTION',
    },
    ...partial,
  };
}

export function getMockAlertPolicy(
  partial?: Partial<monitoring_v3.Schema$AlertPolicy>,
): monitoring_v3.Schema$AlertPolicy {
  return {
    name: 'projects/j1-gc-integration-dev-v2/alertPolicies/9246450381922925470',
    displayName: 'Example Alert Policy',
    combiner: 'OR',
    creationRecord: {
      mutateTime: '2021-02-02T16:18:23.127595226Z',
      mutatedBy:
        'j1-gc-integration-dev-v2-sa@j1-gc-integration-dev-v2.iam.gserviceaccount.com',
    },
    mutationRecord: {
      mutateTime: '2021-02-02T16:18:23.127595226Z',
      mutatedBy:
        'j1-gc-integration-dev-v2-sa@j1-gc-integration-dev-v2.iam.gserviceaccount.com',
    },
    enabled: true,
    ...partial,
  };
}

export function getMockKmsCryptoKeyIamPolicy(
  partial?: cloudkms_v1.Schema$Policy,
): cloudkms_v1.Schema$Policy {
  return {
    version: 1,
    etag: 'BwW6Cs8MqSM=',
    bindings: [],
    ...partial,
  };
}

export function getMockMetric(
  partial?: Partial<logging_v2.Schema$LogMetric>,
): logging_v2.Schema$LogMetric {
  return {
    name: 'my-example-metric',
    filter:
      'protoPayload.methodName="SetIamPolicy" AND protoPayload.serviceData.policyDelta.auditConfigDeltas:*',
    metricDescriptor: {
      name:
        'projects/j1-gc-integration-dev-v2/metricDescriptors/logging.googleapis.com/user/my-example-metric',
      labels: [
        {
          key: 'occurences',
          valueType: 'INT64',
        },
      ],
      metricKind: 'DELTA',
      valueType: 'INT64',
      unit: '1',
      displayName: 'My metric',
      type: 'logging.googleapis.com/user/my-example-metric',
    },
    labelExtractors: {
      occurences: 'EXTRACT(textPayload)',
    },
    createTime: '2021-02-02T16:14:20.068899250Z',
    updateTime: '2021-02-02T16:14:20.068899250Z',
    ...partial,
  };
}

export function getMockBackendBucket(
  partial?: compute_v1.Schema$BackendBucket,
): compute_v1.Schema$BackendBucket {
  return {
    id: '6230681112154833150',
    creationTimestamp: '2021-01-29T08:55:45.400-08:00',
    name: 'example-backend-bucket',
    description: '',
    selfLink:
      'https://www.googleapis.com/compute/v1/projects/j1-gc-integration-dev-v2/global/backendBuckets/example-backend-bucket',
    bucketName: 'log-example-bucket',
    enableCdn: false,
    kind: 'compute#backendBucket',
    ...partial,
  };
}

export function getMockBackendService(
  partial?: compute_v1.Schema$BackendService,
): compute_v1.Schema$BackendService {
  return {
    id: '3052966098403233127',
    creationTimestamp: '2021-01-25T13:09:28.422-08:00',
    name: 'example-backend-service',
    description: '',
    selfLink:
      'https://www.googleapis.com/compute/v1/projects/j1-gc-integration-dev-v2/global/backendServices/example-backend-service',
    backends: [
      {
        group:
          'https://www.googleapis.com/compute/v1/projects/j1-gc-integration-dev-v2/zones/us-central1-a/instanceGroups/instance-group-1',
        balancingMode: 'UTILIZATION',
        maxUtilization: 0.8,
        capacityScaler: 1,
      },
    ],
    healthChecks: [
      'https://www.googleapis.com/compute/v1/projects/j1-gc-integration-dev-v2/global/healthChecks/health-check',
    ],
    timeoutSec: 30,
    port: 80,
    protocol: 'HTTPS',
    fingerprint: 'OnffiLYpLO4=',
    portName: 'https',
    enableCDN: false,
    sessionAffinity: 'NONE',
    affinityCookieTtlSec: 0,
    loadBalancingScheme: 'EXTERNAL',
    connectionDraining: {
      drainingTimeoutSec: 300,
    },
    logConfig: {
      enable: true,
      sampleRate: 1,
    },
    kind: 'compute#backendService',
    ...partial,
  };
}

export function getMockHealthCheck(
  partial?: compute_v1.Schema$HealthCheck,
): compute_v1.Schema$HealthCheck {
  return {
    id: '1905105216322309484',
    creationTimestamp: '2021-01-25T13:09:23.908-08:00',
    name: 'health-check',
    description: '',
    checkIntervalSec: 10,
    timeoutSec: 5,
    unhealthyThreshold: 3,
    healthyThreshold: 2,
    type: 'TCP',
    tcpHealthCheck: {
      port: 80,
      proxyHeader: 'NONE',
    },
    selfLink:
      'https://www.googleapis.com/compute/v1/projects/j1-gc-integration-dev-v2/global/healthChecks/health-check',
    kind: 'compute#healthCheck',
    ...partial,
  };
}

export function getMockInstanceGroup(
  partial?: compute_v1.Schema$InstanceGroup,
): compute_v1.Schema$InstanceGroup {
  return {
    id: '4682404015364017264',
    creationTimestamp: '2021-01-25T13:05:35.348-08:00',
    name: 'instance-group-1',
    description:
      "This instance group is controlled by Instance Group Manager 'instance-group-1'. To modify instances in this group, use the Instance Group Manager API: https://cloud.google.com/compute/docs/reference/latest/instanceGroupManagers",
    namedPorts: [
      {
        name: 'https',
        port: 5000,
      },
    ],
    network:
      'https://www.googleapis.com/compute/v1/projects/j1-gc-integration-dev-v2/global/networks/default',
    fingerprint: 'Mhi8gtwR57U=',
    zone:
      'https://www.googleapis.com/compute/v1/projects/j1-gc-integration-dev-v2/zones/us-central1-a',
    selfLink:
      'https://www.googleapis.com/compute/v1/projects/j1-gc-integration-dev-v2/zones/us-central1-a/instanceGroups/instance-group-1',
    size: 1,
    subnetwork:
      'https://www.googleapis.com/compute/v1/projects/j1-gc-integration-dev-v2/regions/us-central1/subnetworks/default',
    kind: 'compute#instanceGroup',
    ...partial,
  };
}

export function getMockLoadBalancer(
  partial?: compute_v1.Schema$UrlMap,
): compute_v1.Schema$UrlMap {
  return {
    id: '7884251075960802659',
    creationTimestamp: '2021-01-25T13:09:32.355-08:00',
    name: 'example-http-load-balancer',
    selfLink:
      'https://www.googleapis.com/compute/v1/projects/j1-gc-integration-dev-v2/global/urlMaps/example-http-load-balancer',
    hostRules: [
      {
        hosts: ['web.test.com'],
        pathMatcher: 'path-matcher-1',
      },
    ],
    pathMatchers: [
      {
        name: 'path-matcher-1',
        defaultService:
          'https://www.googleapis.com/compute/v1/projects/j1-gc-integration-dev-v2/global/backendServices/example-backend-service',
        pathRules: [
          {
            service:
              'https://www.googleapis.com/compute/v1/projects/j1-gc-integration-dev-v2/global/backendBuckets/example-backend-bucket',
            paths: ['/images/*'],
          },
        ],
      },
    ],
    defaultService:
      'https://www.googleapis.com/compute/v1/projects/j1-gc-integration-dev-v2/global/backendServices/example-backend-service',
    fingerprint: '7VTPVZHiF8k=',
    kind: 'compute#urlMap',
    ...partial,
  };
}

export function getMockTargetHttpProxy(
  partial?: compute_v1.Schema$TargetHttpProxy,
): compute_v1.Schema$TargetHttpProxy {
  return {
    id: '3284730591055048813',
    creationTimestamp: '2021-02-04T11:44:02.365-08:00',
    name: 'example-http-loadbalancer-target-proxy',
    selfLink:
      'https://www.googleapis.com/compute/v1/projects/j1-gc-integration-dev-v2/global/targetHttpProxies/example-http-loadbalancer-target-proxy',
    urlMap:
      'https://www.googleapis.com/compute/v1/projects/j1-gc-integration-dev-v2/global/urlMaps/example-http-loadbalancer',
    fingerprint: 'XrJcBMxyGME=',
    kind: 'compute#targetHttpProxy',
    ...partial,
  };
}

export function getMockTargetHttpsProxy(
  partial?: compute_v1.Schema$TargetHttpsProxy,
): compute_v1.Schema$TargetHttpsProxy {
  return {
    id: '4900822412538579656',
    creationTimestamp: '2021-01-25T13:12:07.139-08:00',
    name: 'example-http-load-balancer-target-proxy',
    selfLink:
      'https://www.googleapis.com/compute/v1/projects/j1-gc-integration-dev-v2/global/targetHttpsProxies/example-http-load-balancer-target-proxy',
    urlMap:
      'https://www.googleapis.com/compute/v1/projects/j1-gc-integration-dev-v2/global/urlMaps/example-http-load-balancer',
    sslCertificates: [
      'https://www.googleapis.com/compute/v1/projects/j1-gc-integration-dev-v2/global/sslCertificates/example-certificate',
    ],
    quicOverride: 'NONE',
    sslPolicy:
      'https://www.googleapis.com/compute/v1/projects/j1-gc-integration-dev-v2/global/sslPolicies/example-tls-1-2-policy',
    kind: 'compute#targetHttpsProxy',
    ...partial,
  };
}

export function getMockTargetSslProxy(
  partial?: compute_v1.Schema$TargetSslProxy,
): compute_v1.Schema$TargetSslProxy {
  return {
    id: '764465862189116138',
    creationTimestamp: '2021-02-04T12:07:33.886-08:00',
    name: 'example-ssl-2-loadbalancer-target-proxy',
    selfLink:
      'https://www.googleapis.com/compute/v1/projects/j1-gc-integration-dev-v2/global/targetSslProxies/example-ssl-2-loadbalancer-target-proxy',
    service:
      'https://www.googleapis.com/compute/v1/projects/j1-gc-integration-dev-v2/global/backendServices/example-ssl-2-loadbalancer',
    sslCertificates: [
      'https://www.googleapis.com/compute/v1/projects/j1-gc-integration-dev-v2/global/sslCertificates/example-certificate',
    ],
    proxyHeader: 'NONE',
    kind: 'compute#targetSslProxy',
    ...partial,
  };
}

export function getMockSslPolicy(
  partial?: compute_v1.Schema$SslPolicy,
): compute_v1.Schema$SslPolicy {
  return {
    id: '1226213084601944618',
    creationTimestamp: '2021-01-25T13:14:45.749-08:00',
    selfLink:
      'https://www.googleapis.com/compute/v1/projects/j1-gc-integration-dev-v2/global/sslPolicies/example-tls-1-2-policy',
    name: 'example-tls-1-2-policy',
    profile: 'CUSTOM',
    minTlsVersion: 'TLS_1_2',
    customFeatures: [
      'TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA',
      'TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256',
      'TLS_ECDHE_ECDSA_WITH_AES_256_CBC_SHA',
      'TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384',
    ],
    fingerprint: '5krWknNXjWo=',
    kind: 'compute#sslPolicy',
    ...partial,
  };
}

export function getMockBinaryAuthorizationPolicy(
  partial?: binaryauthorization_v1.Schema$Policy,
): binaryauthorization_v1.Schema$Policy {
  return {
    name: 'projects/j1-gc-integration-dev-v2/policy',
    admissionWhitelistPatterns: [
      {
        namePattern: 'gcr.io/google_containers/*',
      },
      {
        namePattern: 'gcr.io/google-containers/*',
      },
      {
        namePattern: 'k8s.gcr.io/*',
      },
      {
        namePattern: 'gke.gcr.io/*',
      },
      {
        namePattern: 'gcr.io/stackdriver-agents/*',
      },
    ],
    defaultAdmissionRule: {
      evaluationMode: 'ALWAYS_ALLOW',
      enforcementMode: 'ENFORCED_BLOCK_AND_AUDIT_LOG',
    },
    globalPolicyEvaluationMode: 'ENABLE',
    ...partial,
  };
}

export function getMockCloudFunction(
  partial?: Partial<cloudfunctions_v1.Schema$CloudFunction>,
): cloudfunctions_v1.Schema$CloudFunction {
  return {
    name:
      'projects/j1-gc-integration-dev-v2/locations/us-central1/functions/j1-gc-integration-dev-v2testfunction',
    description: 'Test function',
    sourceArchiveUrl:
      'gs://j1-gc-integration-dev-v2cloudfunctions/http_trigger.zip',
    httpsTrigger: {
      url:
        'https://us-central1-j1-gc-integration-dev-v2.cloudfunctions.net/j1-gc-integration-dev-v2testfunction',
    },
    status: 'ACTIVE',
    entryPoint: 'handler',
    timeout: '60s',
    availableMemoryMb: 128,
    serviceAccountEmail: 'j1-gc-integration-dev-v2@appspot.gserviceaccount.com',
    updateTime: '2020-07-28T18:35:52.821Z',
    versionId: '1',
    environmentVariables: {
      TEST_ENV_VAR: 'test-env-var-val',
    },
    runtime: 'nodejs10',
    ingressSettings: 'ALLOW_ALL',
    ...partial,
  };
}

export function getMockServiceApi(
  partial?: serviceusage_v1.Schema$GoogleApiServiceusageV1Service,
): serviceusage_v1.Schema$GoogleApiServiceusageV1Service {
  return {
    name: 'projects/545240943112/services/vision.googleapis.com',
    config: {
      name: 'vision.googleapis.com',
      title: 'Cloud Vision API',
      documentation: {
        summary:
          'Integrates Google Vision features, including image labeling, face, logo, and landmark detection, optical character recognition (OCR), and detection of explicit content, into applications.',
      },
      quota: {},
      authentication: {},
      usage: {
        requirements: ['serviceusage.googleapis.com/tos/cloud'],
      },
    },
    state: 'ENABLED',
    parent: 'projects/545240943112',
    ...partial,
  };
}

export function getMockPubSubTopic(
  partial?: pubsub_v1.Schema$Topic,
): pubsub_v1.Schema$Topic {
  return {
    name: 'projects/j1-gc-integration-dev-v2/topics/example-topic',
    ...partial,
  };
}

export function getMockPubSubSubscription(
  partial?: pubsub_v1.Schema$Subscription,
): pubsub_v1.Schema$Subscription {
  return {
    name: 'projects/j1-gc-integration-dev-v2/subscriptions/mock-subscription',
    topic: 'projects/j1-gc-integration-dev-v2/topics/mock-topic',
    ackDeadlineSeconds: 10,
    messageRetentionDuration: '604800s',
    expirationPolicy: {
      ttl: '2678400s',
    },
    ...partial,
  };
}

export function getMockCloudRunService(
  partial?: run_v1.Schema$Service,
): run_v1.Schema$Service {
  return {
    apiVersion: 'serving.knative.dev/v1',
    kind: 'Service',
    metadata: {
      name: 'example-cloud-run-service',
      namespace: '711888229551',
      selfLink:
        '/apis/serving.knative.dev/v1/namespaces/711888229551/services/example-cloud-run-service',
      uid: 'fce2d165-9ccb-4b6c-9204-67362d41aadd',
      resourceVersion: 'AAW9IJgvqVc',
      generation: 1,
      labels: {
        'cloud.googleapis.com/location': 'us-central1',
      },
      annotations: {
        'run.googleapis.com/client-name': 'cloud-console',
        'serving.knative.dev/creator': 'user@email.com',
        'serving.knative.dev/lastModifier': 'user@email.com',
        'client.knative.dev/user-image':
          'us-docker.pkg.dev/cloudrun/container/hello',
        'run.googleapis.com/launch-stage': 'BETA',
        'run.googleapis.com/ingress': 'all',
        'run.googleapis.com/ingress-status': 'all',
      },
      creationTimestamp: '2021-03-09T20:41:29.622532Z',
    },
    spec: {
      template: {
        metadata: {
          name: 'example-cloud-run-service-00001-mub',
          annotations: {
            'run.googleapis.com/client-name': 'cloud-console',
            'autoscaling.knative.dev/maxScale': '100',
            'run.googleapis.com/sandbox': 'gvisor',
          },
        },
        spec: {
          containerConcurrency: 80,
          timeoutSeconds: 300,
          serviceAccountName:
            '711888229551-compute@developer.gserviceaccount.com',
          containers: [
            {
              image: 'us-docker.pkg.dev/cloudrun/container/hello',
              resources: {
                limits: {
                  cpu: '1000m',
                  memory: '256Mi',
                },
              },
              ports: [
                {
                  containerPort: 8080,
                },
              ],
            },
          ],
        },
      },
      traffic: [
        {
          percent: 100,
          latestRevision: true,
        },
      ],
    },
    status: {
      observedGeneration: 1,
      conditions: [
        {
          type: 'Ready',
          status: 'True',
          lastTransitionTime: '2021-03-09T20:42:53.416791Z',
        },
        {
          type: 'ConfigurationsReady',
          status: 'True',
          lastTransitionTime: '2021-03-09T20:42:53.211458Z',
        },
        {
          type: 'RoutesReady',
          status: 'True',
          lastTransitionTime: '2021-03-09T20:42:53.416791Z',
        },
      ],
      latestReadyRevisionName: 'example-cloud-run-service-00001-mub',
      latestCreatedRevisionName: 'example-cloud-run-service-00001-mub',
      traffic: [
        {
          revisionName: 'example-cloud-run-service-00001-mub',
          percent: 100,
          latestRevision: true,
        },
      ],
      url: 'https://example-cloud-run-service-rhbpqun2qa-uc.a.run.app',
      address: {
        url: 'https://example-cloud-run-service-rhbpqun2qa-uc.a.run.app',
      },
    },
    ...partial,
  };
}

export function getMockCloudRunRoute(
  partial?: run_v1.Schema$Route,
): run_v1.Schema$Route {
  return {
    apiVersion: 'serving.knative.dev/v1',
    kind: 'Route',
    metadata: {
      name: 'example-cloud-run-service',
      namespace: '711888229551',
      selfLink:
        '/apis/serving.knative.dev/v1/namespaces/711888229551/routes/example-cloud-run-service',
      uid: 'f538487c-6e93-4038-9f6a-b7936cc4dd04',
      resourceVersion: 'AAW9IJgu/zw',
      generation: 1,
      creationTimestamp: '2021-03-09T20:41:30.309851Z',
      labels: {
        'serving.knative.dev/service': 'example-cloud-run-service',
        'cloud.googleapis.com/location': 'us-central1',
      },
      annotations: {
        'run.googleapis.com/client-name': 'cloud-console',
        'serving.knative.dev/creator': 'user@email.com',
        'serving.knative.dev/lastModifier': 'user@email.com',
        'client.knative.dev/user-image':
          'us-docker.pkg.dev/cloudrun/container/hello',
        'run.googleapis.com/ingress': 'all',
        'run.googleapis.com/ingress-status': 'all',
      },
      ownerReferences: [
        {
          kind: 'Service',
          name: 'example-cloud-run-service',
          uid: 'fce2d165-9ccb-4b6c-9204-67362d41aadd',
          apiVersion: 'serving.knative.dev/v1',
          controller: true,
          blockOwnerDeletion: true,
        },
      ],
    },
    spec: {
      traffic: [
        {
          configurationName: 'example-cloud-run-service',
          percent: 100,
          latestRevision: true,
        },
      ],
    },
    status: {
      observedGeneration: 1,
      conditions: [
        {
          type: 'Ready',
          status: 'True',
          lastTransitionTime: '2021-03-09T20:42:53.373244Z',
        },
      ],
      traffic: [
        {
          revisionName: 'example-cloud-run-service-00001-mub',
          percent: 100,
          latestRevision: true,
        },
      ],
      url: 'https://example-cloud-run-service-rhbpqun2qa-uc.a.run.app',
      address: {
        url: 'https://example-cloud-run-service-rhbpqun2qa-uc.a.run.app',
      },
    },
    ...partial,
  };
}

export function getMockCloudRunConfiguration(
  partial?: run_v1.Schema$Configuration,
): run_v1.Schema$Configuration {
  return {
    apiVersion: 'serving.knative.dev/v1',
    kind: 'Configuration',
    metadata: {
      name: 'example-cloud-run-service',
      namespace: '711888229551',
      selfLink:
        '/apis/serving.knative.dev/v1/namespaces/711888229551/configurations/example-cloud-run-service',
      uid: 'f190d809-4de1-4eb3-80bb-ad0ac9954f85',
      resourceVersion: 'AAW9IJgrZIw',
      generation: 1,
      labels: {
        'serving.knative.dev/route': 'example-cloud-run-service',
        'serving.knative.dev/service': 'example-cloud-run-service',
        'cloud.googleapis.com/location': 'us-central1',
      },
      annotations: {
        'run.googleapis.com/client-name': 'cloud-console',
        'serving.knative.dev/creator': 'user@email.com',
        'serving.knative.dev/lastModifier': 'user@email.com',
        'client.knative.dev/user-image':
          'us-docker.pkg.dev/cloudrun/container/hello',
        'run.googleapis.com/launch-stage': 'BETA',
      },
      ownerReferences: [
        {
          apiVersion: 'serving.knative.dev/v1',
          kind: 'Service',
          name: 'example-cloud-run-service',
          uid: 'fce2d165-9ccb-4b6c-9204-67362d41aadd',
          controller: true,
          blockOwnerDeletion: true,
        },
      ],
      creationTimestamp: '2021-03-09T20:41:30.336883Z',
    },
    spec: {
      template: {
        metadata: {
          name: 'example-cloud-run-service-00001-mub',
          annotations: {
            'run.googleapis.com/client-name': 'cloud-console',
            'autoscaling.knative.dev/maxScale': '100',
            'run.googleapis.com/sandbox': 'gvisor',
          },
        },
        spec: {
          containerConcurrency: 80,
          timeoutSeconds: 300,
          serviceAccountName:
            '711888229551-compute@developer.gserviceaccount.com',
          containers: [
            {
              image: 'us-docker.pkg.dev/cloudrun/container/hello',
              resources: {
                limits: {
                  cpu: '1000m',
                  memory: '256Mi',
                },
              },
              ports: [
                {
                  containerPort: 8080,
                },
              ],
            },
          ],
        },
      },
    },
    status: {
      observedGeneration: 1,
      latestCreatedRevisionName: 'example-cloud-run-service-00001-mub',
      latestReadyRevisionName: 'example-cloud-run-service-00001-mub',
      conditions: [
        {
          type: 'Ready',
          status: 'True',
          lastTransitionTime: '2021-03-09T20:42:53.137036Z',
        },
      ],
    },
    ...partial,
  };
}

export function getMockAppEngineApplication(
  partial?: appengine_v1.Schema$Application,
): appengine_v1.Schema$Application {
  return {
    name: 'apps/j1-gc-integration-dev-v2',
    id: 'j1-gc-integration-dev-v2',
    authDomain: 'gmail.com',
    locationId: 'us-central',
    codeBucket: 'staging.j1-gc-integration-dev-v2.appspot.com',
    servingStatus: 'SERVING',
    defaultHostname: 'j1-gc-integration-dev-v2.uc.r.appspot.com',
    defaultBucket: 'j1-gc-integration-dev-v2.appspot.com',
    gcrDomain: 'us.gcr.io',
    databaseType: 'CLOUD_DATASTORE_COMPATIBILITY',
    featureSettings: {
      splitHealthChecks: true,
      useContainerOptimizedOs: true,
    },
    ...partial,
  };
}

export function getMockAppEngineService(
  partial?: appengine_v1.Schema$Service,
): appengine_v1.Schema$Service {
  return {
    name: 'apps/j1-gc-integration-dev-v2/services/default',
    id: 'default',
    split: {
      allocations: {
        '20210309t141022': 1,
      },
    },
    ...partial,
  };
}

export function getMockAppEngineVersion(
  partial?: appengine_v1.Schema$Version,
): appengine_v1.Schema$Version {
  return {
    name:
      'apps/j1-gc-integration-dev-v2/services/default/versions/20210309t141022',
    id: '20210309t141022',
    instanceClass: 'F1',
    network: {},
    runtime: 'nodejs14',
    threadsafe: true,
    env: 'standard',
    servingStatus: 'SERVING',
    createdBy: 'username@email.com',
    createTime: '2021-03-09T14:11:25Z',
    diskUsageBytes: '4027054',
    versionUrl:
      'https://20210309t141022-dot-j1-gc-integration-dev-v2.appspot.com',
    runtimeChannel: 'default',
    ...partial,
  };
}

export function getMockAppEngineInstance(
  partial?: appengine_v1.Schema$Instance,
): appengine_v1.Schema$Instance {
  return {
    name:
      'apps/j1-gc-integration-dev-v2/services/default/versions/20210309t141022/instances/00c61b117c4f411df406d524e4a05eedc1393bcc50f9e7895ad08f46a2422e90974a734f30ef08b500405d4d514704e0d99c2ee290b9e238e920cba5d5a1964fe1c37be53c9773c2',
    id:
      '00c61b117c4f411df406d524e4a05eedc1393bcc50f9e7895ad08f46a2422e90974a734f30ef08b500405d4d514704e0d99c2ee290b9e238e920cba5d5a1964fe1c37be53c9773c2',
    appEngineRelease: '1.9.71',
    availability: 'DYNAMIC',
    startTime: '2021-03-11T17:28:44.506934Z',
    requests: 3,
    qps: 0.19493178,
    averageLatency: 365,
    memoryUsage: '55549952',
    ...partial,
  };
}
