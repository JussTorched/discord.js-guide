module.exports = {
    name: 'embed',
    description: 'embed a message',
    execute(message, args, Discord){
        const embed = new Discord.MessageEmbed()
        .setTitle('test')
        .setDescription('description here [link](https://cdn.discordapp.com/avatars/529153106911690765/a_eeae45f94eaf076e141557cbcca5933a.gif?size=1024)')
        .setColor(255, 255, 255)
        .setThumbnail('https://cdn.discordapp.com/avatars/529153106911690765/a_eeae45f94eaf076e141557cbcca5933a.gif?size=1024')
        .setImage('https://cdn.discordapp.com/avatars/529153106911690765/a_eeae45f94eaf076e141557cbcca5933a.gif?size=1024')
        .addFields(
            { name: 'field name', value: 'field value', inline: true }
        )
        .setAuthor('WeebCodes', 'https://cdn.discordapp.com/avatars/529153106911690765/a_eeae45f94eaf076e141557cbcca5933a.gif?size=1024', 'https://cdn.discordapp.com/avatars/529153106911690765/a_eeae45f94eaf076e141557cbcca5933a.gif?size=1024')
        .setFooter('footer', 'https://cdn.discordapp.com/avatars/529153106911690765/a_eeae45f94eaf076e141557cbcca5933a.gif?size=1024')
        .setTimestamp()

        message.channel.send(embed)
    }

}