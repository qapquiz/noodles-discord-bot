import { BotCache } from "../bot.ts";
import { Bot } from "../deps.ts";

type Role = string;

function addRole(
	bot: Bot,
	guildId: bigint,
	userId: bigint,
	desireRole: Role,
) {
	const roleToAdd = (BotCache.guilds.get(guildId)?.roles ?? []).find(
		(role) => role.name === desireRole.toString(),
	);

	roleToAdd && bot.helpers.addRole(guildId, userId, roleToAdd.id);
}

function removeRole(
	bot: Bot,
	guildId: bigint,
	userId: bigint,
	desireRole: Role,
) {
	const roleToRemove = (BotCache.guilds.get(guildId)?.roles ?? []).find(
		(role) => role.name === desireRole.toString(),
	);
	roleToRemove && bot.helpers.removeRole(guildId, userId, roleToRemove.id);
}

export { addRole, removeRole };
export type { Role };
