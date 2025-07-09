const { Configuration, OpenAIApi } = require("openai");
const flatted = require("flatted");
const dotenv = require("dotenv");
dotenv.config();
var constant = require("../../constants/defaultConstant");

const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_35,
});

const openai = new OpenAIApi(configuration);

async function askMuslimAI(req) {
  try {
    const { message } = req.body;
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${constant.SPECIFIC_CONTENT}${message}`,
      max_tokens: 3000,
      temperature: 0,
      //   top_p: 1.0,
      //   frequency_penalty: 0.0,
      //   presence_penalty: 0.0,
      //   stop: ["\n"],
    });
    if (response.data.choices[0].text) {
      const jsonString = flatted.stringify(response.data.choices[0].text);
      //console.log(jsonString);
      return {
        aiMessage: jsonString,
        err: null,
      };
    } else {
      //console.log("error");
      return {
        aiMessage: null,
        err: "Can not give proper answer right now",
      };
    }
  } catch (error) {
    //console.log(error);
    return {
      aiMessage: null,
      err: error.response
        ? error.response.data
        : "There was an issue on the server",
    };
  }
}

module.exports = {
  askMuslimAI,
};
