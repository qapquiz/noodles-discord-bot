import { createBot, CreateSlashApplicationCommand, Intents } from "../deps.ts";
import "https://deno.land/x/dotenv@v3.2.0/load.ts";

const guildId = 1021799324881010768n;

const bot = createBot({
	token: Deno.env.get("DISCORD_TOKEN")!,
	intents:
		Intents.Guilds |
		Intents.GuildMessages |
		Intents.MessageContent |
		Intents.GuildMessageReactions,
	botId: BigInt(Deno.env.get("CLIENT_ID")!),
});

const slashCommands: Array<CreateSlashApplicationCommand> = [
	{
		name: "ping",
		description: "Retrieves the Bot latency",
		options: [],
	},
	{
		name: "verify",
		description: "Create verify message and wait for react",
		options: [],
	},
];

for (const slashCommand of slashCommands) {
	await bot.helpers.createGuildApplicationCommand(slashCommand, guildId);
}
