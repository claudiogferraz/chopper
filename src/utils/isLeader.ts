import { CacheType, ChatInputCommandInteraction } from "discord.js";

const isLeader = async (
	interaction: ChatInputCommandInteraction<CacheType>
) => {
	const interactionUser = await interaction.guild?.members.fetch(
		interaction.user.id
	);
	const userRoles = interactionUser?.roles.cache;

	if (userRoles != undefined && userRoles.has(process.env.LEADER_ROLE_ID!)) {
		return true;
	} else {
		await interaction.reply("Apenas a liderança pode utilizar o bot.");
		return false;
	}
};

export default isLeader;
