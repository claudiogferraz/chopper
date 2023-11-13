import { REST, Routes } from "discord.js";
import client from "./client";
import commands from "./commands";
import "dotenv/config";

// check environment variables
let errorMessage = "Faltaram as variáveis de ambiente:\n";
if (
	!process.env.TOKEN ||
	!process.env.CLIENT_ID ||
	!process.env.LEADER_ROLE_ID
) {
	errorMessage += !process.env.TOKEN ? "• TOKEN" : "";
	errorMessage += !process.env.TOKEN ? "• CLIENT_ID" : "";
	errorMessage += !process.env.TOKEN ? "• LEADER_ROLE_ID" : "";
	console.error(errorMessage);
}

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN!);

try {
	console.log("Atualizando comandos (/) do bot.");

	rest.put(Routes.applicationCommands(process.env.CLIENT_ID!), {
		body: commands,
	});

	console.log("Sucesso ao atualizar comandos (/) do bot!");
} catch (error) {
	console.error(error);
}

client.login(process.env.TOKEN!);
