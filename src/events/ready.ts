import { Bot, User } from "../../deps.ts";

export function ready(
  _bot: Bot,
  payload: {
    shardId: number;
    v: number;
    user: User;
    guilds: bigint[];
    sessionId: string;
    shard?: number[] | undefined;
    applicationId: bigint;
  },
) {
  console.log(
    "Connected: ",
    JSON.stringify(
      payload,
      (_key, value) =>
        typeof value === "bigint" ? `${value.toString()}n` : value,
      2,
    ),
  );
}
