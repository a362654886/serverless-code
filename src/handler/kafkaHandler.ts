import { Handler } from "aws-lambda";
import { getMessage, readyProducer } from "../controller/kafkaController";

const sendKafka: Handler = async (event, context) => {
  const result = await readyProducer();
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      result: result,
    }),
  };
};

const receiveKafka: Handler = async (event, context) => {
    const result = await getMessage();
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        result: result,
      }),
    };
  };

export { sendKafka, receiveKafka };
