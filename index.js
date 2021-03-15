const Discord = require('discord.js');
const client = new Discord.Client();
const { token } = require('./config.json');

client.on('ready', () => {
    console.log('Bot is on!');
});

client.on('message', message => {
    if (message.content.toLowerCase() === 'embed') {
        const embed = new Discord.MessageEmbed()
            .setTitle('test')
            .setDescription('description here [link](link)')
            .setColor(255, 255, 255)
            .setThumbnail('media-link')
            .setImage('media-link')
            .addFields(
                { name: 'field name', value: 'field value', inline: true }
            )
            .setAuthor('WeebCodes', 'media-link', 'link')
            .setFooter('footer', 'media-link')
            .setTimestamp()

        message.channel.send(embed);
    }
});

client.login(token);