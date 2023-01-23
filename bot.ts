import {
	BotWithCache,
	BotWithHelpersPlugin,
	Collection,
	createBot,
	enableCachePlugin,
	enableCacheSweepers,
	enableHelpersPlugin,
	enablePermissionsPlugin,
	Intents,
} from "./deps.ts";
import {
	guildMemberAdd,
	interactionCreate,
	messageCreate,
	reactionAdd,
	reactionRemove,
	ready,
} from "./src/events/mod.ts";
import "https://deno.land/x/dotenv@v3.2.0/load.ts";

const bot = createBot({
	token: Deno.env.get("DISCORD_TOKEN")!,
	intents:
		Intents.Guilds |
		Intents.GuildMembers |
		Intents.GuildMessages |
		Intents.GuildVoiceStates |
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

export interface BotClient extends BotWithCache<BotWithHelpersPlugin> {
	// deno-lint-ignore no-explicit-any
	commands: Collection<string, any>;
}

export const BotCache = bot as BotClient;
BotCache.commands = new Collection();
