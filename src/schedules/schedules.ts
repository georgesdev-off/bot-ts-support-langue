import axios from "axios";
import {getClient} from "../index";
import {
    ActivityType,
    Message,
    MessageCreateOptions,
    MessageEditOptions,
    TextBasedChannel,
    TextChannel
} from "discord.js";
import {inlineCodeBlock} from "../utils/string-utils";

const CHANNEL_ID = 'id'

export function updateStatus() {
    let client = getClient();
    let time = Date.now();
    let channel = client.channels.cache.get(CHANNEL_ID) as TextChannel;
    let message: any;

    channel.messages.fetchPinned(false).then((messages) => {
        message = messages.first();

axios.get('url api').then((response) => {
            let ping = Math.round((Date.now() - time) / 100) / 10;
            let data = response.data;
            client.user?.setActivity(`/help | ${data.version} | Ping : ${ping}s`, {type: ActivityType.Listening})
            data.ping = ping;
            updateStatusMessage(message, channel, data);
        }).catch(() => {
            client.user?.setActivity(`/help | Offline`, {type: ActivityType.Listening});
            updateStatusMessage(message, channel, null);
        });
    });
}

function updateStatusMessage(message: Message, channel: TextBasedChannel, data: any) {
    let msg: MessageCreateOptions | MessageEditOptions;
    let now = new Date().toISOString();

    if (data) {
        msg = {
            embeds: [{
                title: "Status",
                description: `:white_check_mark: The bot is **online**\n:clock1: Ping: ${inlineCodeBlock(data.ping + 's')}\n:robot: Version: ${inlineCodeBlock(data.version)}`,
                color: 0x00ff00,
                timestamp: now
            }]
        }
    } else {
        msg = {
            embeds: [{
                title: "Status",
                description: `:x: The bot is **offline**`,
                color: 0xff0000,
                timestamp: now
            }]
        }
    }

    if (message) {
        message.edit(msg as MessageEditOptions);
    } else {
        channel.send(msg as MessageCreateOptions).then((a) => {
            a.pin().then(b => console.log(b))
        })
    }
}