const { SlashCommandBuilder } = require('discord.js');
const idGenerator = require('../utils/id-generator');

const database = require('../database/db');

const Account = require('../database/tables/accounts');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('create-account')
		.setDescription('Creates a fresh account!'),
	async execute(interaction) {
        const id = idGenerator.getUniqueID();

        await Account.create({
            id: id,
            cash: 0
        })
        
        interaction.reply('Create new account!');
        return interaction.user.send(`Here's your new fresh account: ${id}`);
	},
};