"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagePublisher = void 0;
class MessagePublisher {
    channel;
    queueName;
    constructor(channel, queueName) {
        this.channel = channel;
        this.queueName = queueName;
    }
    static create = async (connection, queueName) => {
        const channel = await connection.createChannel();
        const assetion = await channel.assertQueue(queueName);
        const instance = new MessagePublisher(channel, queueName);
        return instance;
    };
    publish = (t) => {
        const messageString = JSON.stringify(t);
        this.channel.sendToQueue(this.queueName, Buffer.from(messageString));
    };
    name = () => this.queueName;
}
exports.MessagePublisher = MessagePublisher;
//# sourceMappingURL=MessagePublisher.js.map