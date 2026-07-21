require("dotenv").config();

const {
  Client,
  GatewayIntentBits,
  Events,
} = require("discord.js");

const http = require("http");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent,
  ],
});

// Simple web server for Render
const PORT = process.env.PORT || 3000;

http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("NoxBot is online!");
}).listen(PORT, () => {
  console.log(`🌐 Web server running on port ${PORT}`);
});

// Bot Ready
client.once(Events.ClientReady, (client) => {
  console.log(`✅ ${client.user.tag} is online!`);
});

// Commands
client.on(Events.MessageCreate, async (message) => {
  if (message.author.bot) return;

  if (!message.content.toLowerCase().startsWith("nox")) return;

  const args = message.content
    .slice(3)
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
