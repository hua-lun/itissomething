const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('fs');

async function search(term, items) {
    let keyString;
    for (const [key, value] of Object.entries(items)) {
        keyString = String(key).toLowerCase()
        console.log(keyString)
        if (keyString.includes(term) === true) {
            return value
        }
    }
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('howtorecycle')
        .setDescription('Get information on how to recycle an item')
        .addSubcommand(subcommand =>
            subcommand
                .setName('item')
                .setDescription('Please enter an item')
                .addStringOption(option => option.setName('item').setDescription('item'))),
    async execute(interaction) {

        fs.readFile('./recyclable-materials-1.json', async (err, data1) => {
            if (err) throw err;

            let items = JSON.parse(data1)
            const item = interaction.options.getString('item')
            try {
                const here = await search(item, items)

                console.log(here)

                await interaction.reply(JSON.stringify(here, null, 2) + '\n' +
                    'Data from: https://data.world/buffalony/ru4s-wz29')

            } catch (e) {
                console.log(e)
                await interaction.reply('Invalid search term place try again! \n ' +
                    'Data from: https://data.world/buffalony/ru4s-wz29')
            }

        });
    },
};






