import {
  type AllMiddlewareArgs,
  type SlackViewMiddlewareArgs,
  type ViewSubmitAction,
} from "@slack/bolt";
import { CustomContext } from "../../index.js";
import { encrypt } from "../../lib/crypto.js";
import { prisma } from "../../lib/prisma-client.js";
import { triggerHomeUpdate } from "../lib/home.js";

type KeySubmitArgs = SlackViewMiddlewareArgs<ViewSubmitAction> & AllMiddlewareArgs<CustomContext>;

export async function handleKeySubmit({ ack, client, context, body, payload }: KeySubmitArgs) {
  const apiKey = payload.state.values.apiKey.apiKey.value;
  const organizationId = payload.state.values.organizationId.organizationId.value;

  if (!apiKey || !organizationId) {
    await ack({
      response_action: "errors",
      errors: {
        channel_select: "Please choose a channel",
      },
    });
    return;
  }
  await ack();

  const slackWorkspace = await prisma.slackWorkspace.findFirstOrThrow({
    where: {
      teamId: context.teamId,
    },
  });

  if (!context.apiKey) {
    await prisma.apiKey.create({
      data: {
        apiKey: encrypt(apiKey),
        organizationId: organizationId,
        slackWorkspaceId: slackWorkspace.id,
      },
    });
  } else {
    await prisma.apiKey.update({
      data: {
        apiKey: encrypt(apiKey),
        organizationId: organizationId,
      },
      where: {
        slackWorkspaceId: slackWorkspace.id,
      },
    });
  }

  await triggerHomeUpdate(client, context, body.user.id);
}

type KeyDeleteArgs = SlackViewMiddlewareArgs<ViewSubmitAction> & AllMiddlewareArgs<CustomContext>;

export async function handleKeyDelete({ ack, client, context, body }: KeyDeleteArgs) {
  const slackWorkspace = await prisma.slackWorkspace.findFirstOrThrow({
    where: {
      teamId: context.teamId,
    },
  });

  await prisma.apiKey.delete({
    where: {
      slackWorkspaceId: slackWorkspace.id,
    },
  });

  await ack();

  await triggerHomeUpdate(client, context, body.user.id);
}
