import { createBot, CreateSlashApplicationCommand, Intents } from "../deps.ts";
import { ServerConstants } from "../src/constant.ts";
import "https://deno.land/x/dotenv@v3.2.0/load.ts";

for (const server of ServerConstants) {
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
		{
			name: "verifyHolder",
			description: "Create verify holder message and wait for interval",
		},
	];

	for (const slashCommand of slashCommands) {
		await bot.helpers.createGuildApplicationCommand(slashCommand, server.GuildId);
	}
});


