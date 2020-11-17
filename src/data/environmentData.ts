export let stagingInUse: boolean = false;
export let stagingInUseBy: string | null = '';
export let featureOneInUse: boolean = false;
export let featureOneInUseBy: string | null = '';
export let featureTwoInUse: boolean = false;
export let featureTwoInUseBy: string | null = '';

export const changeEnvironmentStatus = async (environment: string, inUseby: string | null) => {
  switch (environment) {
    case 'staging':
      stagingInUse = !stagingInUse;
      stagingInUseBy = inUseby ? inUseby.charAt(0).toUpperCase() + inUseby.slice(1) : null;
      break;
    case 'feature1':
      featureOneInUse = !featureOneInUse;
      featureOneInUseBy = inUseby ? inUseby.charAt(0).toUpperCase() + inUseby.slice(1) : null;
      break;
    case 'feature2':
      featureTwoInUse = !featureTwoInUse;
      featureTwoInUseBy = inUseby ? inUseby.charAt(0).toUpperCase() + inUseby.slice(1) : null;
      break;
    default:
      break;
  }
};
