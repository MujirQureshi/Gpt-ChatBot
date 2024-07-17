// const openai = require('./config/open-ai');
// const readlineSync = require('readline-sync');
// const colors = require('colors');

// async function main() {
//   console.log(colors.bold.green("Welcome to the chatbot program!"));
//   console.log(colors.bold.green("You can start chatting with the bot."));

//   const chatHistory = [];

//   while (true) {
//     const userInput = readlineSync.question(colors.yellow("You: "));

//     if (userInput.toLowerCase() === "exit") {
//       console.log(colors.blue("Bot: Goodbye!"));
//       return;
//     }

//     chatHistory.push(["user", userInput]);

//     const messages = chatHistory.map(([role, content]) => ({ role, content }));

//     try {
//       const completion = await openai.chat.completions.create({
//         model: "gpt-3.5-turbo",
//         messages: messages,
//       });

//       const completionText = completion.data.choices[0].message.content;

//       console.log(colors.blue(`Bot: ${completionText}`));

//       chatHistory.push(["bot", completionText]);
//     } catch (error) {
//       console.error(colors.red(error));
//     }
//   }
// }

// main();

const model = require("./config/open-ai");
const readlineSync = require("readline-sync");
const colors = require("colors");

async function main() {
  console.log(colors.bold.green("Welcome to the chatbot program!"));
  console.log(colors.bold.green("You can start chatting with the bot."));

  const chatHistory = [
    {
      role: "user",
      parts: [{ text: "Hello, I have 2 dogs in my house." }],
    },
    {
      role: "model",
      parts: [{ text: "Great to meet you. What would you like to know?" }],
    },
  ];

  const chat = model.startChat({
    history: chatHistory,
    generationConfig: {
      maxOutputTokens: 1000,
    },
  });

  while (true) {
    const userInput = readlineSync.question(colors.yellow("You: "));

    if (userInput.toLowerCase() === "exit") {
      console.log(colors.blue("Bot: Goodbye!"));
      return;
    }

    try {
      const result = await chat.sendMessage(userInput);
      const response = await result.response;

      const text = response.text();
      console.log(colors.blue(`Bot: ${text}`));

      chatHistory.push({ role: "user", parts: [{ text: userInput }] });
      chatHistory.push({ role: "model", parts: [{ text: text }] });
    } catch (error) {
      console.error(colors.red(error));
      return;
    }
  }
}

main();
