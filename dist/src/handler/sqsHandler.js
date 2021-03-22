"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sqsHandleMessage = exports.sqsDeleteQueue = exports.sqsListQueue = exports.sqsCreateQueue = void 0;
const sqsController_1 = require("../controller/sqsController");
//  Queue
const sqsCreateQueue = async (event, context) => {
    const { params } = JSON.parse(event.body) || {};
    const result = await sqsController_1.createQueue(params);
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
exports.sqsCreateQueue = sqsCreateQueue;
const sqsListQueue = async (event, context) => {
    const result = await sqsController_1.listQueue();
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
exports.sqsListQueue = sqsListQueue;
const sqsDeleteQueue = async (event, context) => {
    const { params } = JSON.parse(event.body) || {};
    const result = await sqsController_1.deleteQueue(params);
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
exports.sqsDeleteQueue = sqsDeleteQueue;
const sqsHandleMessage = async (event, context) => {
    const { params } = JSON.parse(event.body) || {};
    const result = await sqsController_1.handleMessage(params);
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
exports.sqsHandleMessage = sqsHandleMessage;
