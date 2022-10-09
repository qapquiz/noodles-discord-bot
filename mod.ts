import {
	createBot,
	enableCachePlugin,
	enableHelpersPlugin,
	enableCacheSweepers,
	enablePermissionsPlugin,
	Intents,
	startBot,
	BotWithCache,
	Message,
	Bot,
	Interaction,
	InteractionResponseTypes,
} from "./deps.ts";
import "https://deno.land/x/dotenv@v3.2.0/load.ts";

// const guildId = 1021799324881010768n;

const ChannelId = {
	Verify: 1021807055503364187n,
};

enum Commands {
	Ping = "ping",
	Verify = "verify",
}

const bot = createBot({
	token: Deno.env.get("DISCORD_TOKEN")!,
	intents:
		Intents.Guilds |
		Intents.GuildMessages |
		Intents.MessageContent |
		Intents.GuildMessageReactions,
	botId: BigInt(Deno.env.get("CLIENT_ID")!),
	events: {
		ready() {
			console.log("Successfully connected to gateway");
		},
		messageCreate(bot: Bot, message: Message) {
			console.log("message:", message);
			if (message.isFromBot) {
				return;
			}

			bot.helpers.sendMessage(message.channelId, {
				content: "verify by react to ✅ below here",
			});
		},
		async reactionAdd(bot: Bot, { userId, channelId, emoji, guildId }) {
			if (guildId === undefined) {
				return;
			}

			if (channelId !== ChannelId.Verify && emoji.name !== "✅") {
				return;
			}

			const verifiedRole = (await bot.helpers.getRoles(guildId)).find(
				(role) => role.name === "verified"
			);
			verifiedRole &&
				bot.helpers.addRole(guildId, userId, verifiedRole.id);
		},
		async interactionCreate(bot: Bot, interaction: Interaction) {
			switch (interaction.data?.name) {
				case Commands.Ping:
					await bot.helpers.sendInteractionResponse(
						interaction.id,
						interaction.token,
						{
							type: InteractionResponseTypes.ChannelMessageWithSource,
							data: { content: "🏓 Pong!" },
						}
					);
					break;
				case Commands.Verify: {
					if (interaction.channelId === undefined) {
						return;
					}

					const message = await bot.helpers.sendMessage(interaction.channelId, {
						embeds: [
							{
								title: "Welcome to noodles ≈ 🍜",
								description: "Click the ✅ to verify and gain access to the rest of the server."
							}
						]
					});

					await bot.helpers.addReaction(interaction.channelId, message.id, "✅");
					break;
				}
				default:
					break;
			}
		},
	},
});

enableHelpersPlugin(bot);
enableCachePlugin(bot);
enableCacheSweepers(bot as BotWithCache);
enablePermissionsPlugin(bot as BotWithCache);

await startBot(bot);
