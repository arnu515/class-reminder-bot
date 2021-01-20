if (process.env.NODE_ENV || "development" === "development")
    require("dotenv").config(require("path").join(__dirname, "..", ".env"));

import discord from "discord.js";
import dayjs from "dayjs";
import t from "./timings.json";

const client = new discord.Client();

client.on("ready", () => {
    console.log("Connnected as " + client.user.tag);

    setInterval(async () => {
        const data = t;

        const { classStartTimings, classEndTimings } = data;

        (classStartTimings as number[][]).forEach(
            async (num) => await timings(num[0], num[1])
        );

        (classEndTimings as number[][]).forEach(
            async (num) => await timings(num[0], num[1], false)
        );
    }, 60 * 1000);
});

async function timings(hour: number, min: number, start = true) {
    const d = dayjs();
    if (
        (d.hour() === hour && d.minute() === min - 2) ||
        (d.hour() === hour && d.minute() === min)
    ) {
        start
            ? await sendClassStartingMessage(`${hour}:${min}`)
            : await sendClassEndingMessage(`${hour}:${min}`);
    } else {
        console.log("nope");
        console.log(d.hour(), hour, d.minute(), min);
    }
}

async function sendClassStartingMessage(timestamp: string) {
    const c = await client.channels.fetch(
        process.env.START_CHANNEL_ID || process.env.CHANNEL_ID || ""
    );

    if (!c) {
        throw new Error(
            "Channel not found. Check the Channel ID. Did you forget to add the bot to your server?"
        );
    }

    if (!c.isText() && !(c instanceof discord.TextChannel)) {
        throw new Error(
            ((c as discord.TextChannel)?.name || "channel") +
                " is not a text channel"
        );
    }

    const channel: discord.TextChannel = c as discord.TextChannel;

    const embed = new discord.MessageEmbed()
        .setTitle("Class is starting!")
        .setColor("#ff0000")
        .setAuthor("Class Reminder")
        .setFooter("Join it quick!")
        .setImage(
            "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.9qdIANpH_YaD92yzsvn6sQHaHa%26pid%3DApi&f=1"
        )
        .addField("\u200B", "Class starts at " + timestamp);

    channel.send("@everyone", embed);
}

async function sendClassEndingMessage(timestamp: string) {
    const c = await client.channels.fetch(
        process.env.END_CHANNEL_ID || process.env.CHANNEL_ID || ""
    );

    if (!c) {
        throw new Error(
            "Channel not found. Check the Channel ID. Did you forget to add the bot to your server?"
        );
    }

    if (!c.isText() && !(c instanceof discord.TextChannel)) {
        throw new Error(
            ((c as discord.TextChannel)?.name || "channel") +
                " is not a text channel"
        );
    }

    const channel: discord.TextChannel = c as discord.TextChannel;

    const embed = new discord.MessageEmbed()
        .setTitle("Class is ending!")
        .setColor("#00ff00")
        .setAuthor("Class Reminder")
        .setFooter("Leave it quick!")
        .setImage(
            "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.9qdIANpH_YaD92yzsvn6sQHaHa%26pid%3DApi&f=1"
        )
        .addField("\u200B", "Class ends at " + timestamp);

    channel.send("@everyone", embed);
}

client.login(process.env.TOKEN || "");
