const Commando = require('discord.js-commando')
const request = require('request-promise')
const { getRandomElement } = require('../../helpers/getRandom')

module.exports = class WoofCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'woof',
            aliases: ['bark'],
            group: 'fun',
            memberName: 'woof',
            description: 'Cute dog.',
            details: 'Output a picture of a cute dog chosen at random. Available breeds are: ',
            args: [
                {
                    key: 'breed',
                    type: 'string',
                    default: 'any',
                    prompt: 'Enter a dog breed.',
                    oneOf: [
                        "Corgi",
                        "Shiba",
                        "Golden Retriever",
                        "Pitbull",
                        "Husky",
                        "Samoyed",
                        "Beagle",
                        "Cocker Spaniel",
                        "German Shepherd",
                        "Greyhound",
                        "Pomeranian",
                        "Dachshund",
                        "Boxer"
                    ].map( str => str.toLowerCase() )
                }
            ],
            argsPromptLimit: 1,
        })
    }
    
    async run( msg, args ) {
        // get breeds and prepare to request them
        const breeds = this.client.registry.commands
        .filter(command => command.name == 'woof' )
        .first()
        .argsCollector
        .args[0]
        .oneOf
        const breed = args.breed == 'any' ? getRandomElement(breeds) : args.breed
        const url = `https://api.woofbot.io/v1/breeds/${breed}/image`

        // perform the request
        const req = await request(url)
        const json = JSON.parse(req)

        // return the url as a file
        return msg.channel.send( { files: [json.response.url] } )
    }
}