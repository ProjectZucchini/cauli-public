import { type Prisma } from "@dalle/database/generated/client/index.js";
import { type Installation, type InstallationQuery } from "@slack/bolt";
import { prisma } from "../lib/prisma-client.js";

export async function storeInstallation(installation: Installation) {
  if (!installation.team) {
    throw Error("Enterprise installation not supported");
  }

  await prisma.slackWorkspace.upsert({
    where: { teamId: installation.team.id },
    update: {
      teamId: installation.team.id,
      deletedAt: null,
      installation: installation as unknown as Prisma.InputJsonObject,
    },
    create: {
      teamId: installation.team.id,
      installation: installation as unknown as Prisma.InputJsonObject,
    },
  });
}

export async function fetchInstallation(installQuery: InstallationQuery<false>) {
  if (!installQuery.teamId) {
    throw Error("Enterprise installation not supported");
  }

  return (await getByTeamId(installQuery.teamId)).installation as unknown as Installation;
}

export async function deleteInstallation(installQuery: Pick<InstallationQuery<false>, "teamId">) {
  if (!installQuery.teamId) {
    throw Error("Enterprise installation not supported");
  }

  return await prisma.slackWorkspace.delete({
    where: {
      teamId: installQuery.teamId,
    },
  });
}

export async function getByTeamId(teamID: string) {
  return prisma.slackWorkspace.findFirstOrThrow({
    where: {
      teamId: teamID,
    },
  });
}
