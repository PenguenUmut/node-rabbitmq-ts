"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.publisher21 = exports.publisher20 = exports.publisher11 = exports.publisher10 = void 0;
const amqplib_1 = __importDefault(require("amqplib"));
const publish = async (queueName, name, start = 0, end = 10000) => {
    try {
        const connection = await amqplib_1.default.connect("amqp://localhost:5672");
        const channel = await connection.createChannel();
        const assetion = await channel.assertQueue(queueName);
        console.log("Publisher_" + name + " started for " + queueName);
        for (let i = start; i < end; i++) {
            // const message = { name: "uu", age: 40 };
            const messageString = JSON.stringify({ name: `uu_${i}`, age: 40 + i });
            channel.sendToQueue(queueName, Buffer.from(messageString));
            console.log("Publisher_" + name + " sent a message to " + queueName + ": " + messageString);
        }
    }
    catch (error) {
        console.log("RabbitMQ publisher_" + name + " to " + queueName + " error", error);
    }
};
const publisher10 = async () => {
    publish("queue1", "on", 0, 10000);
};
exports.publisher10 = publisher10;
const publisher11 = async () => {
    publish("queue1", "onbir", 10000, 20000);
};
exports.publisher11 = publisher11;
const publisher20 = async () => {
    publish("queue2", "yirmi", 0, 10000);
};
exports.publisher20 = publisher20;
const publisher21 = async () => {
    publish("queue2", "yirmibir", 10000, 20000);
};
exports.publisher21 = publisher21;
//# sourceMappingURL=publisher.js.map