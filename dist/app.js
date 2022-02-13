"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const amqplib_1 = __importDefault(require("amqplib"));
const MessageConsumer_1 = require("./core/MessageConsumer");
const MessagePublisher_1 = require("./core/MessagePublisher");
const onMessage1 = (s) => {
    console.log("consumer1 massage received", s);
};
const onMessage2 = (s) => {
    console.log("consumer2 massage received", s);
};
const main = async () => {
    const connection = await amqplib_1.default.connect("amqp://localhost:5672");
    const consumer1 = await MessageConsumer_1.MessageConsumer.create(connection, "q1");
    consumer1.consume(onMessage1);
    const consumer2 = await MessageConsumer_1.MessageConsumer.create(connection, "q2");
    consumer2.consume(onMessage2);
    const publisher1 = await MessagePublisher_1.MessagePublisher.create(connection, "q1");
    for (let i = 0; i < 50; i++) {
        const m = { id: i, name: "name" + i };
        publisher1.publish(m);
    }
    const publisher2 = await MessagePublisher_1.MessagePublisher.create(connection, "q2");
    for (let i = 200; i < 250; i++) {
        const m = { id: i, name: "name" + i };
        publisher2.publish(m);
    }
};
main();
//# sourceMappingURL=app.js.map