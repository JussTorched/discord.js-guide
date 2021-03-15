const Discord = require('discord.js');
const client = new Discord.Client();
const { token } = require('./config.json');

client.on('ready', () => {
    console.log('Bot is on!');
});

client.on('guildMemberAdd', member => {
    const channel = member.guild.channels.cache.get('801658010996178944');
    const embed = new Discord.MessageEmbed()
        .setTitle('Test')
        .setDescription('Hello youtube!');
    channel.send(embed);
});

client.on('guildMemberRemove', member => {
    const channel = member.guild.channels.cache.get('801658010996178944');
    const embed = new Discord.MessageEmbed()
        .setTitle('Test')
        .setDescription('goodbye youtube :(');
    channel.send(embed);
});

client.login(token);