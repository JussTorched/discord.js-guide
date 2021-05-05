module.exports = {
    name: 'nuke',
    description: 'Nuke a channel.',
    async execute(message) {
        const channel = message.mentions.channels.first() ? message.mentions.channels.first() : null;
        if (message.author.id !== message.guild.owner.id) {
            return message.reply('Only the owner of the guild can use this command!');
        }
        if (channel !== null) {
            message.guild.channels.create(channel.name, {
                parent: channel.parentID,
                permissionOverwrites: channel.permissionOverwrites
            }).then((c) => {
                c.send('Channel Purged');
                c.setPosition(channel.position);
            });
            await channel.delete();
        } else if (channel == null) {
            return message.reply('Please enter a valid channel.');
        }
    }
}
