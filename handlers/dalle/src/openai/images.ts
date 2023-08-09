import { getOpenAIClient } from "../lib/openai.js";

const IMAGE_NUMBER = 2;
const IMAGE_SIZE = "256x256";

export async function getImages(apiKey: string, organizationId: string, prompt: string) {
  const response = await getOpenAIClient(apiKey, organizationId).createImage({
    prompt: prompt,
    n: IMAGE_NUMBER,
    size: IMAGE_SIZE,
  });

  return response.data.data;
}
