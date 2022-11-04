type Server = {
	GuildId: bigint,
	Channel: Record<string, bigint>,
	VerifyMessageId: bigint,
	VerifyRoleName: string,
};

const ServerConstants: Array<Server> = [
	// Noodles
	{
		GuildId: 1021799324881010768n,
		Channel: {
			Verify: 1021807055503364187n,
			VerifyHolder: 0n,
		},
		VerifyMessageId: 1028609208989523969n,
		VerifyRoleName: "verified",
	},
	// Moody Bear
	{
		GuildId: 1n,
		Channel: {
			Verify: 1n,
			VerifyHolder: 1n
		},
		VerifyMessageId: 1n,
		VerifyRoleName: "verified",
	},
];

const ServersMapped = ServerConstants.reduce((prev, current) => {
	prev[current.GuildId.toString()] = current;
	return prev;
}, {} as Record<string, Server>)

export { ServerConstants, ServersMapped };
export type { Server };
