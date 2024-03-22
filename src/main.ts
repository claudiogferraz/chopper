import { Guild, REST, Routes } from "discord.js";
import client from "./client";
import commands from "./commands";
import "dotenv/config";
import finalizer from "./finalizer";

// check environment variables
let errorMessage = "Faltaram as variáveis de ambiente:\n";
if (
	!process.env.CLIENT_SECRET ||
	!process.env.APPLICATION_ID ||
	!process.env.LEADER_ROLE_ID
) {
	errorMessage += !process.env.CLIENT_SECRET ? "• CLIENT_SECRET" : "";
	errorMessage += !process.env.APPLICATION_ID ? "• APPLICATION_ID" : "";
	errorMessage += !process.env.LEADER_ROLE_ID ? "• LEADER_ROLE_ID" : "";
	console.error("🔴 " + errorMessage);
}

const rest = new REST({ version: "10" }).setToken(process.env.CLIENT_SECRET!);

try {
	console.log("🔵 Atualizando comandos (/) do bot.");

	rest.put(Routes.applicationCommands(process.env.APPLICATION_ID!), {
		body: commands,
	});

	console.log("🟢 Sucesso ao atualizar comandos (/) do bot!");
} catch (error) {
	console.error(error);
}

client.login(process.env.CLIENT_SECRET!);

client.guilds.fetch(process.env.GUILD_ID!).then((guild) => finalizer(guild));
