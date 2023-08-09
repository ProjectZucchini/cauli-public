import { type SQSEvent } from "aws-lambda";
import { type AxiosError } from "axios";
import { getWebClient } from "./lib/slack.js";
import { getImages } from "./openai/images.js";
import { uploadImages } from "./slack/images.js";

interface SQSImagePayload {
  botToken: string;
  channelId: string;
  messageTs: string;
  prompt: string;
  apiKey: string;
  organizationId: string;
  userId: string;
}

export const handler = async (event: SQSEvent) => {
  for (const { body } of event.Records) {
    const parsedBody: SQSImagePayload = JSON.parse(body);
    await handleMessage(parsedBody);
  }

  return event;
};

export async function handleMessage({
  apiKey,
  botToken,
  channelId,
  messageTs,
  organizationId,
  prompt,
  userId,
}: SQSImagePayload) {
  const client = getWebClient(botToken);

  let images: { url?: string }[] = [];
  try {
    images = await getImages(apiKey, organizationId, prompt);
    // images = [{ url: "http://placekitten.com/250/250" }, { url: "http://placekitten.com/270/250" }];
    await uploadImages(client, prompt, userId, channelId, images);
  } catch (error) {
    if ((error as AxiosError).response?.status === 401) {
      client.chat.postEphemeral({
        channel: channelId,
        text: `<@${userId}> There was a problem authenticating with OpenAI. Verify that the API key and Organization ID are correct and try again.`,
        user: userId,
      });
    } else {
      console.error(error);
      await client.chat.postEphemeral({
        channel: channelId,
        text: `<@${userId}> There was a problem processing the request. Please try again.`,
        user: userId,
      });
    }
  }

  await client.chat.delete({
    channel: channelId,
    ts: messageTs,
  });
}
