require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const fs = require('fs');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

const CHANNEL_ID = "1480857221477699617";

const akun = JSON.parse(fs.readFileSync('./Akun.json'));

client.on("clientReady", () => {
  console.log("Bot sudah online");
});

client.on("messageCreate", async message => {

  if (message.author.bot) return;
  if (message.channel.id !== CHANNEL_ID) return;

  if (message.content === "!akun") {

    const id = message.author.id;
    console.log("ID user:", id);

    if (akun[id]) {

      try {
        await message.author.send(`Username: ${akun[id].username}\nPassword: ${akun[id].password}`);
        message.reply("Akun kamu sudah dikirim lewat DM.");
      } catch (err) {
        message.reply("Aku tidak bisa mengirim DM ke kamu.");
      }

    } else {
      message.reply("Kamu belum punya akun, DM Admin untuk dapat akun!");
    }

  }

});

client.login(process.env.TOKEN);