import { getToday } from "./utils/days";
import finalizar from "./commands/finalizar";
import { Guild } from "discord.js";

export default async function weekFinalizer(guild: Guild) {
	console.log("🔵 Iniciando o finalizador de semanas automático");
	console.log(getToday());

	const closing = {
		day: 5, // No DayJS, sexta é o sexto dia da semana
		hour: 23, // A semana finaliza às 23 horas
		minute: 59, // A semana finaliza aos 59 minutos
	};

	setInterval(async () => {
		const today = getToday();
		if (
			// Se for o dia da semana, hora e minuto declarados acima
			today.weekday() == closing.day &&
			today.hour() == closing.hour &&
			today.minute() == closing.minute
		) {
			await finalizar(guild); // Finaliza a semana
			console.log("🟢 Semana finalizada");
		}
	}, 60000); // Roda a cada 1 minuto (60.000 milisegundos)
}
