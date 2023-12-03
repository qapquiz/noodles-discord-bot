import { Bot, Interaction, InteractionResponseTypes } from "../../deps.ts";

type CheckAPIResponse = {
  tokens_final: string;
};

export async function checkJupHandler(bot: Bot, interaction: Interaction) {
  const wallet = "q86ensxrdhmjukhluxglzfbvrx8hdefoexl11lzhyqk";
  const airdropCheckUrl = `https://airdrop-api.jup.ag/allocation/${wallet}`;

  const checkResult = await fetch(airdropCheckUrl);
  const checkResultJson = (await checkResult.json()) as CheckAPIResponse;

  await bot.helpers.sendInteractionResponse(
    interaction.id,
    interaction.token,
    {
      type: InteractionResponseTypes.ChannelMessageWithSource,
      data: { content: checkResultJson.tokens_final },
    },
  );
}
