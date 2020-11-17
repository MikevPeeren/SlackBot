// Enviroments Check
import { changeEnvironmentStatus } from '../data/environmentData';

// Enviroment Data
import { stagingInUseBy, featureOneInUseBy, featureTwoInUseBy } from '../data/environmentData';

import { STAGING, FEATURE_ONE, FEATURE_TWO } from '../constants/general';

export const useEnvironment = async ({ command, ack, say }: any) => {
  // Acknowledge command request
  await ack();

  switch (command.text.toLowerCase()) {
    case STAGING.toLowerCase():
      if (stagingInUseBy) {
        changeEnvironmentStatus(command.text, command.user_name);
        takeEnvironmentInUse(command, say, true);
      } else await environmentAlreadyTakenMessage(command.text, say, true, stagingInUseBy);
    case FEATURE_ONE.toLowerCase():
      if (featureOneInUseBy) {
        changeEnvironmentStatus(command.text, command.user_name);
        takeEnvironmentInUse(command, say, false);
      } else await environmentAlreadyTakenMessage(command.text, say, false, featureOneInUseBy);
    case FEATURE_TWO.toLowerCase():
      if (featureTwoInUseBy) {
        changeEnvironmentStatus(command.text, command.user_name);
        await takeEnvironmentInUse(command, say, false);
      } else await environmentAlreadyTakenMessage(command.text, say, false, featureTwoInUseBy);
      break;
    default:
      await say(`${command.text.charAt(0).toUpperCase() + command.text.slice(1)} is not an environment ⛔`);
      return;
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
      return;
  }
};

// This will match any message that contains
export const getEnvironmentStatus = async ({ command, ack, say }: any) => {
  // Acknowledge command request
  await ack();

  await say(`
    :acc: ${stagingInUseBy ? ' :red_circle:' : ':green_cicle:'} Staging is ${
    stagingInUseBy ? 'taken by ' + `${stagingInUseBy}` : 'free to use'
  }\ 
    :feat: ${featureOneInUseBy ? ' :red_circle:' : ':green_cicle:'} Feature 1 is ${
    featureOneInUseBy ? 'taken by ' + `${featureOneInUseBy}` : 'free to use'
  }.\ 
    :feat: ${featureTwoInUseBy ? ' :red_circle:' : ':green_cicle:'} Feature 2 is ${
    featureTwoInUseBy ? 'taken by ' + `${featureTwoInUseBy}` : 'free to use'
  }\ 
  `);
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

const environmentAlreadyTakenMessage = async (commandText: string, say: any, isStaging: boolean, inUseBy: string) => {
  await say(
    `Sorry , but ${
      isStaging ? ':acc:' : ':feat:'
    } ${commandText} is already taken by ${inUseBy} :red_circle:. Use /free first.`,
  );
};

const environmentFreeMessage = async (command: any, say: any, isStaging: boolean) => {
  await say(
    `${isStaging ? ':acc:' : ':feat:'} ${
      command.text.charAt(0).toUpperCase() + command.text.slice(1)
    } is now free to use :green_circle:, thanks ${command.user_name}`,
  );
};
