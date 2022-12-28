import { Bot, Member, User } from "../../deps.ts";
import { ServersMapped } from "../constant.ts";

export function guildMemberAdd(bot: Bot, member: Member, user: User): void {
  const serverConfig = ServersMapped[member.guildId.toString()];

  if (serverConfig.GuildId !== 1021799324881010768n) return;

  bot.helpers.sendMessage(serverConfig.Channel.Welcome, {
    content: `Welcome <@${user.id}> to the Noodles party!`,
  });
}
