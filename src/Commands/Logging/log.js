const { ChatInputCommandInteraction } = require("discord.js");

const { EmbedBuilder } = require("discord.js");

const {google} = require('googleapis');
require('@google-cloud/local-auth');
require("dotenv").config(); 


//decode the credentials from .env
const base64EncodedServiceAccount = process.env.BASE64_CREDENTIALS; 
const decodedServiceAccount = Buffer.from(base64EncodedServiceAccount, 'base64').toString('utf-8');
const credentials = JSON.parse(decodedServiceAccount);

async function getAuthSheets() {
    const auth = new google.auth.GoogleAuth({
        credentials,
        scopes: "https://www.googleapis.com/auth/spreadsheets"
    });

    const client = await auth.getClient();

    const googleSheets = google.sheets({
        version: "v4",
        auth: client
    });

    const spreadsheetId = process.env.SPREADSHEET_ID;

    return {auth,client,googleSheets,spreadsheetId};
}

module.exports = {
    data: {
        name: 'log',
        description: 'Logs a Reactor Operation',
        type: 1,
        options: [{
            name: 'spai',
            description: 'Site Power At Ignition.',
            type: 10,
            required: true
        },{
            name: 'spas',
            description: 'Site Power At Shutdown.',
            type: 10,
            required: true
        }]
    },
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {DiscordBot} client 
     */
    execute: async (interaction) => {

        const { googleSheets, auth, spreadsheetId } = await getAuthSheets();

        const date = new Date().toISOString().replace(/([^T]+)T([^\.]+).*/g, '$1 $2') // Gives format (yyyy-MM-dd HH:mm:ss)
        const operatorNickname = interaction.member.nickname.replace(/\[.*\]/, '')  //remopve the nickname tag

        const DeltaPower = interaction.options.getNumber("spas") - interaction.options.getNumber("spai"); 

        if (DeltaPower <= 0) {
            return await interaction.reply({
                content: '**Are you crazy???** How do you produce **' + DeltaPower + 'W**?'
            });
        }
        
        googleSheets.spreadsheets.values.append({ //update the spreadsheet
            auth,
            spreadsheetId,
            range: "Form Responses",
            valueInputOption: "USER_ENTERED",
            resource: {
                values: [
                    [date, operatorNickname, interaction.options.getNumber("spai"), interaction.options.getNumber("spas")]
                ]
            }
        });


        const embed = new EmbedBuilder()
            .setTitle("Operation Logged!")
            .addFields([
                { name: "User", value: interaction.member.nickname },
                { name: "Power Produced", value: DeltaPower + "W" },
            ])
            .setTimestamp()
	        .setFooter({ text: 'Nuclear Engineering Branch' })
            .setColor("#963e00");

        await interaction.reply({
            embeds: [embed],
        });

    }
};