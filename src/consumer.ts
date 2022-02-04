import amqp from "amqplib";

const consume = async (queueName: string, name: string) => {
  try {
    const connection = await amqp.connect("amqp://localhost:5672");
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
  } catch (error) {
    console.log("RabbitMQ consumer_" + name + " from " + queueName + " error", error);
  }
};

export const consumer10 = async () => {
  consume("queue1", "ten");
};
export const consumer11 = async () => {
  consume("queue1", "eleven");
};

export const consumer20 = async () => {
  consume("queue2", "twenty");
};
export const consumer21 = async () => {
  consume("queue2", "twentyone");
};
