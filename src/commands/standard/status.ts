import Command from '../command'
import {Client, CommandInteraction, Guild, User} from 'discord.js'
import axios from "axios";
import {inlineCodeBlock} from "../../utils/string-utils";

export default class StatusCommand implements Command {
    name = 'status'
    description = "Get the bot's status"
    run = async (
        client: Client,
        user: User,
        guild: Guild,
        command: CommandInteraction
    ) => {
        let time = Date.now()
        command.reply({embeds: [{title: "Fetching status..."}]}).then((message) => {
            axios.get('https://api.pixbot.me').then((response) => {
                let ping = Math.round((Date.now() - time) / 100) / 10
                let data: { version: string } = response.data
                message.edit({
                    embeds: [{
                        title: "Status",
                        description: `:white_check_mark: The bot is **online**\n:clock1: Ping: ${inlineCodeBlock(ping + 's')}\n:robot: Version: ${inlineCodeBlock(data.version)}`,
                        color: 0x00ff00
                    }]
                })
            }).catch(() => {
                message.edit({
                    embeds: [{
                        title: "Status",
                        description: `:x: The bot is **offline**`,
                        color: 0xff0000
                    }]
                })
            })
        })
    }
}
