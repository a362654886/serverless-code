"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sqsVisibility = exports.handleMessage = exports.messageFn = exports.deleteMessage = exports.receiveMessage = exports.deleteQueue = exports.createQueue = exports.listQueue = void 0;
const tslib_1 = require("tslib");
const aws_sdk_1 = tslib_1.__importDefault(require("aws-sdk"));
aws_sdk_1.default.config.update({ region: "us-east-1" });
const aws = new aws_sdk_1.default.SQS({ apiVersion: "2012-11-05" });
const listQueue = () => aws.listQueues().promise();
exports.listQueue = listQueue;
const createQueue = (params) => aws.createQueue(params).promise();
exports.createQueue = createQueue;
const deleteQueue = (params) => aws.deleteQueue(params).promise();
exports.deleteQueue = deleteQueue;
const receiveMessage = (params) => aws.receiveMessage(params).promise();
exports.receiveMessage = receiveMessage;
const deleteMessage = (params) => aws.deleteMessage(params).promise();
exports.deleteMessage = deleteMessage;
//helper function
const messageFn = async (message, queueUrl) => {
    if (message.Messages) {
        message.Messages.forEach(async (m) => {
            //handle
            console.log(m.MessageId);
            console.log("------");
            if (m.ReceiptHandle) {
                await exports.deleteMessage({
                    QueueUrl: queueUrl,
                    ReceiptHandle: m.ReceiptHandle,
                });
            }
        });
    }
};
exports.messageFn = messageFn;
const handleMessage = async (params) => exports.messageFn(await exports.receiveMessage(params), params.QueueUrl);
exports.handleMessage = handleMessage;
const sqsVisibility = (params) => aws.changeMessageVisibility(params).promise();
exports.sqsVisibility = sqsVisibility;
