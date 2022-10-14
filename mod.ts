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

serve((_req) => new Response("still alive!"));
await startBot(bot);
