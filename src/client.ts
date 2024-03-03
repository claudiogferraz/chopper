import { Client, GatewayIntentBits, Guild } from "discord.js";

import pontos from "./commands/pontos";
import finalizar from "./commands/finalizar";
import isLeader from "./utils/isLeader";

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
		console.log(`🟢 Logged in as ${client.user.tag}!`);
	}
});

client.on("interactionCreate", async (interaction) => {
	if (!interaction.isChatInputCommand()) return;

	let leader = await isLeader(interaction);
	if (!leader) return;

	switch (interaction.commandName) {
		case "pontos":
			await interaction.reply("Contando pontos, aguarde...");
			await interaction.channel?.send(await pontos(interaction.guild, false));
			console.log("🟢 Pontos contados!");
			break;
		case "ranking":
			await interaction.reply("Contando pontos, aguarde...");
			await interaction.channel?.send(await pontos(interaction.guild, true));
			console.log("🟢 Ranking enviado!");
			break;
		// case "anterior":
		// 	await interaction.reply("Contando pontos, aguarde...");
		// 	await interaction.channel?.send(
		// 		await pontos(interaction.guild, "week-before")
		// 	);
		// 	break;
		case "finalizar":
			await finalizar(interaction.guild);
			await interaction.reply("Semana finalizada!");
			console.log("🟢 Enviadas mensagens de semana finalizada!");
			break;
		default:
			break;
	}
});

export default client;
