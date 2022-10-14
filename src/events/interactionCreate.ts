import { Interaction } from "../../deps.ts";
import { Bot } from "../../deps.ts";
import { commandEntryPoint } from "../commands/mod.ts";

export async function interactionCreate(bot: Bot, interaction: Interaction) {
	await commandEntryPoint(bot, interaction);
}
