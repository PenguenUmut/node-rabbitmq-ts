import amqp from "amqplib";

const publish = async (queueName: string, name: string, start = 0, end = 10000) => {
  try {
    const connection = await amqp.connect("amqp://localhost:5672");
    const channel = await connection.createChannel();
    const assetion = await channel.assertQueue(queueName);

    console.log("Publisher_" + name + " started for " + queueName);

    for (let i = start; i < end; i++) {
      // const message = { name: "uu", age: 40 };
      const messageString = JSON.stringify({ name: `uu_${i}`, age: 40 + i });
      channel.sendToQueue(queueName, Buffer.from(messageString));

      console.log("Publisher_" + name + " sent a message to " + queueName + ": " + messageString);
    }
  } catch (error) {
    console.log("RabbitMQ publisher_" + name + " to " + queueName + " error", error);
  }
};

export const publisher10 = async () => {
  publish("queue1", "on", 0, 10000);
};
export const publisher11 = async () => {
  publish("queue1", "onbir", 10000, 20000);
};

export const publisher20 = async () => {
  publish("queue2", "yirmi", 0, 10000);
};
export const publisher21 = async () => {
  publish("queue2", "yirmibir", 10000, 20000);
};
