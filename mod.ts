import {
	createBot,
	enableCachePlugin,
	enableHelpersPlugin,
	enableCacheSweepers,
	enablePermissionsPlugin,
	Intents,
	startBot,
	BotWithCache,
	ActivityTypes,
	serve,
} from "./deps.ts";
import "https://deno.land/x/dotenv@v3.2.0/load.ts";
import {
	guildMemberAdd,
	interactionCreate,
	messageCreate,
	reactionAdd,
	reactionRemove,
	ready,
} from "./src/events/mod.ts";

const bot = createBot({
	token: Deno.env.get("DISCORD_TOKEN")!,
	intents:
		Intents.Guilds |
		Intents.GuildMembers |
		Intents.GuildMessages |
		Intents.MessageContent |
		Intents.GuildMessageReactions,
	botId: BigInt(Deno.env.get("CLIENT_ID")!),
	events: {
		ready,
		messageCreate,
		reactionAdd,
		reactionRemove,
		interactionCreate,
		guildMemberAdd,
	},
});

enableHelpersPlugin(bot);
enableCachePlugin(bot);
enableCacheSweepers(bot as BotWithCache);
enablePermissionsPlugin(bot as BotWithCache);

await bot.helpers.editBotStatus({
	status: "online",
	activities: [
		{
			type: ActivityTypes.Competing,
			name: "noodles challenge",
			createdAt: new Date().getTime(),
		},
	],
});

const TWITTER_FEED_HOOK_ROUTE = new URLPattern({ pathname: "/twitter-feed" });

const handler = (req: Request): Response => {
	if (TWITTER_FEED_HOOK_ROUTE.exec(req.url)) {
		console.log("twitter feed req:", req);
	}

	return new Response("still alive!");
};

serve(handler);
await startBot(bot);
