import { type SlackEventMiddlewareArgs, type AllMiddlewareArgs } from "@slack/bolt";
import { type CustomContext } from "../../index.js";
import { deleteApiKey, getApiKeyByTeamId } from "../../data/api-key.js";
import { deleteInstallation } from "../../data/slack-workspace.js";
import { triggerHomeUpdate } from "../lib/home.js";

type AppHomeOpenedArgs = SlackEventMiddlewareArgs<"app_home_opened"> &
  AllMiddlewareArgs<CustomContext>;

type AppUninstalledArgs = SlackEventMiddlewareArgs<"app_uninstalled"> &
  AllMiddlewareArgs<CustomContext>;

export async function handleAppHomeOpened({ client, context, payload }: AppHomeOpenedArgs) {
  await triggerHomeUpdate(client, context, payload.user);
}

export async function handleAppUninstalled({ logger, context }: AppUninstalledArgs) {
  if (context.isEnterpriseInstall && context.enterpriseId !== undefined) {
    throw Error("Enterprise installation not supported");
  }

  if (!context.teamId) {
    throw Error("teamId is missing");
  }

  const apiKey = await getApiKeyByTeamId(context.teamId);

  try {
    if (apiKey) {
      await deleteApiKey(apiKey.id);
    }

    await deleteInstallation({
      teamId: context.teamId,
    });
  } catch (error) {
    logger.error(error);
  }
}
