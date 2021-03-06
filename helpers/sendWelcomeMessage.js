function sendWelcomeMessage( guild, user, welcomeChannel, text ) {
    // leave if there is no welcome channel
    if(!welcomeChannel) return;

    let channel = welcomeChannel
    // turn id into channel
    channel = guild.channels.cache.find( channel => channel.id == welcomeChannel )
    // if channel cannot be found turn to systemchannel
    // channel = channel ? channel : guild.systemChannel
    // output welcome message text to a channel
    const welcomeText = text 
                        ? text
                                .replace(new RegExp('\\[guild\\]', 'g'), guild.name)
                                .replace(new RegExp('\\[user\\]', 'g'), `<@${user.id}>`) 
                        : `Welcome to ${guild.name}, <@${user.id}>!`
    channel.send( welcomeText )
}

exports.sendWelcomeMessage = sendWelcomeMessage