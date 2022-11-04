import { Emoji } from "../../deps.ts";
import { Bot } from "../../deps.ts";
import { ServerConstants } from "../constant.ts";
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
	const server = ServerConstants.find((eachServer) => eachServer.Channel.Verify === channelId)

	if (server === undefined) return;
	if (guildId === undefined) return;
	if (server.VerifyMessageId !== messageId) return;
	if (channelId !== server.Channel.Verify && emoji.name !== "✅") return;

	await removeRole(bot, guildId, userId, "verified");
}
