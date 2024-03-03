import { ChannelType, Guild, TextBasedChannel } from "discord.js";
import { getLastSaturday, getSaturday } from "../utils/days";
import dayjs from "dayjs";

interface RankingEntry {
	name: string;
	score: number;
}

const pontos = async (
	guild: Guild | null,
	ordenado: boolean,
	anterior: boolean
): Promise<string> => {
	try {
		if (!guild) {
			throw new Error("Guild not found.");
		}

		let lastSaturday = getLastSaturday(anterior).subtract(3, "hours").valueOf();
		let thisSaturday = getSaturday(anterior).subtract(3, "hours").valueOf();

		const channels = await guild.channels.fetch();
		const ranking: Array<RankingEntry> = [];

		const leaders = await guild.roles
			.fetch(process.env.LEADER_ROLE_ID!)
			.then((leaderRole) => {
				return leaderRole?.members;
			});

		for (let c = 0; c < channels.size; c++) {
			const channel = channels.at(c)!;

			if (
				channel &&
				channel.parent &&
				channel.type === ChannelType.GuildText &&
				channel.parent!.name.toLocaleLowerCase().includes("portfolio") &&
				!channel.name.includes("artes-gerais")
			) {
				let arts: number = 0;
				let gifs: number = 0;
				let leaderReactions: number = 0;

				let limit = 100;
				let messages = await channel.messages.fetch({ limit });
				let foundEnd = false;

				console.log("🔵 Contando pontos: " + channel.name.slice(3));

				for (let m = 0; m < messages.size; m++) {
					const currentMessage = messages.at(m)!;
					const createdAt = dayjs(currentMessage.createdAt).subtract(
						3,
						"hours"
					);
					console.log("Este sábado: " + dayjs(thisSaturday).toISOString());
					console.log("Último sábado: " + dayjs(lastSaturday).toISOString());
					console.log("Mensagem enviada: " + createdAt.toISOString());

					if (
						currentMessage &&
						(Math.floor(createdAt.toDate().getTime() / 1000) <
							Math.floor(lastSaturday / 1000) ||
							Math.floor(createdAt.toDate().getTime() / 1000) >
								Math.floor(thisSaturday / 1000))
					) {
						if (
							Math.floor(createdAt.toDate().getTime() / 1000) <
							Math.floor(lastSaturday / 1000)
						) {
							m = messages.size;
							foundEnd = true;
							console.log("🟢 Pontos contados: " + channel.name.slice(3));
						}
					} else if (
						currentMessage &&
						Math.floor(currentMessage.createdAt.getTime() / 1000) >
							Math.floor(lastSaturday / 1000) &&
						Math.floor(currentMessage.createdAt.getTime() / 1000) <
							Math.floor(thisSaturday / 1000) &&
						currentMessage.author.id != process.env.APPLICATION_ID
					) {
						const attachmentsSize = currentMessage.attachments.size;
						let hasImages = false;

						for (let a = 0; a < attachmentsSize; a++) {
							const attachmentType =
								currentMessage.attachments.at(a)!.contentType;

							if (
								attachmentType &&
								[
									"image/png",
									"image/jpeg",
									"image/jpg",
									"image/webp",
									"image/gif",
								].includes(attachmentType)
							) {
								hasImages = true;

								if (attachmentType == "image/gif") {
									gifs += 1;
								} else {
									arts += 1;
								}
							}
						}

						if (hasImages == true) {
							const reactions = currentMessage.reactions.cache;
							const reactionsSize = reactions.size;

							for (let r = 0; r < reactionsSize; r++) {
								const users = await reactions.at(r)?.users.fetch()!;
								const usersSize = users!.size;

								for (let u = 0; u < usersSize; u++) {
									if (leaders!.has(users.at(u)!.id)) {
										leaderReactions += 1;
										console.log("🔵 Lider reagiu: " + users.at(u)!.displayName);
									}
								}
							}
						}

						if (m == messages.size - 1 && foundEnd == false) {
							m = -1;

							if (limit != 25) {
								limit = limit / 2;
							}

							messages = await channel.messages.fetch({
								limit,
								before: currentMessage.id,
							});
						}
					}
				}
				ranking.push({
					name: channel.name.slice(3),
					score: arts * 10 + gifs * 20 + leaderReactions * 10,
				});
			}
		}

		if (ordenado) {
			ranking.sort(compareScores);
		}

		let message = "## ⚡ PONTOS DA SEMANA ⚡\n\n";

		for (let e = 0; e < ranking.length; e++) {
			const currentEntry = ranking[e];

			message += `**${
				currentEntry.name[0].toUpperCase() + currentEntry.name.slice(1)
			}:** ${currentEntry.score}\n`;
		}

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
