const Discord = require('discord.js');
const client = new Discord.Client();
const { token } = require('./config.json');

client.on('ready', () => {
    console.log('Bot is on!');
});

client.on('guildCreate', guild => {
    const channel = guild.channels.cache.find(channel => channel.type === 'text' && channel.permissionsFor(guild.me).has('SEND_MESSAGES'));
    const embed = new Discord.MessageEmbed()
        .setTitle('I joined your guild.')
    channel.send(embed);
});

client.login(token);