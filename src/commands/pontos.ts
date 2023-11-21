import { ChannelType, Guild, NonThreadGuildBasedChannel } from "discord.js";
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import { getLastSaturday } from "../utils/days";

interface RankingEntry {
	name: string;
	score: number;
}

dayjs.extend(weekday);

const pontos = async (
	guild: Guild | null,
	arg: "week-before" | null
): Promise<string> => {
	try {
		if (!guild) {
			throw new Error("Guild not found.");
		}

		const channels = await guild.channels.fetch();
		const ranking: Array<RankingEntry> = [];

		let lastSaturday = getLastSaturday().hour(12).toDate().getTime();

		const updateRanking = async (channel: NonThreadGuildBasedChannel) => {
			if (channel?.parent?.name.toLocaleLowerCase().includes("portfolio")) {
				let arts = 0;
				let gifs = 0;
				let leaderReactions = 0;

				if (channel.type === ChannelType.GuildText) {
					const messages = await channel.messages.fetch({ limit: 100 });

					for (let i = 0; i < messages.size; i++) {
						const currentMessage = messages.at(i);

						if (
							Math.floor(currentMessage!.createdAt.getTime() / 1000) <
							Math.floor(lastSaturday / 1000)
						) {
							i = messages.size;
						} else if (
							Math.floor(currentMessage!.createdAt.getTime() / 1000) >
								Math.floor(lastSaturday / 1000) &&
							currentMessage!.member!.id != "1160914279625662585"
						) {
							const attachmentsSize = currentMessage!.attachments.size;
							let hasImages = false;

							if (currentMessage && attachmentsSize > 0) {
								for (let a = 0; a < attachmentsSize; a++) {
									const attachmentType = messages
										.at(i)!
										.attachments.at(a)?.contentType;

									if (
										attachmentType == "image/png" ||
										attachmentType == "image/jpeg" ||
										attachmentType == "image/jpg" ||
										attachmentType == "image/gif"
									) {
										hasImages = true;

										if (attachmentType == "image/gif") {
											gifs += 1;
										} else {
											arts += 1;
										}
									}
								}

								const countedLeaders: Array<string> = [];
								const reactions = currentMessage!.reactions.cache;
								const reactionsSize = reactions.size;

								for (let r = 0; r < reactionsSize; r++) {
									const users = await reactions.at(r)?.users.fetch();
									const usersSize = users!.size;

									for (let u = 0; u < usersSize; u++) {
										const currentUserId = users!.at(u)!.id;

										if (
											!countedLeaders.includes(currentUserId) &&
											guild.members.cache
												.get(currentUserId)
												?.roles.cache.has(process.env.LEADER_ROLE_ID!)
										) {
											countedLeaders.push(currentUserId);
											leaderReactions += 1;
										}
									}
								}
							}
						}
					}

					ranking.push({
						name: channel.name.slice(3),
						score: arts * 10 + gifs * 20 + leaderReactions * 10,
					});
				}
			}
		};

		for (let i = 0; i < channels.size; i++) {
			await updateRanking(channels.at(i)!);
		}

		ranking.sort(compareScores);

		let message = "## ⚡ PONTOS DA SEMANA ⚡\n\n";

		ranking.forEach((entry) => {
			message += `**${entry.name[0].toUpperCase() + entry.name.slice(1)}:** ${
				entry.score
			}\n`;
		});

		message += "\n||<@&912402904143523894>||";

		return message;
	} catch (error) {
		console.error(error);
		return "Não consegui contar os pontos. Caso o erro persista contacte o desenvolvedor do bot <@276129537572470784>";
	}
};

function compareScores(a: RankingEntry, b: RankingEntry): number {
	return b.score - a.score;
}

export default pontos;
