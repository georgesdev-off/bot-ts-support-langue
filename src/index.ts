import {log} from './utils/logger'
import 'dotenv/config'
import {ActivityType, Client, GatewayIntentBits, Partials} from 'discord.js'
import {getCommands, loadCommands} from './utils/command-utils'
import chalk from "chalk";
import {handleMemberJoin, handleMemberLeave} from "./listeners/join-leave-listener";
import {updateStatus} from "./schedules/schedules";

const start = Date.now()
const token = process.env.TOKEN

if (!token) {
    log('No token provided', 'error')
    process.exit(1)
}

log('Token provided', 'info')

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
    partials: [Partials.GuildMember]
})

client.login(token).catch((error) => {
    log(error, 'error')

    process.exit(1)
})

client.on('ready', () => {
    loadCommands(client)
    client.user?.setActivity('/help', {type: ActivityType.Listening})

    printStartupTime()
})

setInterval(updateStatus, 1000 * 30)

client.on('guildMemberAdd', handleMemberJoin);
client.on('guildMemberRemove', handleMemberLeave);

client.on('interactionCreate', (interaction) => {
    if (!interaction.isCommand()) return

    const command = getCommands().find((c) => c.name === interaction.commandName)

    if (!command || !interaction.guild) return

    command.run(client, interaction.user, interaction.guild, interaction).then(() => {
        log(`Executed command ${command.name} in ${interaction.guild!.name} (requested by ${interaction.user.tag})`, 'debug')
    }).catch((error) => {
        log(error, 'error')
    })
})

function printStartupTime() {
    let time: any = Date.now() - start

    if (time < 5000) {
        time = chalk.green(time)
    } else if (time < 10000) {
        time = chalk.yellow(time)
    } else {
        time = chalk.red(time)
    }

    log(`API started, took ${time} ms`)
}

export function getClient(): Client {
    return client
}