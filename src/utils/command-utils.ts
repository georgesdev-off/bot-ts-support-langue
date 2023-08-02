import {Client, Guild} from 'discord.js'
import fs from 'fs'
import Command from '../commands/command'
import {log} from './logger'

let commandList: Command[] = []

export function loadCommands(client: Client): Command[] {
    // Load each module in the commands folder
    let modules: string[] = []
    let commands: Command[] = []

    fs.readdirSync('src/commands').forEach((dir) => {
        // check if the file is a directory
        if (fs.lstatSync(`src/commands/${dir}`).isDirectory()) {
            modules.push(dir)
        }
    })

    // Log the number of modules loaded
    log(`Loading ${modules.length} modules`)

    // Load each command in the modules
    modules.forEach((module) => {
        fs.readdirSync(`src/commands/${module}`).forEach((file) => {
            if (file.endsWith('.ts')) {
                const cls = require(`../commands/${module}/${file}`).default
                const command = new cls()
                command.metadata = {
                    module: module
                }
                log(`Loaded command ${command.name} from module ${module}`, 'debug')
                commands.push(command)
            }
        })
    })

    // Log the number of commands loaded
    log(`Loaded ${commands.length} commands`)

    commandList = commands

    client.guilds.cache.forEach((guild) => loadServerCommands(guild))

    return commands
}

export function loadServerCommands(guild: Guild): void {
    let toRegister: any[] = commandList.map((command) => {
        return {
            name: command.name,
            description: command.description,
        }
    })

    guild.commands.set(toRegister).then(() => {
        log(`Registered ${toRegister.length} commands for ${guild.name}`, 'debug')
    }).catch((error) => {
        log(error, 'error')
    })
}

export function getCommands(): Command[] {
    return commandList
}