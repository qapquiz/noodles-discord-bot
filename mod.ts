import { serve, startBot } from "./deps.ts";
import { ServerConstants } from "./src/constant.ts";
import { BotCache } from "./bot.ts";

const TWITTER_FEED_HOOK_ROUTE = new URLPattern({ pathname: "/twitter-feed" });
const GIZMO_GAZETTE_ROUTE = new URLPattern({ pathname: "/x-gizmo-gazette" });

const handler = async (req: Request): Promise<Response> => {
  const serverConfig = ServerConstants[0];

  if (TWITTER_FEED_HOOK_ROUTE.exec(req.url) && req.body) {
    const body = await req.text();
    await BotCache.helpers.sendMessage(serverConfig.Channel.twitterFeed, {
      content: `Ayo, **NoodlesDudeNFT** just posted a new Tweet!\n${body}`,
    });
  }

  if (GIZMO_GAZETTE_ROUTE.exec(req.url) && req.body) {
    const body = await req.text();
    await BotCache.helpers.sendMessage(serverConfig.Channel.gizmoGazette, {
      content: `${body}`,
    });
  }

  return new Response("still alive!");
};

serve(handler);
await startBot(BotCache);
