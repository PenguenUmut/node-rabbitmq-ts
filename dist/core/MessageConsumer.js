"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageConsumer = void 0;
class MessageConsumer {
    channel;
    queueName;
    constructor(channel, queueName) {
        this.channel = channel;
        this.queueName = queueName;
    }
    static create = async (connection, queueName) => {
        const channel = await connection.createChannel();
        const assetion = await channel.assertQueue(queueName);
        const instance = new MessageConsumer(channel, queueName);
        return instance;
    };
    consume = (onMessage, ackOnSuccess = true) => {
        this.channel.consume(this.queueName, (msg) => {
            try {
                if (msg) {
                    const messageString = msg.content.toString();
                    const message = JSON.parse(messageString);
                    onMessage(message);
                    if (ackOnSuccess) {
                        this.channel.ack(msg);
                    }
                }
                else {
                    console.warn("Null message received from " + this.queueName + " queue.");
                }
            }
            catch (error) {
                console.log("MessageConsumer error on " + this.queueName + " consume. Msg: " + msg, error);
            }
        });
    };
    name = () => this.queueName;
}
exports.MessageConsumer = MessageConsumer;
//# sourceMappingURL=MessageConsumer.js.map