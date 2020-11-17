import { changeEnvironmentStatus } from '../data/environmentData';

export const useEnvironment = async ({ command, ack, say }: any) => {
  // Acknowledge command request
  await ack();

  switch (command.text) {
    case 'staging':
    case 'feature1':
    case 'feature2':
      changeEnvironmentStatus(command.text, command.user_name);
      await say(`${command.text} is now in use`);
      break;
    default:
      await say(`${command.text} is not an environment`);
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
      await say(`${command.text} is 🆓 to be used again`);
      break;
    default:
      await say(`${command.text} is not an environment`);
      return;
  }
};
