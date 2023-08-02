import Command from '../command'
import {APIEmbedField, Client, CommandInteraction, Guild, User} from 'discord.js'
import {blankField} from "../../utils/string-utils";

export default class LinksCommand implements Command {
    name = 'links'
    description = "Shows the links related to the team"
    run = async (
        client: Client,
        user: User,
        guild: Guild,
        command: CommandInteraction
    ) => {
        let links: APIEmbedField[] = [
            blankField(false),
            {
                name: "Discord",
                value: "https://discord.pixbot.me",
                inline: true
            },
            blankField(true),
            {
                name: "Website",
                value: "https://pixbot.me",
                inline: true
            },
            blankField(false),
            {
                name: "Github",
                value: "https://github.com/ThePixTeam",
                inline: true
            }
        ]

        await command.reply({
            embeds: [
                {
                    title: "Links",
                    description: "Here are some links related to the team",
                    fields: links,
                    color: 0x00ff00
                }
            ]
        })
    }
}
