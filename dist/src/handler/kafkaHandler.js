"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.receiveKafka = exports.sendKafka = void 0;
const kafkaController_1 = require("../controller/kafkaController");
const sendKafka = async (event, context) => {
    const result = await kafkaController_1.readyProducer();
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
exports.sendKafka = sendKafka;
const receiveKafka = async (event, context) => {
    const result = await kafkaController_1.getMessage();
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
exports.receiveKafka = receiveKafka;
