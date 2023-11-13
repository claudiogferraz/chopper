import { Client, GatewayIntentBits, Guild } from "discord.js";

import pontos from "./commands/pontos";
import finalizar from "./commands/finalizar";

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

	const userRoles = interaction.member?.roles as string[];
	if (!userRoles.includes(process.env.LEADER_ROLE_ID!)) {
		await interaction.reply("Apenas a liderança pode utilizar o bot.");
	}

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
		case "finalizar":
			await interaction.reply("Enviando mensagens de semana finalizada.");
			await finalizar(interaction.guild);
		default:
			break;
	}
});

export default client;
