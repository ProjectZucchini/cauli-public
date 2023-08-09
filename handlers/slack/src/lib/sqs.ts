import { createHash } from "node:crypto";
import { Producer } from "sqs-producer";
import { v4 as uuidv4 } from "uuid";
import { config } from "./config.js";

const producer = Producer.create({
  queueUrl: config.sqs.queueUrl,
  region: config.sqs.queueRegion,
});

export async function queuePayload(payload: string, groupId: string) {
  await producer.send({
    id: uuidv4(),
    body: payload,
    groupId: groupId,
    deduplicationId: createHash("md5").update(payload).digest("hex"),
  });
}
