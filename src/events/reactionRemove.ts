import { Emoji } from "../../deps.ts";
import { Bot } from "../../deps.ts";
import { ChannelId } from "../constant.ts";
import { verifyMessageId } from "../constant.ts";
import { removeRole } from "../role.ts";

export async function reactionRemove(
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
		emoji: Emoji;
	}
) {
	if (guildId === undefined) return;
	if (verifyMessageId !== messageId) return;
	if (channelId !== ChannelId.Verify && emoji.name !== "✅") return;

	await removeRole(bot, guildId, userId, "verified");
}
