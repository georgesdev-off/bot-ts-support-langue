import Command from '../command'
import {Client, CommandInteraction, Guild, User} from 'discord.js'
import {mentionUser} from "../../utils/string-utils";

export default class PingCommand implements Command {
    name = 'ping'
    description = "Ping the bot to see if it's alive"
    run = async (
        client: Client,
        user: User,
        guild: Guild,
        command: CommandInteraction
    ) => {
        let time = Date.now()
        command.reply("...").then(msg => {
            let ping = Math.round((Date.now() - time) / 100) / 10
            msg.edit(`Pong! ${mentionUser(user)} (${ping}s)`)
        })
    }
}
