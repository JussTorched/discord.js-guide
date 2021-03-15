const Discord = require('discord.js');
const client = new Discord.Client();
const { prefix, token } = require('./config.json');

client.on('ready', () => {
    console.log('Bot is on!');
});

const fs = require('fs');
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.on('message', message => {
    let prefixes = false;
    for (const thisPrefix of prefix) {
        if (message.content.toLowerCase().startsWith(thisPrefix)) prefixes = thisPrefix;
    }

    if (!message.content.startsWith(prefixes) || message.author.bot) return;

    const args = message.content.slice(prefixes.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command = client.commands.get(commandName)
        || client.commands.find(cmd => cmd.aliases && clientmd.aliases.includes(commandName));

    if (!command) return;

    if (command.args && !args.length) {
        message.channel.send(`You didn't provide any arguments, ${message.author}`);
    }
    let reply = `You didn't provide any arguments, ${message.author}`;
    if (command.usage) {
        reply += `\nThe proper usage for this command would be: ${prefix}${command.name} ${command.usage}`;
        return message.channel.send(reply);
    }

    if (command.guildOnly && message.channel.type === 'dm') {
        return message.reply('You can\'t use this command inside dm\'s');
    }

    try {
        command.execute(message, args);
        if (command === []) {
            command.execute(message, args);
        }
    } catch (error) {
        console.error(error);
        message.channel.send('There was an error executing the command.');
    }


});

client.login(token);