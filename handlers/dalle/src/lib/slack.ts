import { WebClient } from "@slack/web-api";

export function getWebClient(botToken: string) {
  return new WebClient(botToken);
}
