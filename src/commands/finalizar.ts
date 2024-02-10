import { ChannelType, Guild } from "discord.js";

const finalizar = async (guild: Guild | null) => {
	try {
		if (!guild) {
			throw new Error("Guild not found.");
		}

		const channels = await guild.channels.fetch();
		const portfolioChannels = channels.filter((channel) =>
			channel?.parent?.name?.toLocaleLowerCase().includes("portfolio")
		);

		for (let i = 0; i < portfolioChannels.size; i++) {
			const channel = portfolioChannels.at(i);
			if (channel!.type == ChannelType.GuildText) {
				channel?.send("https://imgur.com/t17R6UI.png");
			}
		}
	} catch (error) {
		console.error(error);
		return "Não consegui enviar as mensagens nos portfolios. Caso o erro persista contacte o desenvolvedor do bot <@276129537572470784>";
	}
};

export default finalizar;
