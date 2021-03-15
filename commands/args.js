module.exports = {
    name: 'args',
    description: 'Args example',
    execute(message, args) {
        const fullMessage = args.join(' ');
        message.channel.send(fullMessage);
    }
}