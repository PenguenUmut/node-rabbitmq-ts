import amqp from "amqplib";
import { MessageConsumer } from "./core/MessageConsumer";
import { MessagePublisher } from "./core/MessagePublisher";

type SampleMessage = {
  id: number;
  name: string;
};

const onMessage1 = (s: SampleMessage) => {
  console.log("consumer1 massage received", s);
};

const onMessage2 = (s: SampleMessage) => {
  console.log("consumer2 massage received", s);
};

const main = async () => {
  const connection = await amqp.connect("amqp://localhost:5672");

  const consumer1 = await MessageConsumer.create(connection, "q1");
  consumer1.consume<SampleMessage>(onMessage1);

  const consumer2 = await MessageConsumer.create(connection, "q2");
  consumer2.consume<SampleMessage>(onMessage2);

  const publisher1 = await MessagePublisher.create(connection, "q1");
  for (let i = 0; i < 50; i++) {
    const m: SampleMessage = { id: i, name: "name" + i };
    publisher1.publish<SampleMessage>(m);
  }

  const publisher2 = await MessagePublisher.create(connection, "q2");
  for (let i = 200; i < 250; i++) {
    const m: SampleMessage = { id: i, name: "name" + i };
    publisher2.publish<SampleMessage>(m);
  }
};

main();
