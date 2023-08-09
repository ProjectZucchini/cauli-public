import { prisma } from "../lib/prisma-client.js";

export async function getApiKeyByTeamId(teamId: string) {
  return prisma.apiKey.findFirst({
    where: {
      slackWorkspace: {
        teamId: teamId,
      },
    },
  });
}

export async function deleteApiKey(apiKeyId: number) {
  return prisma.apiKey.delete({
    where: {
      id: apiKeyId,
    },
  });
}
