import { Handler } from "aws-lambda";
import {
  listQueue,
  createQueue,
  deleteQueue,
  handleMessage,
  sqsVisibility
} from "../controller/sqsController";

//  Queue
const sqsCreateQueue: Handler = async (event, context) => {
  const { params } = JSON.parse(event.body) || {};
  const result = await createQueue(params);
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

const sqsListQueue: Handler = async (event, context) => {
  const result = await listQueue();
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

const sqsDeleteQueue: Handler = async (event, context) => {
  const { params } = JSON.parse(event.body) || {};
  const result = await deleteQueue(params);
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

const sqsHandleMessage: Handler = async (event, context) => {
  const { params } = JSON.parse(event.body) || {};
  const result = await handleMessage(params);
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
export { sqsCreateQueue, sqsListQueue, sqsDeleteQueue, sqsHandleMessage };
