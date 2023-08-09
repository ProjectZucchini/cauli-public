import { type AllMiddlewareArgs, type SlackCommandMiddlewareArgs } from "@slack/bolt";
import { handleGenerateCommand } from "../lib/handle-generate-request.js";

type DalleActionArgs = SlackCommandMiddlewareArgs & AllMiddlewareArgs;

export async function handleDalleCommand({
  ack,
  client,
  command,
  context,
  logger,
  payload,
  respond,
  say,
}: DalleActionArgs) {
  await ack();
  try {
    await handleGenerateCommand(command.text, payload.user_id, context, logger, respond, say);
  } catch (error) {
    await client.chat.postEphemeral({
      channel: payload.channel_id,
      text: `<@${payload.user_id}> There was a problem processing the request. Please try again.`,
      user: payload.user_id,
    });
    logger.error(error);
  }
}
