import { Client, User, Guild, CommandInteraction } from 'discord.js'

export default interface Command {
	metadata?: any
	name: string
	description: string
	run: (
		client: Client,
		member: User,
		guild: Guild,
		command: CommandInteraction
	) => Promise<void>
}
