require("dotenv").config();

const {
  Client,
  GatewayIntentBits,
  Events,
} = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent,
  ],
});

// Prefix
const PREFIX = "nox";

// Bot Ready
client.once(Events.ClientReady, (client) => {
  console.log(`✅ ${client.user.tag} is online!`);
});

// Commands
client.on(Events.MessageCreate, async (message) => {
  if (message.author.bot) return;

  if (!message.content.toLowerCase().startsWith(PREFIX)) return;

  const args = message.content
    .slice(PREFIX.length)
    .trim()
    .split(/ +/);

  const command = args.shift()?.toLowerCase();

  // Balance Command
  if (command === "bal" || command === "balance") {
    return message.reply(
      `💰 **Balance**\n\n👤 ${message.author.username}\n\n💰 Wallet: **0 Coins**\n🏦 Bank: **0 Coins**`
    );
  }
});

client.login(process.env.TOKEN);
