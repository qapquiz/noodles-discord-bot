import {
  Bot,
  Interaction,
  InteractionResponseTypes,
  MessageComponentTypes,
} from "../../deps.ts";
import { ServersMapped } from "../constant.ts";
import { addRoleWithId, isHasRole, removeRoleWithId } from "../role.ts";
import { pingHandler } from "./ping.ts";
import { reactRoleHandler } from "./reactRole.ts";
import { verifyHandler } from "./verify.ts";
import { BotCache } from "../../bot.ts";

export enum Commands {
  Ping = "ping",
  Verify = "verify",
  ReactRole = "react_role",
}

export enum ReactRoleId {
  Giveaways = "giveaways",
  Games = "games",
  Airdrop = "airdrop",
}

const EPHEMERAL = 1 << 6;

async function sendAddRoleSuccessfulMessage(
  interactionId: bigint,
  interactionToken: string,
) {
  await BotCache.helpers.sendInteractionResponse(interactionId, interactionToken, {
    type: InteractionResponseTypes.ChannelMessageWithSource,
    data: {
      embeds: [
        {
          title: "Add Role Successful",
        },
      ],
	  flags: EPHEMERAL,
    },
  });
}

async function sendRemoveRoleSuccessfulMessage(
  interactionId: bigint,
  interactionToken: string,
) {
  await BotCache.helpers.sendInteractionResponse(interactionId, interactionToken, {
    type: InteractionResponseTypes.ChannelMessageWithSource,
    data: {
      embeds: [
        {
          title: "Remove Role Successful",
        },
      ],
	  flags: EPHEMERAL,
    },
  });
}

export async function commandEntryPoint(bot: Bot, interaction: Interaction) {
  switch (interaction.data?.name) {
    case Commands.Ping:
      await pingHandler(bot, interaction);
      break;
    case Commands.Verify:
      await verifyHandler(bot, interaction);
      break;
    // @todo cretae new command to create message for react-role with button to receive and remove roles
    case Commands.ReactRole:
      await reactRoleHandler(bot, interaction);
      break;
    default:
      break;
  }

  if (interaction.data?.componentType === MessageComponentTypes.Button) {
    if (!interaction.guildId) return;

    const serverConfig = ServersMapped[interaction.guildId.toString()];

    switch (interaction.data?.customId) {
      case ReactRoleId.Giveaways:
        if (
          !(await isHasRole(
            serverConfig.roles?.giveaways ?? 0n,
            interaction.guildId,
            interaction.user.id,
          ))
        ) {
          // add role
          addRoleWithId(
            interaction.guildId,
            interaction.user.id,
            serverConfig.roles?.giveaways ?? 0n,
          );
		  await sendAddRoleSuccessfulMessage(interaction.id, interaction.token)
        } else {
          // remove role
          removeRoleWithId(
            interaction.guildId,
            interaction.user.id,
            serverConfig.roles?.giveaways ?? 0n,
          );
		  await sendRemoveRoleSuccessfulMessage(interaction.id, interaction.token)
        }
        break;
      case ReactRoleId.Games:
        if (
          !(await isHasRole(
            serverConfig.roles?.games ?? 0n,
            interaction.guildId,
            interaction.user.id,
          ))
        ) {
          // add role
          addRoleWithId(
            interaction.guildId,
            interaction.user.id,
            serverConfig.roles?.games ?? 0n,
          );
		  await sendAddRoleSuccessfulMessage(interaction.id, interaction.token)
        } else {
          // remove role
          removeRoleWithId(
            interaction.guildId,
            interaction.user.id,
            serverConfig.roles?.games ?? 0n,
          );
		  await sendRemoveRoleSuccessfulMessage(interaction.id, interaction.token)
        }
        break;
      case ReactRoleId.Airdrop:
        if (
          !(await isHasRole(
            serverConfig.roles?.airdrop ?? 0n,
            interaction.guildId,
            interaction.user.id,
          ))
        ) {
          // add role
          addRoleWithId(
            interaction.guildId,
            interaction.user.id,
            serverConfig.roles?.airdrop ?? 0n,
          );
		  await sendAddRoleSuccessfulMessage(interaction.id, interaction.token)
        } else {
          // remove role
          removeRoleWithId(
            interaction.guildId,
            interaction.user.id,
            serverConfig.roles?.airdrop ?? 0n,
          );
		  await sendRemoveRoleSuccessfulMessage(interaction.id, interaction.token)
        }
        break;
    }
  }
}
