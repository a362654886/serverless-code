import AWS, { AWSError } from "aws-sdk";
import {
  CreateTopicResponse,
  ListSubscriptionsByTopicInput,
  ListTopicsResponse,
} from "aws-sdk/clients/sns";
import { PromiseResult } from "aws-sdk/lib/request";

AWS.config.update({ region: "us-east-1" });
const aws = new AWS.SNS({ apiVersion: "2010-03-31" });
// topic
export const createTopic = (
  topicName: string
): Promise<PromiseResult<CreateTopicResponse, AWSError>> =>
  aws.createTopic({ Name: topicName }).promise();

export const listTopic = (): Promise<
  PromiseResult<ListTopicsResponse, AWSError>
> => aws.listTopics({}).promise();

export const deleteTopic = (
  topicName: string
): Promise<PromiseResult<{}, AWSError>> =>
  aws.deleteTopic({ TopicArn: topicName }).promise();

// subscription
export const listSubscription = (
  snsPara: Pick<snsParams, "TopicArn">
): Promise<PromiseResult<AWS.SNS.ListSubscriptionsByTopicResponse, AWSError>> =>
  aws.listSubscriptionsByTopic(snsPara).promise();

export const addSubscription = (
  snsPara: Omit<snsParams, "SubscriptionArn">
): Promise<PromiseResult<AWS.SNS.SubscribeResponse, AWSError>> =>
  aws.subscribe(snsPara).promise();

export const deleteSubscription = (
  snsPara: Pick<snsParams, "SubscriptionArn">
): Promise<PromiseResult<{}, AWSError>> => aws.unsubscribe(snsPara).promise();

export const sendMessage = (
  message: AWS.SNS.PublishInput
): Promise<PromiseResult<AWS.SNS.PublishResponse, AWSError>> =>
  aws.publish(message).promise();
