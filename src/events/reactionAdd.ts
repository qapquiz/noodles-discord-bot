import { Emoji } from "../../deps.ts";
import { User } from "../../deps.ts";
import { Member } from "../../deps.ts";
import { Bot } from "../../deps.ts";
import { ChannelId } from "../constant.ts";
import { verifyMessageId } from "../constant.ts";
import { addRole } from "../role.ts";

export async function reactionAdd(
	bot: Bot,
	{
		userId,
		channelId,
		messageId,
		guildId,
		emoji,
	}: {
		userId: bigint;
		channelId: bigint;
		messageId: bigint;
		guildId?: bigint;
		member?: Member;
		user?: User;
		emoji: Emoji;
	}
) {
	if (guildId === undefined) return;
	if (verifyMessageId !== messageId) return;
	if (channelId !== ChannelId.Verify && emoji.name !== "✅") return;

	await addRole(bot, guildId, userId, "verified");
}
