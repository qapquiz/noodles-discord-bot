import {
	createBot,
	Intents,
	startBot,
} from "./deps.ts";
import 'https://deno.land/x/dotenv@v3.2.0/load.ts';

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

await startBot(bot);
