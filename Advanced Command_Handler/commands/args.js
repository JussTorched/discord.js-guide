module.exports = {
    name: 'args',
    description: 'args example',
    execute(message, args){
        const fullMessage = args.join(' ');
        message.channel.send(fullMessage);
    }

}