import { Bot } from "../../deps.ts";
import { Message } from "../../deps.ts";
import { ServersMapped } from "../constant.ts";

export function messageCreate(bot: Bot, message: Message) {
  if (message.isFromBot) {
    return;
  }

  const serverConfig = ServersMapped[(message.guildId ?? '').toString()];

  if (serverConfig === undefined) return;

  if (
    message.content.startsWith("!wen") &&
    message.guildId === serverConfig.GuildId
  ) {
    bot.helpers.sendMessage(message.channelId, { content: "wen draw" });
  }
}
