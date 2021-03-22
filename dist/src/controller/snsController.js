"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessage = exports.deleteSubscription = exports.addSubscription = exports.listSubscription = exports.deleteTopic = exports.listTopic = exports.createTopic = void 0;
const tslib_1 = require("tslib");
const aws_sdk_1 = tslib_1.__importDefault(require("aws-sdk"));
aws_sdk_1.default.config.update({ region: "us-east-1" });
const aws = new aws_sdk_1.default.SNS({ apiVersion: "2010-03-31" });
// topic
const createTopic = (topicName) => aws.createTopic({ Name: topicName }).promise();
exports.createTopic = createTopic;
const listTopic = () => aws.listTopics({}).promise();
exports.listTopic = listTopic;
const deleteTopic = (topicName) => aws.deleteTopic({ TopicArn: topicName }).promise();
exports.deleteTopic = deleteTopic;
// subscription
const listSubscription = (snsPara) => aws.listSubscriptionsByTopic(snsPara).promise();
exports.listSubscription = listSubscription;
const addSubscription = (snsPara) => aws.subscribe(snsPara).promise();
exports.addSubscription = addSubscription;
const deleteSubscription = (snsPara) => aws.unsubscribe(snsPara).promise();
exports.deleteSubscription = deleteSubscription;
const sendMessage = (message) => aws.publish(message).promise();
exports.sendMessage = sendMessage;
