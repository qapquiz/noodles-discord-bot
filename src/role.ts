import { Bot } from "../deps.ts";

type Role = "verified"

async function addRole(
	bot: Bot,
	guildId: bigint,
	userId: bigint,
	desireRole: Role
) {
	const verifiedRole = (await bot.helpers.getRoles(guildId)).find(
		(role) => role.name === desireRole.toString()
	);
	verifiedRole && bot.helpers.addRole(guildId, userId, verifiedRole.id);
}

async function removeRole(
	bot: Bot,
	guildId: bigint,
	userId: bigint,
	desireRole: Role
) {
	const verifiedRole = (await bot.helpers.getRoles(guildId)).find(
		(role) => role.name === desireRole.toString() 
	);
	verifiedRole && bot.helpers.removeRole(guildId, userId, verifiedRole.id);
}

export { addRole,removeRole };
export type { Role };
