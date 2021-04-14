const Discord = require('discord.js');
const client = new Discord.Client();
const { token } = require('./config.json');

client.on('message', message => {
    const { bannedWords } = require('./config.json');

    for (const words of bannedWords) {
        bannedWords.filter(x => x.toString().toLowerCase());
        // This is way 1, if any part of the message includes a banned word
        if (message.content.toLowerCase().includes(words)) {
            message.delete().then(m => {
                m.channel.send(`<@${m.author.id}>, please do not use those kinds of words here!`);
            });
        }

        const msgArr = message.content.toLowerCase().trim().split(/ +/);
        // This is way 2, if a single word exactly matches one of the banned words
        if (msgArr.includes(words)) {
            message.delete().then(m => {
                m.channel.send(`<@${m.author.id}>, please do not use those kinds of words here!`);
            });
        }
    }
});

client.login(token);