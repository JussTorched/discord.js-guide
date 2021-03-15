const Discord = require('discord.js');
const client = new Discord.Client();
const { token, prefix } = require('./config.json');

client.on('ready', () => {
    console.log('Bot is on!');
});

client.on('message', message => {
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const input = args.join(' ');
    if (!args[0]) return;
    
    const embed = new Discord.MessageEmbed()
        .setTitle('Evaluation')
        .setDescription(`\`\`\`${eval(input)}\`\`\``)
        .setFooter(message.author.tag)

    if (message.author.id !== 'trusted-user-id') {
        return message.reply('You can\'t use this command.');
    } else {
        message.channel.send(embed);
    }
});

client.login(token);