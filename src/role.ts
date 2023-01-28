import { BotCache } from "../bot.ts";
import { Bot } from "../deps.ts";

async function isHasRole(roleId: bigint, guildId: bigint, userId: bigint): Promise<boolean> {
	const member = await BotCache.helpers.getMember(guildId, userId);

	return member.roles.includes(roleId);
}

function addRoleWithId(guildId: bigint, userId: bigint, roleId: bigint) {
	BotCache.helpers.addRole(guildId, userId, roleId)
}

function removeRoleWithId(guildId: bigint, userId: bigint, roleId: bigint) {
	BotCache.helpers.removeRole(guildId, userId, roleId)
}

function addRole(
	bot: Bot,
	guildId: bigint,
	userId: bigint,
	desireRole: string,
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
	desireRole: string,
) {
	const roleToRemove = (BotCache.guilds.get(guildId)?.roles ?? []).find(
		(role) => role.name === desireRole.toString(),
	);
	roleToRemove && bot.helpers.removeRole(guildId, userId, roleToRemove.id);
}

export { isHasRole, addRoleWithId, removeRoleWithId, addRole, removeRole };
