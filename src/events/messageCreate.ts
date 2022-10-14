import { Bot } from "../../deps.ts";
import { Message } from "../../deps.ts";

export function messageCreate(_bot: Bot, message: Message) {
	if (message.isFromBot) {
		return;
	}
}
