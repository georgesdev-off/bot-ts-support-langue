import {GuildMember, PartialGuildMember, TextChannel} from "discord.js";
import {mentionUser} from "../utils/string-utils";

const {log} = require('../utils/logger')
const channel_id: string = '1124255173448044554'
const role_id: string = '1124255171174735906'
const info_channel_id: string = '1124255173141864613'

export function handleMemberJoin(member: GuildMember) {
    log(`Member ${member.user.tag} joined the server`, 'debug')

    const channel = member.guild.channels.cache.get(channel_id)
    const role = member.guild.roles.cache.get(role_id)

    if (!channel) {
        log(`Channel with id ${channel_id} not found`, 'error')
        return
    }

    if (!(channel instanceof TextChannel)) {
        log(`Channel with id ${channel_id} is not a text channel`, 'error')
        return
    }

    if (!role) {
        log(`Role with id ${role_id} not found`, 'error')
        return
    }

    member.roles.add(role)
    channel.send(
        {
            content: `> Welcome to the server, ${mentionUser(member)}!`,
            embeds: [
                {
                    title: `New member!`,
                    description: `Please read the <#${info_channel_id}> channel and follow the instructions there.`,
                    color: 0x00ff00
                }
            ]
        }
    )
}

export function handleMemberLeave(member: GuildMember | PartialGuildMember) {
    log(`Member ${member.user.tag} left the server`, 'debug')

    const channel = member.guild.channels.cache.get(channel_id)

    if (!channel) {
        log(`Channel with id ${channel_id} not found`, 'error')
        return
    }

    if (!(channel instanceof TextChannel)) {
        log(`Channel with id ${channel_id} is not a text channel`, 'error')
        return
    }

    channel.send({
        embeds: [
            {
                title: `Goodbye, ${member.user.tag}!`,
                description: `We hope to see you again soon!`,
                color: 0xff0000
            }
        ]
    });
}