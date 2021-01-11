module.exports = {
    name: 'ping',
    description: 'Ping the bot!',
    guildOnly: true,
    execute(message, args){
        const normalPing = Date.now() - message.createdTimestamp;
        message.channel.send(`**Ping**: \`${normalPing}\`MS`)

    }

}