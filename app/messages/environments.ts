// This will match any message that contains
export const getEnvironmentStatus = async ({ message, say }) => {
  await say(`Hello, <@${message.user}>`);
};
