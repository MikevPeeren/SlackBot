const quoteArray = [
  `Uncle Jesse: You know what you get when you cross a donkey with an union?\ 
  Luke Duke: What?\ 
  Boss Hogg: A piece of ass that brings a tear to your eye!\ `,
  `Uncle Jesse: You know why divorces are so expensive?\ 
  Luke Duke: Why?\ 
  Uncle Jesse: Because they're worth it!\ `,
  `Daisy Duke: I think something bounced up in my undercarriage.\ `,
  `“[after shooting a gas can with a flaming arrow] Boom-shakalaka.” - Bo Duke`,
  `“Luke, you manwhore.” - Bo Duke`,
  `“You know what happens when a politician takes Viagra? He gets taller.” - Uncle Jesse Duke`,
];

export const getRandomQuote = async ({ command, ack, say }: any) => {
  const randomNumber = Math.floor(Math.random() * quoteArray.length);

  await say(`${quoteArray[randomNumber]}`);
};
