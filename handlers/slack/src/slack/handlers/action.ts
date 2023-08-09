import {
  type AllMiddlewareArgs,
  type BlockAction,
  type SlackActionMiddlewareArgs,
} from "@slack/bolt";
import { CustomContext } from "../../index.js";

type HomeConfigureKeyArgs = SlackActionMiddlewareArgs<BlockAction> &
  AllMiddlewareArgs<CustomContext>;

export async function handleConfigureKey({
  ack,
  body,
  client,
  context,
  logger,
}: HomeConfigureKeyArgs) {
  await ack();

  const organizationIdInitial = context.apiKey?.organizationId || "";

  try {
    await client.views.open({
      trigger_id: body.trigger_id,
      view: {
        type: "modal",
        callback_id: "key:submit",
        title: {
          type: "plain_text",
          text: "Configure",
        },
        close: {
          type: "plain_text",
          text: "Cancel",
        },
        submit: {
          type: "plain_text",
          text: "Submit",
        },
        blocks: [
          {
            type: "input",
            block_id: "apiKey",
            element: {
              type: "plain_text_input",
              action_id: "apiKey",
              placeholder: {
                type: "plain_text",
                text: "API Key",
              },
            },
            label: {
              type: "plain_text",
              text: "API Key",
            },
          },
          {
            type: "input",
            block_id: "organizationId",
            element: {
              type: "plain_text_input",
              action_id: "organizationId",
              initial_value: organizationIdInitial,
              placeholder: {
                type: "plain_text",
                text: "Organization ID",
              },
            },
            label: {
              type: "plain_text",
              text: "Organization ID",
            },
          },
        ],
      },
    });
  } catch (error) {
    logger.error(error);
  }
}

type HomeDeleteKeyArgs = SlackActionMiddlewareArgs<BlockAction> & AllMiddlewareArgs<CustomContext>;

export async function handleDeleteKey({ ack, body, client, logger }: HomeDeleteKeyArgs) {
  await ack();

  try {
    await client.views.open({
      trigger_id: body.trigger_id,
      view: {
        type: "modal",
        callback_id: "key:delete",
        title: {
          type: "plain_text",
          text: "Delete",
        },
        close: {
          type: "plain_text",
          text: "Cancel",
        },
        submit: {
          type: "plain_text",
          text: "Confirm",
        },
        blocks: [
          {
            type: "section",
            text: {
              type: "plain_text",
              text: "Are you sure you want to delete the configured API key and Organization ID?",
            },
          },
        ],
      },
    });
  } catch (error) {
    logger.error(error);
  }
}
