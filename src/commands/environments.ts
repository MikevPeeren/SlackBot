// Enviroments Check
import { changeEnvironmentStatus } from '../data/environmentData';

// Enviroment Data
import { stagingInUseBy, featureOneInUseBy, featureTwoInUseBy } from '../data/environmentData';

// Constants
import { STAGING, FEATURE_ONE, FEATURE_TWO } from '../constants/general';

export const useEnvironment = async ({ command, ack, say }: any) => {
  // Acknowledge command request
  await ack();

  const stagingLowerCase = STAGING.toLowerCase();
  const featureOneLowerCase = FEATURE_ONE.toLocaleLowerCase();
  const featureTwoLowerCase = FEATURE_TWO.toLocaleLowerCase();

  switch (command.text.toLowerCase()) {
    case stagingLowerCase:
    case STAGING:
      if (!stagingInUseBy) {
        await changeEnvironmentStatus(command.text, command.user_name);
        await takeEnvironmentInUse(command, say, true);
      } else await environmentAlreadyTakenMessage(command, say, true, stagingInUseBy);
    case featureOneLowerCase:
    case FEATURE_ONE:
      if (!featureOneInUseBy) {
        await changeEnvironmentStatus(command.text, command.user_name);
        await takeEnvironmentInUse(command, say, false);
      } else await environmentAlreadyTakenMessage(command, say, false, featureOneInUseBy);
    case featureTwoLowerCase:
    case FEATURE_TWO:
      if (!featureTwoInUseBy) {
        await changeEnvironmentStatus(command.text, command.user_name);
        await takeEnvironmentInUse(command, say, false);
      } else await environmentAlreadyTakenMessage(command, say, false, featureTwoInUseBy);
      break;
    default:
      await say(`${command.text.charAt(0).toUpperCase() + command.text.slice(1)} is not an environment ⛔`);
  }
};

export const freeEnvironment = async ({ command, ack, say }: any) => {
  // Acknowledge command request
  await ack();

  switch (command.text) {
    case 'staging':
      environmentFreeMessage(command, say, true);
      changeEnvironmentStatus(command.text, null);
    case 'feature1':
      environmentFreeMessage(command, say, false);
      changeEnvironmentStatus(command.text, null);
    case 'feature2':
      environmentFreeMessage(command, say, false);
      changeEnvironmentStatus(command.text, null);
      break;
    default:
      await say(`${command.text.charAt(0).toUpperCase() + command.text.slice(1)} is not an environment ⛔`);
  }
};

// This will match any message that contains
export const getEnvironmentStatus = async ({ command, ack, say }: any) => {
  // Acknowledge command request
  await ack();

  await say(`
    :acc: ${stagingInUseBy ? ':red_circle:' : ':green_circle:'} Staging is ${
    stagingInUseBy ? 'taken by ' + `${stagingInUseBy}` : 'free to use'
  }`);
  await say(
    `:feat: ${featureOneInUseBy ? ':red_circle:' : ':green_circle:'} Feature 1 is ${
      featureOneInUseBy ? 'taken by ' + `${featureOneInUseBy}` : 'free to use'
    }.`,
  );
  await say(`
    :feat: ${featureTwoInUseBy ? ':red_circle:' : ':green_circle:'} Feature 2 is ${
    featureTwoInUseBy ? 'taken by ' + `${featureTwoInUseBy}` : 'free to use'
  }.`);
};

const takeEnvironmentInUse = async (command: any, say: any, isStaging: boolean) => {
  await say(
    `${isStaging ? ':acc:' : ':feat:'} ${
      command.text.charAt(0).toUpperCase() + command.text.slice(1)
    } is now taken by ${
      command.user_name.charAt(0).toUpperCase().replace(/\./g, ' ') + command.user_name.slice(1).replace(/\./g, ' ')
    } :red_circle:`,
  );
};

const environmentAlreadyTakenMessage = async (command: any, say: any, isStaging: boolean, inUseBy: string | null) => {
  await say(
    `Sorry <@${command.user_name}>, but ${isStaging ? ':acc:' : ':feat:'} ${
      command.text
    } is already taken by ${inUseBy} :red_circle:. Use /free first.`,
  );
};

const environmentFreeMessage = async (command: any, say: any, isStaging: boolean) => {
  await say(
    `${isStaging ? ':acc:' : ':feat:'} ${
      command.text.charAt(0).toUpperCase() + command.text.slice(1)
    } is now free to use :green_circle:, thanks ${command.user_name}`,
  );
};
