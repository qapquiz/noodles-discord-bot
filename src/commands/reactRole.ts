import {
  Bot,
  ButtonStyles,
  Interaction,
  MessageComponentTypes,
} from "../../deps.ts";
import { BotCache } from "../../bot.ts";
import { ReactRoleId } from "./mod.ts";

export async function reactRoleHandler(_bot: Bot, interaction: Interaction) {
  if (interaction.channelId === undefined) {
    return;
  }

  await BotCache.helpers.sendMessage(interaction.channelId, {
    embeds: [
      {
        title: "Click the buttons below to receive role",
        description: `🎁 - giveaways ping
🎮 - games ping
💎 - airdrop oppurtunity chance
				`,
      },
    ],
    components: [
      {
        type: MessageComponentTypes.ActionRow,
        components: [
          {
            type: MessageComponentTypes.Button,
            label: "🎁",
            style: ButtonStyles.Primary,
            customId: ReactRoleId.Giveaways,
          },
          {
            type: MessageComponentTypes.Button,
            label: "🎮",
            style: ButtonStyles.Secondary,
            customId: ReactRoleId.Games,
          },
          {
            type: MessageComponentTypes.Button,
            label: "💎",
            style: ButtonStyles.Success,
            customId: ReactRoleId.Airdrop,
          },
        ],
      },
    ],
  });
}
