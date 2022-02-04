"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.consumer21 = exports.consumer20 = exports.consumer11 = exports.consumer10 = void 0;
const amqplib_1 = __importDefault(require("amqplib"));
const consume = async (queueName, name) => {
    try {
        const connection = await amqplib_1.default.connect("amqp://localhost:5672");
        const channel = await connection.createChannel();
        const assertion = await channel.assertQueue(queueName);
        channel.consume(queueName, (res) => {
            if (res) {
                const messageString = res.content.toString();
                console.log("Consumer_" + name + " got a message from " + queueName + ": " + messageString);
                channel.ack(res);
            }
        });
        console.log("Consumer_" + name + " is listening " + queueName + " started.");
    }
    catch (error) {
        console.log("RabbitMQ consumer_" + name + " from " + queueName + " error", error);
    }
};
const consumer10 = async () => {
    consume("queue1", "ten");
};
exports.consumer10 = consumer10;
const consumer11 = async () => {
    consume("queue1", "eleven");
};
exports.consumer11 = consumer11;
const consumer20 = async () => {
    consume("queue2", "twenty");
};
exports.consumer20 = consumer20;
const consumer21 = async () => {
    consume("queue2", "twentyone");
};
exports.consumer21 = consumer21;
//# sourceMappingURL=consumer.js.map