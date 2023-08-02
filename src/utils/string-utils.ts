import {GuildMember, PartialGuildMember, User} from "discord.js";

export function mentionUser(user: User | GuildMember | PartialGuildMember) {
    return `<@${user.id}>`
}

export function blankField(inline: boolean = false) {
    return {
        name: "",
        value: "",
        inline: inline
    }
}

export function inlineCodeBlock(text: any) {
    return `\`${text}\``
}