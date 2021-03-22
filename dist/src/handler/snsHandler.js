"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.snsSendMessage = exports.snsDeleteSubscription = exports.snsAddSubscription = exports.snsListSubscription = exports.snsDeleteTopic = exports.snsListTopic = exports.snsCreateTopic = void 0;
const snsController_1 = require("../controller/snsController");
// topic
const snsCreateTopic = async (event, context) => {
    const { topicName } = JSON.parse(event.body) || {};
    const result = await snsController_1.createTopic(topicName);
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
exports.snsCreateTopic = snsCreateTopic;
const snsListTopic = async (event, context) => {
    const result = await snsController_1.listTopic();
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
exports.snsListTopic = snsListTopic;
const snsDeleteTopic = async (event, context) => {
    const { topicName } = JSON.parse(event.body) || {};
    const result = await snsController_1.deleteTopic(topicName);
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
exports.snsDeleteTopic = snsDeleteTopic;
// subscription
const snsListSubscription = async (event, context) => {
    const { topicArn } = event.queryStringParameters;
    const result = await snsController_1.listSubscription({
        TopicArn: topicArn
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
exports.snsListSubscription = snsListSubscription;
const snsAddSubscription = async (event, context) => {
    const { snsParams } = JSON.parse(event.body) || {};
    const result = await snsController_1.addSubscription(snsParams);
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
exports.snsAddSubscription = snsAddSubscription;
const snsDeleteSubscription = async (event, context) => {
    const { subscriptionArn } = JSON.parse(event.body) || {};
    const result = await snsController_1.deleteSubscription(subscriptionArn);
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
exports.snsDeleteSubscription = snsDeleteSubscription;
const snsSendMessage = async (event, context) => {
    const { message } = JSON.parse(event.body) || {};
    const result = await snsController_1.sendMessage(message);
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
exports.snsSendMessage = snsSendMessage;
