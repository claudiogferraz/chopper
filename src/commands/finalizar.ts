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
				channel?.send(
					"https://cdn.discordapp.com/attachments/1183909150447648810/1193346609744973925/Video-2.gif?ex=65ac61a3&is=6599eca3&hm=8988192097051bea686d87ddf15e8526f6d300d695058f1a564c5444f8389d5c&"
				);
			}
		}
	} catch (error) {
		console.error(error);
		return "Não consegui enviar as mensagens nos portfolios. Caso o erro persista contacte o desenvolvedor do bot <@276129537572470784>";
	}
};

export default finalizar;
