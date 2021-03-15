const Discord = require('discord.js');
const client = new Discord.Client();
const { token } = require('./config.json');

client.on('ready', () => {
    console.log('Bot is on!');

    const activities = [
        'test 1',
        'test 2',
        'test 3'
    ];
    const randomizer = Math.floor(Math.random() * activities.length);
    client.user.setActivity(activities[randomizer]);
    setInterval(() => {
        client.user.setActivity(activities[randomizer]);
    }, 30000);
});

client.login(token);