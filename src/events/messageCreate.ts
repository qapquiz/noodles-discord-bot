import { Bot } from "../../deps.ts";
import { Message } from "../../deps.ts";
import { ServersMapped } from "../constant.ts";

export function messageCreate(bot: Bot, message: Message): void {
  if (message.isFromBot) {
    return;
  }

  const serverConfig = ServersMapped[(message.guildId ?? "").toString()];

  if (serverConfig === undefined) return;

  if (
    message.guildId === serverConfig.GuildId &&
    message.content.startsWith("!wen")
  ) {
    handlerWenCommand(bot, message);
    return;
  }
}

function handlerWenCommand(bot: Bot, message: Message): void {
  const messageLowerCase = message.content.toLowerCase();

  if (messageLowerCase.includes("og") || messageLowerCase.includes("wl")) {
    const messages = [
      "I ask the same question everyday.",
      "who knows",
      "brb",
      "I'm off to bed",
      "I gotta go",
      "mairoo mai roooo",
      "skip to the next question",
      "shhhh",
    ];

    const randomIndex = Math.floor(Math.random() * messages.length);

    bot.helpers.sendMessage(message.channelId, {
      content: messages[randomIndex],
    });
    return;
  }

  if (messageLowerCase.includes("mint")) {
    const messages = [
      "founder rug you",
      ".... Did you say something?",
      "404 not found",
      "We are working on it ||probably||",
      "Ask agin tomorrow",
      "I ask the same question",
      "Artist is still drawing",
      "ahhh so sleepy. off to bed byeeee.",
    ];

    const randomIndex = Math.floor(Math.random() * messages.length);

    bot.helpers.sendMessage(message.channelId, {
      content: messages[randomIndex],
    });
    return;
  }

  const defaultMessages = [
    "wen !aim",
    "wen stop asking bro",
    "wen wat",
    "try asking founder",
    "I don't know. eiei",
  ];

  const randomIndex = Math.floor(Math.random() * defaultMessages.length);

  bot.helpers.sendMessage(message.channelId, {
    content: defaultMessages[randomIndex],
  });
  return;
}
