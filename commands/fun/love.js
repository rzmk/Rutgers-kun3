const Commando = require('discord.js-commando')
const oneLine = require('oneline');

module.exports = class LoveCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'love',
            group: 'fun',
            memberName: 'love',
            description: 'Find out how much one person loves another! :heart:',
            details: `Supply two string arguments to get a percentage of how much one argument loves another! Calculations 
are performed without regard to case or order.`,
            examples: ['love person one, person two'],
            args: [
                {
                    key: 'one',
                    prompt: "Enter the first person's name.",
                    type: 'string',
                    parse: str => str.toLowerCase()
                },
                {
                    key: 'two',
                    prompt: "Enter the second's name.",
                    type: 'string',
                    parse: str => str.toLowerCase()
                }
            ],
            argsPromptLimit: 1,
        })
    }

    async run( msg, args ) {
        // let percent be 100 if the strings match or they pass easterEgg compare, otherwise calculate
        let percent = args.one.localeCompare(args.two) == 0 || this.easterEggStrCompare(args.one, args.two)
            ? 100
            : this.loveCalculation(
                this.calcValFromStr(args.one), this.calcValFromStr(args.two)
            );

        // form calculation string
        return msg.channel.send( oneLine`${args.one} loves ${args.two}
            ${percent}%${percent == 100 ? "! :heart:" : "" }` + `\n${this.generateProgressBar(percent)}` )
    }

    // calculate an integer value from a string by usnig ASCII codes
    calcValFromStr( str ) {
        let total = 0
        for( let i = 0; i < str.length; i++ )
            total += str.charCodeAt(i);
        return total;
    }

    // get a percent from two integers
    loveCalculation( intOne, intTwo ) { return (intOne+intTwo)%100 };

    // writing the progress bar to a message
    generateProgressBar( percent ) {
        let numHashes = percent/5;
        let probar = `[`;

        for( let i = 0; i < 20; i++ ) {
            if( i < numHashes )
                probar += '#';
            else
                probar += ' ';
        }
        probar += ']';

        return '`' + probar + '`';
    }

    // easter egg string compare
    easterEggStrCompare( strOne, strTwo ) {
        let orderingOne = (strOne == 'arjun' || strOne == 'arjun srivastav') && (strTwo == 'kate' || strTwo == 'kathryn' || strTwo == 'kathryn malin');
        strTwo = [strOne, strOne = strTwo][0];
        let orderingTwo = (strOne == 'arjun' || strOne == 'arjun srivastav') && (strTwo == 'kate' || strTwo == 'kathryn' || strTwo == 'kathryn malin');
        return orderingOne || orderingTwo;
    }
}