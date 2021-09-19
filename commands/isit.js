const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('fs');
const validator = require('validator');
const TeachableMachine = require("@sashido/teachablemachine-node");

const model = new TeachableMachine({
    modelUrl: "https://teachablemachine.withgoogle.com/models/ngGWXLxQI/"
});

module.exports = {
    data: new SlashCommandBuilder()
        .setName('isitorisitnot')
        .setDescription('Send an image and see if it is organic, recyclable or waste')
        .addSubcommand(subcommand =>
            subcommand
                .setName('url')
                .setDescription('Please enter image url')
                .addStringOption(option => option.setName('url').setDescription('url'))),

    async execute(interaction) {

        const url = interaction.options.getString('url')

        if (validator.isURL(url) && (url.includes("png") || url.includes("jpg"))) {
            model.classify({
                imageUrl: url,
            }).then(async (predictions) => {
                console.log("Predictions:", predictions);
                const output1 = JSON.stringify(predictions[0]);
                const output2 = JSON.stringify(predictions[1]);
                await interaction.reply("Predictions:\n" + output1 + "\n" + output2)
            }).catch(async (e) => {
                console.log("ERROR", e);
                await interaction.reply("ERROR", e)
            });
        } else {
            await interaction.reply("Invalid url entered, please try again")
        }

    },
};






