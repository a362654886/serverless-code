import { Handler } from "aws-lambda";
import {
  addSubscription,
  createTopic,
  deleteSubscription,
  deleteTopic,
  listSubscription,
  listTopic,
  sendMessage,
} from "../controller/snsController";

// topic
const snsCreateTopic: Handler = async (event, context) => {
  const { topicName } = JSON.parse(event.body) || {};
  const result = await createTopic(topicName);
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

const snsListTopic: Handler = async (event, context) => {
  const result = await listTopic();
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

const snsDeleteTopic: Handler = async (event, context) => {
  const { topicName } = JSON.parse(event.body) || {};
  const result = await deleteTopic(topicName);
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

// subscription

const snsListSubscription: Handler = async (event, context) => {
  const { topicArn } = event.queryStringParameters;
  const result = await listSubscription({
    TopicArn:topicArn
  });
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

const snsAddSubscription: Handler = async (event, context) => {
  const { snsParams } = JSON.parse(event.body) || {};
  const result = await addSubscription(snsParams);
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

const snsDeleteSubscription: Handler = async (event, context) => {
    const { subscriptionArn } = JSON.parse(event.body) || {};
    const result = await deleteSubscription(subscriptionArn);
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

  const snsSendMessage: Handler = async (event, context) => {
    const { message } = JSON.parse(event.body) || {};
    const result = await sendMessage(message);
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

export {
  snsCreateTopic,
  snsListTopic,
  snsDeleteTopic,
  snsListSubscription,
  snsAddSubscription,
  snsDeleteSubscription,
  snsSendMessage
};
