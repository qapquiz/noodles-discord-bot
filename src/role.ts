import { Bot } from "../deps.ts";

type Role = "verified";

async function addRole(
	bot: Bot,
	guildId: bigint,
	userId: bigint,
	desireRole: Role
) {
	const roleToAdd = (await bot.helpers.getRoles(guildId)).find(
		(role) => role.name === desireRole.toString()
	);
	roleToAdd && bot.helpers.addRole(guildId, userId, roleToAdd.id);
}

async function removeRole(
	bot: Bot,
	guildId: bigint,
	userId: bigint,
	desireRole: Role
) {
	const roleToRemove = (await bot.helpers.getRoles(guildId)).find(
		(role) => role.name === desireRole.toString()
	);
	roleToRemove && bot.helpers.removeRole(guildId, userId, roleToRemove.id);
}

export { addRole, removeRole };
export type { Role };
