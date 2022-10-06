import { createBot, EmojiToggle, Intents, startBot } from "./deps.ts";
import "https://deno.land/x/dotenv@v3.2.0/load.ts";

const verifyChannel = BigInt("1021807055503364187");

const bot = createBot({
	token: Deno.env.get("DISCORD_TOKEN")!,
	intents: Intents.Guilds | Intents.GuildMessages,
	botId: BigInt(Deno.env.get("CLIENT_ID")!),
	events: {
		ready() {
			console.log("Successfully connected to gateway");
		},
	},
});

bot.events.reactionAdd = function (bot, payload) {
	const { userId, channelId, messageId, emoji } = payload;

	if (channelId === verifyChannel) return

	console.log("payload:", JSON.stringify(payload, null, 2));
};

await startBot(bot);
