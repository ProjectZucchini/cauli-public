import bolt from "@slack/bolt";
import serverlessExpress from "@vendia/serverless-express";
import { config } from "./lib/config.js";
import { boltApiKeyMw } from "./middleware/api-key.js";
import { handleConfigureKey, handleDeleteKey } from "./slack/handlers/action.js";
import { handleDalleCommand } from "./slack/handlers/command.js";
import { handleAppHomeOpened, handleAppUninstalled } from "./slack/handlers/event.js";
import { handleDalleShortcut } from "./slack/handlers/shortcut.js";
import { handleKeyDelete, handleKeySubmit } from "./slack/handlers/view.js";
import { installationStore } from "./slack/lib/installation-store.js";

export interface CustomContext {
  apiKey?: {
    key: string;
    organizationId: string;
  };
}

export const expressReceiver = new bolt.ExpressReceiver({
  signingSecret: config.slack.signingSecret,
  clientId: config.slack.clientId,
  clientSecret: config.slack.clientSecret,
  stateSecret: config.slack.stateSecret,
  installationStore: installationStore,
  installerOptions: {
    directInstall: true,
    callbackOptions: {
      failure: (error, installOptions, req, response) => {
        if (error.message === "User cancelled the OAuth installation flow!") {
          response
            .writeHead(302, {
              Location: `${config.frontendUrl}`,
            })
            .end();
          return;
        }

        response.writeHead(400, { "Content-Type": "text/html" });
        response.write(`<html>
<head>
<style>
body {
  padding: 10px 15px;
  font-family: verdana;
  text-align: center;
}
</style>
</head>
<body>
<h2>Oops, Something Went Wrong!</h2>
<p>Please go back and try again. If the problem persists, you can contact us via our support page.</p>
</body>
</html>
        `);
        response.end();
      },
    },
  },
  processBeforeResponse: true,
  scopes: ["chat:write", "commands", "files:read", "files:write"],
  dispatchErrorHandler: async ({ error, logger, request, response }) => {
    logger.error(`dispatch error: ${error}`, (request as any).body);
    response.writeHead(200);

    response.write("Something went wrong! :face_palm: Please try again.");
    response.end();
  },
  processEventErrorHandler: async ({ error, logger, request, response }) => {
    logger.error(`processEvent error: ${error}`, (request as any).body);
    response.writeHead(200);
    response.write("Something went wrong! :face_palm: Please try again.");
    response.end();
    return true;
  },
  unhandledRequestHandler: async ({ logger, request, response }) => {
    logger.error("UnhandledRequestError", (request as any).body);
    response.writeHead(200);
    response.write("Something went wrong! :face_palm: Please try again.");
    response.end();
  },
  unhandledRequestTimeoutMillis: 2000,
});

const app = new bolt.App({
  logLevel: process.env.IS_OFFLINE ? bolt.LogLevel.DEBUG : bolt.LogLevel.INFO,
  receiver: expressReceiver,
});
app.use(boltApiKeyMw);

app.event("app_home_opened", handleAppHomeOpened);
app.event("app_uninstalled", handleAppUninstalled);

app.command("/cauli", handleDalleCommand);

app.shortcut("cauli_it", handleDalleShortcut);

app.action("home:configure_key", handleConfigureKey);
app.action("home:delete_key", handleDeleteKey);

app.view("key:delete", handleKeyDelete);
app.view("key:submit", handleKeySubmit);

// Exporting handler for Lambda runtime
export const handler = serverlessExpress({
  app: expressReceiver.app,
});
