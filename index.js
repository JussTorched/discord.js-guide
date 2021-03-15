const Discord = require('discord.js');
const client = new Discord.Client();
const { token } = require('./config.json');
client.on('ready', async () => {
    console.log('Bot is on!');

    console.log(await client.api.applications(client.user.id).commands.get()); //Get all slash command data

    client.api.applications(client.user.id).guild('guild-id').commands.get(); //Guild specific example, were to insert .guild()

    client.api.applications(client.user.id).commands.post({ //Post a command
        data: {
            name: 'yt-test',
            description: 'YT vid.'
        }
    });

    client.api.applications(client.user.id).commands('command-id').patch({ //Edit a command
        data: {
            name: 'YT-t',
            description: 'Working'
        }
    });

    client.api.applications(client.user.id).commands('command-id').delete(); //Delete a command
});

client.ws.on('INTERACTION_CREATE', async interaction => {
    client.api.interactions(interaction.id, interaction.token).callback.post({ //Post a response for your slash command
        data: {
            type: 4,
            data: {
                content: 'YES, test works.'
            }
        }
    });
});

client.login(token);