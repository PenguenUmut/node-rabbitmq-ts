import amqp from "amqplib";

export class MessageConsumer {
  private channel: amqp.Channel;
  private queueName: string;

  private constructor(channel: amqp.Channel, queueName: string) {
    this.channel = channel;
    this.queueName = queueName;
  }

  static create = async (connection: amqp.Connection, queueName: string) => {
    const channel = await connection.createChannel();
    const assetion = await channel.assertQueue(queueName);
    const instance = new MessageConsumer(channel, queueName);
    return instance;
  };

  consume = <T>(onMessage: (t: T) => void, ackOnSuccess: boolean = true) => {
    this.channel.consume(this.queueName, (msg: amqp.ConsumeMessage | null) => {
      try {
        if (msg) {
          const messageString = msg.content.toString();
          const message: T = JSON.parse(messageString);
          onMessage(message);
          if (ackOnSuccess) {
            this.channel.ack(msg);
          }
        } else {
          console.warn("Null message received from " + this.queueName + " queue.");
        }
      } catch (error) {
        console.log("MessageConsumer error on " + this.queueName + " consume. Msg: " + msg, error);
      }
    });
  };

  name = () => this.queueName;
}
