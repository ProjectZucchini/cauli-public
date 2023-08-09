import { type Context, type Logger, type RespondFn, type SayFn } from "@slack/bolt";
import { CodedError, ErrorCode, WebAPIPlatformError } from "@slack/web-api";
import { CustomContext } from "../../index.js";
import { queuePayload } from "../../lib/sqs.js";

interface SQSImagePayload {
  botToken: string;
  channelId: string;
  messageTs: string;
  prompt: string;
  apiKey: string;
  organizationId: string;
  userId: string;
}

export async function handleGenerateCommand(
  prompt: string | undefined,
  userId: string,
  context: Context & CustomContext,
  logger: Logger,
  respond: RespondFn,
  say: SayFn
) {
  if (!context.botToken || !context.teamId) {
    return;
  }

  if (!prompt) {
    await respond("Error: Please provide a prompt");
    return;
  }

  if (!context.apiKey) {
    await respond("Error: API key hasn't been configured. Set your key and try again");
    return;
  }

  const sanitizedPrompt = sanitizePrompt(prompt);

  let initialMessage: Awaited<ReturnType<SayFn>>;
  try {
    initialMessage = await say({
      blocks: generatePlaceHolderBlocks(sanitizedPrompt, userId),
    });
  } catch (error) {
    if (
      (error as CodedError).code === ErrorCode.PlatformError &&
      (error as WebAPIPlatformError).data.error === "not_in_channel"
    ) {
      respond("Error: The bot isn't in the channel. Add the bot and try again.");
    }
    logger.error(error);
    return;
  }

  if (!initialMessage.channel || !initialMessage.ts) {
    return;
  }

  const payload: SQSImagePayload = {
    botToken: context.botToken,
    channelId: initialMessage.channel,
    messageTs: initialMessage.ts,
    prompt: sanitizedPrompt,
    userId,
    apiKey: context.apiKey.key,
    organizationId: context.apiKey.organizationId,
  };
  const stringPayload = JSON.stringify(payload);

  await queuePayload(stringPayload, context.teamId);
}

function sanitizePrompt(prompt: string) {
  return prompt.replace(/^\*|\*$/g, "");
}

function generatePlaceHolderBlocks(prompt: string, userId: string) {
  return [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `<@${userId}> Generating images for \`${prompt}\` :hourglass:`,
      },
    },
  ];
}
