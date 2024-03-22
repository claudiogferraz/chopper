import { getToday } from "./utils/days";
import finalizar from "./commands/finalizar";
import { Guild } from "discord.js";

export default async function weekFinalizer(guild: Guild) {
	console.log("🔵 Iniciando o finalizador de semanas automático");
	console.log(getToday());

	const closing = {
		day: 6, // No DayJS, sábado é o sexto dia da semana
		hour: 21, // A semana finaliza às 21 horas
		minute: 0, // A semana finaliza aos 0 minutos
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
