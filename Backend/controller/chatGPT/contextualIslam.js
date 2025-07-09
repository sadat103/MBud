const { Configuration, OpenAIApi } = require("openai");
const flatted = require("flatted");
const dotenv = require("dotenv");
dotenv.config();
var constant = require("../../constants/defaultConstant");

const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_35,
});

const openai = new OpenAIApi(configuration);

let context = null;

// Start a conversation with the bot
async function startContextMuslim(req) {
  try {
    context = null;
    const { message } = req.body;
    console.log(message);
    const response = await contextMuslimAI(message);
    console.log(response);
    if (response) {
      return {
        aiMessageStart: response,
        errStart: null,
      };
    } else {
      //console.log("error");
      return {
        aiMessageStart: null,
        errStart: "Can not give proper answer right now",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      aiMessageStart: null,
      errStart: error.response
        ? error.response.data
        : "There was an issue on the server",
    };
  }
}

// Continue a conversation with the bot
async function continueContextMuslim(req) {
  try {
    const { message } = req.body;
    const response = await contextMuslimAI(message, context);
    if (response) {
      return {
        aiMessageContinue: response,
        errContinue: null,
      };
    } else {
      //console.log("error");
      return {
        aiMessageContinue: null,
        errContinue: "Can not give proper answer right now",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      aiMessageContinue: null,
      errContinue: error.response
        ? error.response.data
        : "There was an issue on the server",
    };
  }
}

// Generate a response from the bot
async function contextMuslimAI(prompt, context) {
  const request = {
    model: "text-davinci-003",
    prompt: `${constant.FOLLOW_UP_CONTENT}${prompt}`,
    max_tokens: 1024,
    n: 1,
    stop: null,
    temperature: 0.5,
  };
  console.log(request, prompt, context);
  if (context !== null) {
    request.context = context;
  }
  console.log(request);
  if (request) {
    const response = await openai.createCompletion(request);
    console.log("response", response);
    context = flatted.stringify(response.data.choices[0].text);
    return context;
  }
}

module.exports = {
  startContextMuslim,
  continueContextMuslim,
};
