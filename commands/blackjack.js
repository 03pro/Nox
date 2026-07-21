const {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
} = require("discord.js");

const suits = ["♠️", "♥️", "♦️", "♣️"];

const ranks = [
  { name: "A", value: 11 },
  { name: "2", value: 2 },
  { name: "3", value: 3 },
  { name: "4", value: 4 },
  { name: "5", value: 5 },
  { name: "6", value: 6 },
  { name: "7", value: 7 },
  { name: "8", value: 8 },
  { name: "9", value: 9 },
  { name: "10", value: 10 },
  { name: "J", value: 10 },
  { name: "Q", value: 10 },
  { name: "K", value: 10 },
];

function createDeck() {
  const deck = [];

  for (const suit of suits) {
    for (const rank of ranks) {
      deck.push({
        name: rank.name,
        value: rank.value,
        card: `${rank.name}${suit}`,
      });
    }
  }

  return deck.sort(() => Math.random() - 0.5);
}

// Ace automatically becomes 1 instead of 11
// if counting it as 11 would make the score go over 21.
function getScore(hand) {
  let score = hand.reduce((total, card) => total + card.value, 0);

  let aces = hand.filter(
    (card) => card.name === "A"
  ).length;

  while (score > 21 && aces > 0) {
    score -= 10;
    aces--;
  }

  return score;
}

function getCards(hand) {
  return hand.map((card) => card.card).join(" ");
}

function createButtons(disabled = false) {
  return new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId("bj_hit")
      .setLabel("Hit")
      .setEmoji("🃏")
      .setStyle(ButtonStyle.Primary)
      .setDisabled(disabled),

    new ButtonBuilder()
      .setCustomId("bj_stand")
      .setLabel("Stand")
      .setEmoji("🛑")
      .setStyle(ButtonStyle.Danger)
      .setDisabled(disabled),

    new ButtonBuilder()
      .setCustomId("bj_double")
      .setLabel("Double")
      .setEmoji("💰")
      .setStyle(ButtonStyle.Success)
      .setDisabled(disabled)
  );
}

function createGameEmbed(user, bet, player, dealer, result = null) {
  const playerScore = getScore(player);
  const dealerScore = getScore(dealer);

  let description = `
🃏 **${user.username}**, you bet **${bet.toLocaleString()} Coins** to play blackjack.

**Dealer [${dealerScore}]**　　　 **${user.username} [${playerScore}]**
${getCards(dealer)}　　　　${getCards(player)}
`;

  if (result) {
    description += `\n${result}`;
  }

  return new EmbedBuilder()
    .setDescription(description)
    .setFooter({
      text: "Nox Blackjack",
    });
}

module.exports = {
  createDeck,
  getScore,
  createButtons,
  createGameEmbed,
};
