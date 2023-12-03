import { Bot, Interaction, InteractionResponseTypes } from "../../deps.ts";

export async function pingHandler(bot: Bot, interaction: Interaction) {
  await bot.helpers.sendInteractionResponse(
    interaction.id,
    interaction.token,
    {
      type: InteractionResponseTypes.ChannelMessageWithSource,
      data: { content: "🏓 Pong!" },
    },
  );
}
