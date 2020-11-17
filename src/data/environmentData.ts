export let stagingInUse = false;
export let stagingInUseBy = 'Nobody';
export let featureOneInUse = false;
export let featureOneInUseBy = 'Nobody';
export let featureTwoInUse = false;
export let featureTwoInUseBy = 'Nobody';

export const changeEnvironmentStatus = (environment: string, inUseby: string | null) => {
  switch (environment) {
    case 'staging':
      stagingInUse = !stagingInUse;
      stagingInUseBy = inUseby ? inUseby : 'Nobody';
      break;
    case 'feature1':
      featureOneInUse = !featureOneInUse;
      featureOneInUseBy = inUseby ? inUseby : 'Nobody';
      break;
    case 'feature2':
      featureTwoInUse = !featureTwoInUse;
      featureTwoInUseBy = inUseby ? inUseby : 'Nobody';
      break;
    default:
      return;
  }
};
