import { Bot, Interaction } from "../../deps.ts";
import { ServersMapped } from "../constant.ts";

export async function verifyHandler(bot: Bot, interaction: Interaction) {
	if (interaction.guildId === undefined) return;
	if (interaction.channelId === undefined) return;
	
	const server = ServersMapped[interaction.guildId.toString()];

	const message = await bot.helpers.sendMessage(server.Channel.Verify, {
		embeds: [
			{
				title: `Welcome to ${server.Name}`,
				description:
					"Click the ✅ to verify and gain access to the rest of the server.",
			},
		],
	});

	await bot.helpers.addReaction(server.Channel.Verify, message.id, "✅");
}
