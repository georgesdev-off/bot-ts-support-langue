import chalk from 'chalk'
import moment from 'moment'

export function log(
    message: any,
    level: 'info' | 'warn' | 'error' | 'debug' = 'info'
) {
    let debug = process.env.DEBUG_ENABLED === 'true' || process.env.DEBUG_ENABLED === '1'
    if (level === 'debug' && !debug) return
    // get the current timestamp in the format: YYYY-MM-DD HH:mm:ss
    const timestamp = moment().format('YYYY-MM-DD HH:mm:ss')
    // colorize the message based on the log level
    const coloredMessage = colorizeLogMessage(message, level)
    // colorize the log level background
    const logLevel = colorizeLogBackground(`${level.toUpperCase()}`, level)
    // print the log message
    console.log(
        `${chalk.blueBright(timestamp)}  [ ${logLevel} ]  -  ${coloredMessage}`
    )
}

function colorizeLogMessage(message: any, level: string): string {
    switch (level) {
        case 'warn':
            return chalk.yellow(message)
        case 'error':
            return chalk.red(message)
        case 'debug':
            return chalk.blue(message)
        default:
            return message
    }
}

function colorizeLogBackground(message: any, level: string): string {
    switch (level) {
        case 'info':
            return chalk.bgGray(message)
        case 'warn':
            return chalk.bgYellow(message)
        case 'error':
            return chalk.bgRed(message)
        case 'debug':
            return chalk.bgBlue(message)
        default:
            return message
    }
}
