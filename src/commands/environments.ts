import { changeEnvironmentStatus } from '../data/environmentData';

export const useEnvironment = async ({ command, ack, say }: any) => {
  // Acknowledge command request
  await ack();

  switch (command.text) {
    case 'staging':
    case 'feature1':
    case 'feature2':
      changeEnvironmentStatus(command.text, command.user_name);
      await say(
        `${command.text.charAt(0).toUpperCase() + command.text.slice(1)} has now been taken in use  by ${
          command.user_name.charAt(0).toUpperCase() + command.user_name.slice(1)
        } ⚙`,
      );
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
    case 'feature1':
    case 'feature2':
      changeEnvironmentStatus(command.text, null);
      await say(`${command.text.charAt(0).toUpperCase() + command.text.slice(1)} is 🆓 to be used again`);
      break;
    default:
      await say(`${command.text.charAt(0).toUpperCase() + command.text.slice(1)} is not an environment ⛔`);
      return;
  }
};
