import { type Context } from "@slack/bolt";
import { type WebClient } from "@slack/web-api";
import { decrypt } from "../../lib/crypto.js";
import { prisma } from "../../lib/prisma-client.js";

export async function triggerHomeUpdate(client: WebClient, context: Context, slackUserId: string) {
  const homeBlocks = [
    {
      type: "header",
      text: {
        type: "plain_text",
        text: "Cauli Bot",
      },
    },
    {
      type: "divider",
    },
  ];

  const apiKey = await prisma.apiKey.findFirst({
    where: {
      slackWorkspace: {
        teamId: context.teamId,
      },
    },
  });

  if (!apiKey) {
    homeBlocks.push(...generateMissingKeyBlocks());
  }

  if (apiKey) {
    homeBlocks.push(...generateConfiguredKeyBlocks(decrypt(apiKey.apiKey), apiKey.organizationId));
  }

  await client.views.publish({
    user_id: slackUserId,
    view: {
      type: "home",
      blocks: homeBlocks,
    },
  });
}

function generateMissingKeyBlocks() {
  return [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `
To use Cauli bot, please provide your <https://platform.openai.com/account/api-keys|API key> and <https://platform.openai.com/account/org-settings|Organization ID>.
*Note:* We recommend creating a unique API key for this bot.
        `,
      },
    },
    {
      type: "actions",
      elements: [
        {
          type: "button",
          text: {
            type: "plain_text",
            text: "Configure",
          },
          action_id: "home:configure_key",
        },
      ],
    },
  ];
}

function generateConfiguredKeyBlocks(apiKey: string, organizationId: string) {
  const formattedKey = `${apiKey.slice(0, 3)}...${apiKey.slice(-4)}`;
  return [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `
You're set up and ready to go! Use the the bot with the following command:
\`\`\`
/cauli [prompt]
\`\`\`
        `,
      },
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `
*Current Configuration*
- API Key: \`${formattedKey}\`
- Organization Id: \`${organizationId}\`
        `,
      },
    },
    {
      type: "actions",
      elements: [
        {
          type: "button",
          text: {
            type: "plain_text",
            text: "Update",
          },
          action_id: "home:configure_key",
        },
        {
          type: "button",
          style: "danger",
          text: {
            type: "plain_text",
            text: "Delete",
          },
          action_id: "home:delete_key",
        },
      ],
    },
  ];
}
