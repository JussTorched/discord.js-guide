const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');

client.on('ready', () => {
    console.log('Bot is on!');
});

client.on('message', message => {
    if (message.content === 'hi') {
        message.channel.send('Hello!');
    } else if (message.content === 'hello') {
        message.reply('Hi!');
    }
});

client.login(config.token);