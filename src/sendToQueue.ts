import { publisher10, publisher11, publisher20, publisher21 } from "./publisher";

const send = async () => {
  publisher10();
  publisher11();

  publisher20();
  publisher21();
};

send();
