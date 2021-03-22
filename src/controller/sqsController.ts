import AWS, { AWSError } from "aws-sdk";
import { PromiseResult } from "aws-sdk/lib/request";

AWS.config.update({ region: "us-east-1" });

const aws = new AWS.SQS({ apiVersion: "2012-11-05" });

export const listQueue = (): Promise<
  PromiseResult<AWS.SQS.ListQueuesResult, AWS.AWSError>
> => aws.listQueues().promise();

export const createQueue = (
  params: AWS.SQS.CreateQueueRequest
): Promise<PromiseResult<AWS.SQS.CreateQueueResult, AWS.AWSError>> =>
  aws.createQueue(params).promise();

export const deleteQueue = (
  params: AWS.SQS.DeleteQueueRequest
): Promise<PromiseResult<AWS.SQS.CreateQueueResult, AWS.AWSError>> =>
  aws.deleteQueue(params).promise();

export const receiveMessage = (
  params: AWS.SQS.ReceiveMessageRequest
): Promise<PromiseResult<AWS.SQS.ReceiveMessageResult, AWSError>> =>
  aws.receiveMessage(params).promise();

export const deleteMessage = (
  params: AWS.SQS.DeleteMessageRequest
): Promise<PromiseResult<{}, AWSError>> => aws.deleteMessage(params).promise();

//helper function
export const messageFn = async (
  message: PromiseResult<AWS.SQS.ReceiveMessageResult, AWSError>,
  queueUrl: string
): Promise<void> => {
  if (message.Messages) {
    message.Messages.forEach(async m => {
      //handle
      console.log(m.MessageId);
      console.log("------");

      if(m.ReceiptHandle){
        await deleteMessage({
          QueueUrl: queueUrl,
          ReceiptHandle: m.ReceiptHandle,
        });
      }
    })
  }
};

export const handleMessage = async (params: AWS.SQS.ReceiveMessageRequest) =>
  messageFn(await receiveMessage(params), params.QueueUrl);

export const sqsVisibility = (
  params: AWS.SQS.ChangeMessageVisibilityRequest
): Promise<PromiseResult<{}, AWSError>> =>
  aws.changeMessageVisibility(params).promise();
