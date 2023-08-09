import dotenv from "dotenv";
import { Consumer } from "sqs-consumer";
import { handleMessage } from "../index.js";

dotenv.config();

const app = Consumer.create({
  queueUrl: process.env.SQS_QUEUE_URL || "",
  region: process.env.SQS_QUEUE_REGION || "",
  handleMessage: async (message) => {
    if (!message.Body) {
      return;
    }

    try {
      await handleMessage(JSON.parse(message.Body));
    } catch (error) {
      console.error(error);
    }

    return message;
  },
});

app.on("error", (err) => {
  console.error(err.message);
});

app.on("processing_error", (err) => {
  console.error(err.message);
});

app.on("timeout_error", (err) => {
  console.error(err.message);
});

app.start();
