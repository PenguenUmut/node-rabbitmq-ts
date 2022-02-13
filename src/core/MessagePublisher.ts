import amqp from "amqplib";

export class MessagePublisher {
  private channel: amqp.Channel;
  private queueName: string;

  private constructor(channel: amqp.Channel, queueName: string) {
    this.channel = channel;
    this.queueName = queueName;
  }

  static create = async (connection: amqp.Connection, queueName: string) => {
    const channel = await connection.createChannel();
    const assetion = await channel.assertQueue(queueName);
    const instance = new MessagePublisher(channel, queueName);
    return instance;
  };

  publish = <T>(t: T) => {
    const messageString = JSON.stringify(t);
    this.channel.sendToQueue(this.queueName, Buffer.from(messageString));
  };

  name = () => this.queueName;
}
