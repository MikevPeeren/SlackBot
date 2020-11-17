import { stagingInUseBy, featureOneInUseBy, featureTwoInUseBy } from '../data/environmentData';

// This will match any message that contains
export const getEnvironmentStatus = async ({ message, say }: any) => {
  await say(
    `Hello, <@${message.user}>. Staging is in use by ${stagingInUseBy}, Feature One is in use by ${featureOneInUseBy}, Feature Two is in use by ${featureTwoInUseBy}`,
  );
};
