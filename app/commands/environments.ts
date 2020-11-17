let stagingInUse = false;
let feature1InUse = false;
let feature2InUse = false;

const fs = require('fs');

export const useEnvironment = async ({ command, ack, say }) => {
  // Acknowledge command request
  await ack();

  if (command.text === 'staging') {
    stagingInUse = !stagingInUse;
  }

  await say(`${command.text} is now in use`);
};

export const freeEnvironment = async ({ command, ack, say }) => {
  // Acknowledge command request
  await ack();

  if (command.text === 'staging') {
    stagingInUse = !stagingInUse;
  }

  await say(`${command.text} is now free to be used`);
};

export const environmentsStatus = async ({ command, ack, say }) => {
  // Acknowledge command request
  await ack();

  await say(`${stagingInUse ? 'Staging is in use ' : 'Staging is not in use'}`);
};
