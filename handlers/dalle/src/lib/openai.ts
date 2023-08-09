import { Configuration, OpenAIApi } from "openai";

export function getOpenAIClient(apiKey: string, organizationId: string) {
  return new OpenAIApi(
    new Configuration({
      apiKey,
      organization: organizationId,
    })
  );
}
