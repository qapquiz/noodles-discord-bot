type Server = {
	Name: string,
	GuildId: bigint,
	Channel: Record<string, bigint>,
	VerifyMessageId: bigint,
	VerifyRoleName: string,
};

const ServerConstants: Array<Server> = [
	// Noodles
	{
		Name: "noodles ≈ 🍜",
		GuildId: 1021799324881010768n,
		Channel: {
			Verify: 1021807055503364187n,
			VerifyHolder: 0n,
			Welcome: 1057511145243676762n,
		},
		VerifyMessageId: 1028609208989523969n,
		VerifyRoleName: "verified",
	},
	// Moody Bear
	{
		Name: "Moody Bear",
		GuildId: 1036403649099878501n,
		Channel: {
			Verify: 1042458472211550258n,
			VerifyHolder: 1n
		},
		VerifyMessageId: 1042473313492025418n,
		VerifyRoleName: "Moodies",
	},
];

const ServersMapped = ServerConstants.reduce((prev, current) => {
	prev[current.GuildId.toString()] = current;
	return prev;
}, {} as Record<string, Server>)

export { ServerConstants, ServersMapped };
export type { Server };
