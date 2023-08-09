import {
  type AllMiddlewareArgs,
  type MessageShortcut,
  type SlackShortcutMiddlewareArgs,
} from "@slack/bolt";
import { handleGenerateCommand } from "../lib/handle-generate-request.js";

type DalleShortcutArgs = SlackShortcutMiddlewareArgs<MessageShortcut> & AllMiddlewareArgs;

export async function handleDalleShortcut({
  ack,
  context,
  logger,
  payload,
  respond,
  say,
  shortcut,
}: DalleShortcutArgs) {
  await ack();
  await handleGenerateCommand(
    shortcut.message.text,
    payload.user.id,
    context,
    logger,
    respond,
    say
  );
}
