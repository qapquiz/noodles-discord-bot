import {
    dotEnvConfig,
	createBot,
	Intents,
	startBot,
} from "./deps.ts";

dotEnvConfig({ export: true });

const bot = createBot({
	token: Deno.env.get("DISCORD_TOKEN")!,
	intents: Intents.Guilds | Intents.GuildMessages,
	events: {
		ready() {
			console.log("Successfully connected to gateway");
		},
	},
});

await startBot(bot);
