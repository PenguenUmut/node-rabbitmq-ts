import { consumer10, consumer11, consumer20, consumer21 } from "./consumer";

const read = async () => {
  consumer10();
  consumer11();

  consumer20();
  consumer21();
};

read();
