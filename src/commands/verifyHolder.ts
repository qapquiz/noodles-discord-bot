import { Bot, Interaction } from "../../deps.ts";

export async function verifyHolderHandler(bot: Bot, interaction: Interaction) {
  if (interaction.channelId === undefined) {
    return;
  }

  await bot.helpers.sendMessage(interaction.channelId, {
    embeds: [
      {
        title: "Welcome to noodles ≈ 🍜",
        description:
          "Click the ✅ to verify and gain access to the rest of the server.",
      },
    ],
  });
}
