// const { OpenAI } = require('openai');


// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// module.exports = openai;


const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});


module.exports = model;