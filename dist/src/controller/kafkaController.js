"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMessage = exports.readyProducer = void 0;
const tslib_1 = require("tslib");
const kafka_node_1 = tslib_1.__importStar(require("kafka-node"));
const kafkaHost = 'localhost:9092';
const client = new kafka_node_1.KafkaClient({ kafkaHost });
const producer = new kafka_node_1.Producer(client);
const km = new kafka_node_1.KeyedMessage('key', 'message');
const payloads = [
    { topic: 'kafka-test-topi', messages: ['hello', 'world', km] }
];
const sendKafkaMessage = () => producer.send(payloads, (err, data) => {
    console.log(data);
});
const readyProducer = () => producer.on('ready', () => sendKafkaMessage());
exports.readyProducer = readyProducer;
const Consumer = kafka_node_1.default.Consumer;
const newClient = new kafka_node_1.default.KafkaClient();
const consumer = new Consumer(newClient, [
    { topic: 'kafka-test-topi', partition: 0 }
], {
    autoCommit: false
});
const getMessage = () => consumer.on('message', (message) => {
    console.log(message);
});
exports.getMessage = getMessage;
