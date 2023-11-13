const commands = [
	{
		name: "pontos",
		description:
			"Retorna a pontuação de todas as artes enviadas nos portfolios desde o último sábado ao meio-dia.",
	},
	{
		name: "anterior",
		description:
			"Retorna a pontuação das artes enviadas nos portfolios desde o sábado anterior a esse, ao meio-dia.",
	},
	{
		name: "finalizar",
		description: `Envia uma mensagem de "semana finalizada" em todos os portfolios.`,
	},
];

export default commands;
