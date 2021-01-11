const Discord = require('discord.js');
const client = new Discord.Client();
const { prefix, token } = require('./config.json');
const commandList = require('./info.json');
const fs = require('fs');

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

client.once('ready', async () => {
    console.log('Bot is on!');

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
    let prefixes = false;
    for (const thisPrefix of prefix) {
        if (message.content.toLowerCase().startsWith(thisPrefix)) prefixes = thisPrefix;
    }

    if (!message.content.startsWith(prefixes) || message.author.bot) return;

    const args = message.content.slice(prefixes.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command = client.commands.get(commandName)
        || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return;

    if (command.args && !args.length) {
        message.channel.send(`You didn't provide any arguments, ${message.author}`)
    }
    let reply = `You didn't provide any arguments, ${message.author}`;
    if (command.usage) {
        reply += `\nThe proper usage for this command would be: ${prefix}${command.name} ${command.usage}.`

        return message.channel.send(reply);
    }

    if (command.guildOnly && message.channel.type === 'dm') {
        message.reply('You can\'t use this command inside dm\'s.')
        return;
    }

    try {
        command.execute(message, args, Discord)

        if (command === commandList) {
            command.execute(message, args, Discord);
        }

    } catch (error) {
        console.error(error)
        message.channel.send('There was an error executing the command.')
    }

});

client.login(token);