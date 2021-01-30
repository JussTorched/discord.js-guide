const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');

client.on('ready', async () => {
    console.log('Bot is on!');

    const array = ['test', 'test2', 'hello'];

    const randomizer = Math.floor(Math.random() * (array.length - 1) + 1);

    client.user.setActivity(array[randomizer], { type: 'WATCHING' })
    setInterval(() => {
        client.user.setActivity(array[randomizer], { type: 'WATCHING' });
    }, 30000)
    
    /*Get command(s)*/console.log(await client.api.applications(client.user.id).commands.get()); 

    /*Create command*/client.api.applications(client.user.id).commands.post({ 
        data: {
            name: 'test',
            description: 'test'
        }
    });
    /*Edit command*/client.api.applications(client.user.id).commands('COMMAND_ID').patch({ //Get COMMAND_ID from GET command
        data: {
            name: 'test',
            description: 'test'
        }
    });
    /*Delete command*/client.api.applications(client.user.id).commands('COMMAND_ID').delete() //Get COMMAND_ID from GET command


});

client.ws.on('INTERACTION_CREATE', async interaction => {
    /*Add command reply*/client.api.interactions(interaction.id, interaction.token).callback.post({ 
        data: {
            type: 4,
            data: {
                content: 'Message I send back.'
            }
        }
    });
});

client.on('message', message => {
    if (message.content === 'ping') {
        const normalPing = Date.now() - message.createdTimestamp;
        message.channel.send(`**Ping**: \`${normalPing}\`MS`)
    } else if (message.content === 'embed') {
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
});

client.login(config.token);
