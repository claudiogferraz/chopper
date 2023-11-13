import { Client, GatewayIntentBits } from "discord.js";

import pontos from "./commands/pontos";

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildVoiceStates,
		GatewayIntentBits.GuildPresences,
		GatewayIntentBits.GuildMembers,
	],
	closeTimeout: 15000,
});

client.on("ready", () => {
	if (client.user) {
		console.log(`Logged in as ${client.user.tag}!`);
	}
});

client.on("interactionCreate", async (interaction) => {
	if (!interaction.isChatInputCommand()) return;

	switch (interaction.commandName) {
		case "pontos":
			await interaction.reply("Contando pontos, aguarde...");
			await interaction.channel?.send(await pontos(interaction.guild, null));
			break;
		case "anterior":
			await interaction.reply("Contando pontos, aguarde...");
			await interaction.channel?.send(
				await pontos(interaction.guild, "week-before")
			);
		default:
			break;
	}
});

export default client;
