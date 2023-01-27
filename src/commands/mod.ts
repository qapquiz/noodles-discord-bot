import { Bot, Interaction } from "../../deps.ts";
import { pingHandler } from "./ping.ts";
import { verifyHandler } from "./verify.ts";

enum Commands {
	Ping = "ping",
	Verify = "verify",
}

export async function commandEntryPoint(bot: Bot, interaction: Interaction) {
	switch (interaction.data?.name) {
		case Commands.Ping:
			await pingHandler(bot, interaction);
			break;
		case Commands.Verify:
			await verifyHandler(bot, interaction);
			break;
		// @todo cretae new command to create message for react-role with button to receive and remove roles
		default:
			break;
	}
}
