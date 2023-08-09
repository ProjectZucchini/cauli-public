interface SlackConfig {
  clientId: string;
  clientSecret: string;
  signingSecret: string;
  stateSecret: string;
}

interface SQSConfig {
  queueUrl: string;
  queueRegion: string;
}

interface Config {
  encryptionKey: string;
  frontendUrl: string;
  slack: SlackConfig;
  sqs: SQSConfig;
}

export const config: Config = {
  encryptionKey: process.env.ENCRYPTION_KEY || "",
  frontendUrl: process.env.FRONTEND_URL || "",
  slack: {
    clientId: process.env.SLACK_CLIENT_ID || "",
    clientSecret: process.env.SLACK_CLIENT_SECRET || "",
    signingSecret: process.env.SLACK_SIGNING_SECRET || "",
    stateSecret: process.env.SLACK_STATE_SECRET || "",
  },
  sqs: {
    queueRegion: process.env.SQS_QUEUE_REGION || "",
    queueUrl: process.env.SQS_QUEUE_URL || "",
  },
};
