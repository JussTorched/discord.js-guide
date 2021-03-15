const Discord = require('discord.js');
const client = new Discord.Client();
const { token, prefix } = require('./config.json');

client.on('ready', () => {
    console.log('Bot is on!');
});

client.on('message', async message => {
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    if (message.content === preifx + 'img-manip') {
        if (!args[0]) {
            return message.channel.send('Please enter an argument.');
        } else {
            const Canvas = require('canvas');
            const fullMessageArgs = args.join(' ');
            const canvas = Canvas.createCanvas(512, 126);
            const ctx = canvas.getContext('2d');
            const background = await Canvas.loadImage('./xbox achievement template.png');

            ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

            ctx.strokeStyle = '10px #74037b';
            ctx.font = '25px sans-serif';
            ctx.fillStyle = '#d6cec7';

            ctx.fillText(fullMessageArgs, canvas.width / 3.8, canvas.height / 1.4);

            const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'yt-test.jpeg');

            message.channel.send(attachment);
        }
    }
});

client.login(token);