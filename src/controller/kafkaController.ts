import kafka,{ KafkaClient as Client, KeyedMessage, Producer } from 'kafka-node';

const kafkaHost = 'localhost:9092';
const client = new Client({ kafkaHost });
const producer = new Producer(client);

const km = new KeyedMessage('key', 'message')

const payloads = [
    { topic: 'kafka-test-topi', messages: ['hello', 'world', km] }
];

const sendKafkaMessage = () =>producer.send(payloads,(err: any, data: any) =>{
    console.log(data)
})

export const readyProducer = () => producer.on('ready',() => sendKafkaMessage());


const Consumer = kafka.Consumer;
const newClient = new kafka.KafkaClient();
const consumer = new Consumer(
    newClient,
    [
        { topic: 'kafka-test-topi', partition: 0 }
    ],
    {
        autoCommit: false
    }
);

export const getMessage = () => consumer.on('message',(message) => {
    console.log(message)
});