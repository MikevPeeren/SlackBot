const quoteArray = [
  `Uncle Jesse: You know what you get when you cross a donkey with an union?\ Luke Duke: What?\ Boss Hogg: A piece of ass that brings a tear to your eye!\ `,
  `Uncle Jesse: You know why divorces are so expensive?\ Luke Duke: Why?\ Uncle Jesse: Because they're worth it!`,
];

export const getRandomQuote = async ({ command, ack, say }: any) => {
  // Acknowledge command request
  await ack();

  const randomNumber = Math.floor(Math.random() * quoteArray.length);

  await say(`${quoteArray[randomNumber]}`);
};
