import { type WebClient } from "@slack/web-api";
import { type ImagesResponseDataInner } from "openai";

export async function uploadImages(
  client: WebClient,
  prompt: string,
  userId: string,
  channelId: string,
  images: ImagesResponseDataInner[]
) {
  const imageBuffers: Buffer[] = [];
  for (const image of images) {
    if (!image.url) {
      continue;
    }

    const response = await fetch(image.url);
    imageBuffers.push(Buffer.from(await response.arrayBuffer()));
  }

  await client.files.uploadV2({
    initial_comment: `<@${userId}> Here are your images for \`${prompt}\``,
    channel_id: channelId,
    file_uploads: imageBuffers.map((imageBuffer) => ({
      file: imageBuffer,
      filename: "dalle.png",
    })),
  });
}
