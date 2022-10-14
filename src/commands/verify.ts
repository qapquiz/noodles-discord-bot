import { Bot, Interaction } from "../../deps.ts";

export async function verifyHandler(bot: Bot, interaction: Interaction) {
	if (interaction.channelId === undefined) {
		return;
	}

	const message = await bot.helpers.sendMessage(interaction.channelId, {
		embeds: [
			{
				title: "Welcome to noodles ≈ 🍜",
				description:
					"Click the ✅ to verify and gain access to the rest of the server.",
			},
		],
	});

	await bot.helpers.addReaction(interaction.channelId, message.id, "✅");
}
