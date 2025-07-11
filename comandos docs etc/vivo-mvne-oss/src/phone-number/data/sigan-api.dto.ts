type ResourceSpecification = {
  id: string;
  capacityDemandAmount: string;
  capacityTimePeriod: string;
};

type Resource = {
  value: string;
};

type ResourcePoolItem = {
  resource: Resource;
};

export type ResourceCapacityDemand = {
  resourceCapacityDemand: {
    resourceSpecification: ResourceSpecification;
    resourcePool: ResourcePoolItem[];
  };
};
