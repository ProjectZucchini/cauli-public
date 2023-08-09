import { AllMiddlewareArgs, AnyMiddlewareArgs } from "@slack/bolt";
import { getApiKeyByTeamId } from "../data/api-key.js";
import { decrypt } from "../lib/crypto.js";

export async function boltApiKeyMw({ context, next }: AnyMiddlewareArgs & AllMiddlewareArgs) {
  if (!context.teamId) {
    throw new Error("Context is missing teamId.");
  }

  const apiKey = await getApiKeyByTeamId(context.teamId);

  if (apiKey) {
    context.apiKey = {
      key: decrypt(apiKey.apiKey),
      organizationId: apiKey.organizationId,
    };
  }

  await next();
}
