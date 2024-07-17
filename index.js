const openai = require('./config/open-ai');
const readlineSync = require('readline-sync');
const colors = require('colors');

async function main() {
  console.log(colors.bold.green("Welcome to the chatbot program!"));
  console.log(colors.bold.green("You can start chatting with the bot."));

  const chatHistory = [];

  while (true) {
    const userInput = readlineSync.question(colors.yellow("You: "));

    if (userInput.toLowerCase() === "exit") {
      console.log(colors.blue("Bot: Goodbye!"));
      return;
    }

    chatHistory.push(["user", userInput]);

    const messages = chatHistory.map(([role, content]) => ({ role, content }));

    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: messages,
      });

      const completionText = completion.data.choices[0].message.content;

      console.log(colors.blue(`Bot: ${completionText}`));

      chatHistory.push(["bot", completionText]);
    } catch (error) {
      console.error(colors.red(error));
    }
  }
}

main();
