import Command from '../command'
import {Client, CommandInteraction, Guild, User} from 'discord.js'
import {getCommands} from "../../utils/command-utils";

export default class HelpCommand implements Command {
    name = 'help'
    description = "Shows the help menu"
    run = async (
        client: Client,
        user: User,
        guild: Guild,
        command: CommandInteraction
    ) => {
        let commands = getCommands()
        let commandList = commands.map(command => {
            return {
                name: command.name,
                value: command.description
            }
        })
        await command.reply({
            embeds: [
                {
                    title: "Help",
                    description: "Here is a list of all commands",
                    fields: commandList,
                    color: 0x00ff00
                }
            ]
        })
    }
}
