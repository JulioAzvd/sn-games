const { EmbedBuilder, ActionRowBuilder } = require('discord.js');
const { formatMessage, ButtonBuilder } = require('../utils/utils');
const approve = require('../utils/approve');


export class RPSGame extends approve {
  constructor(options = {}) {

    if (!options.isSlashGame) options.isSlashGame = false;
    if (!options.message) throw new TypeError('NO_MESSAGE: Nenhuma opção de mensagem foi provida.');
    if (!options.opponent) throw new TypeError('NO_OPPONENT: Nenhuma opção de oponente foi provida.');
    if (typeof options.message !== 'object') throw new TypeError('INVALID_MESSAGE: Opção "mensagem" deve ser um objeto.');
    if (typeof options.isSlashGame !== 'boolean') throw new TypeError('INVALID_COMMAND_TYPE: Opção isSlashGame deve ser um booleano.');
    if (typeof options.opponent !== 'object') throw new TypeError('INVALID_OPPONENT: Opção "oponente" deve ser um objeto.');


    if (!options.embed) options.embed = {};
    if (!options.embed.title) options.embed.title = 'Pedra Papel ou Tesoura';
    if (!options.embed.color) options.embed.color = '#5865F2';
    if (!options.embed.description) options.embed.description = 'Aperte em um botão abaixo para fazer sua escolha.';

    if (!options.buttons) options.buttons = {};
    if (!options.buttons.rock) options.buttons.rock = 'Pedra';
    if (!options.buttons.paper) options.buttons.paper = 'Papel';
    if (!options.buttons.scissors) options.buttons.scissors = 'Tesoura';

    if (!options.emojis) options.emojis = {};
    if (!options.emojis.rock) options.emojis.rock = '🪨';
    if (!options.emojis.paper) options.emojis.paper = '📰';
    if (!options.emojis.scissors) options.emojis.scissors = '✂️';

    if (!options.timeoutTime) options.timeoutTime = 60000;
    if (!options.buttonStyle) options.buttonStyle = 'PRIMARY';
    if (!options.pickMessage) options.pickMessage = 'Você escolheu {emoji}.';
    if (!options.winMessage) options.winMessage = '**{player}** venceu! Parabéns!';
    if (!options.tieMessage) options.tieMessage = 'Houve um empate!';
    if (!options.timeoutMessage) options.timeoutMessage = 'O tempo do jogo acabou, ninguém ganhou!';
    if (!options.requestMessage) options.requestMessage = '{player} está te desafiando para uma partida de **Pedra Papel ou Tesoura**.';
    if (!options.rejectMessage) options.rejectMessage = 'O seu oponente recusou seu pedido para a partida de **Pedra Papel ou Tesoura**.';


    if (typeof options.embed !== 'object') throw new TypeError('INVALID_EMBED: embed deve ser um objeto.');
    if (typeof options.embed.title !== 'string') throw new TypeError('INVALID_EMBED: título da embed deve ser uma string.');
    if (typeof options.embed.color !== 'string') throw new TypeError('INVALID_EMBED: cor da embed deve ser uma string.');
    if (typeof options.embed.description !== 'string') throw new TypeError('INVALID_EMBED: descrição da embed deve ser uma string.');
    if (typeof options.buttons !== 'object') throw new TypeError('INVALID_BUTTONS: opção "butões" deve ser um objeto.');
    if (typeof options.buttons.rock !== 'string') throw new TypeError('INVALID_BUTTONS: botão-pedra deve ser uma string.');
    if (typeof options.buttons.paper !== 'string') throw new TypeError('INVALID_BUTTONS: botão-papel deve ser uma string.');
    if (typeof options.buttons.scissors !== 'string') throw new TypeError('INVALID_BUTTONS: botão-tesoura deve ser uma string.');
    if (typeof options.emojis !== 'object') throw new TypeError('INVALID_EMOJIS: opção "emojis" deve ser um objeto.');
    if (typeof options.emojis.rock !== 'string') throw new TypeError('INVALID_EMOJIS: emoji "pedra" deve ser uma string.');
    if (typeof options.emojis.paper !== 'string') throw new TypeError('INVALID_EMOJIS: emoji "papel" deve ser uma string.');
    if (typeof options.emojis.scissors !== 'string') throw new TypeError('INVALID_EMOJIS: emoji "tesoura" deve ser uma string.');
    if (typeof options.timeoutTime !== 'number') throw new TypeError('INVALID_TIME: tempo opção "Timeout" deve ser um number.');
    if (typeof options.buttonStyle !== 'string') throw new TypeError('INVALID_BUTTON_STYLE: button style deve ser uma string.');
    if (typeof options.pickMessage !== 'string') throw new TypeError('INVALID_MESSAGE: opção "pick message" deve ser uma string.');
    if (typeof options.winMessage !== 'string') throw new TypeError('INVALID_MESSAGE: opção "Win message" deve ser uma string.');
    if (typeof options.tieMessage !== 'string') throw new TypeError('INVALID_MESSAGE: opção "Tie message" deve ser uma string.');
    if (typeof options.timeoutMessage !== 'string') throw new TypeError('INVALID_MESSAGE: opção "Timeout message" deve ser uma string.');
    if (options.playerOnlyMessage !== false) {
      if (!options.playerOnlyMessage) options.playerOnlyMessage = 'Apenas {player} e {opponent} podem usar estes botões!';
      if (typeof options.playerOnlyMessage !== 'string') throw new TypeError('INVALID_MESSAGE: opção "playerOnly Message" deve ser uma string.');
    }


    super(options);
    this.options = options;
    this.message = options.message;
    this.opponent = options.opponent;
    this.playerPick = null;
    this.opponentPick = null;
  }


  async sendMessage(content) {
    if (this.options.isSlashGame) return await this.message.editReply(content).catch(e => {});
    else return await this.message.channel.send(content).catch(e => {});
  }

  async startGame() {
    if (this.options.isSlashGame || !this.message.author) {
      if (!this.message.deferred) await this.message.deferReply().catch(e => {});
      this.message.author = this.message.user;
      this.options.isSlashGame = true;
    }

    const approve = await this.approve();
    if (approve) this.RPSGame(approve);
  }


  async RPSGame(msg) {

    const emojis = this.options.emojis;
    const labels = this.options.buttons;
    const choice = { r: emojis.rock, p: emojis.paper, s: emojis.scissors };

    const embed = new EmbedBuilder()
    .setColor(this.options.embed.color)
    .setTitle(this.options.embed.title)
    .setDescription(this.options.embed.description)
    .setFooter({ text: this.message.author.tag + ' vs ' + this.opponent.tag })


    const r = new ButtonBuilder().setStyle(this.options.buttonStyle).setEmoji(choice.r).setCustomId('rps_r').setLabel(labels.rock);
    const p = new ButtonBuilder().setStyle(this.options.buttonStyle).setEmoji(choice.p).setCustomId('rps_p').setLabel(labels.paper);
    const s = new ButtonBuilder().setStyle(this.options.buttonStyle).setEmoji(choice.s).setCustomId('rps_s').setLabel(labels.scissors);
    const row = new ActionRowBuilder().addComponents(r, p, s);

    await msg.edit({ content: null, embeds: [embed], components: [row] });
    const collector = msg.createMessageComponentCollector({ idle: this.options.timeoutTime });


    collector.on('collect', async btn => {
      await btn.deferUpdate().catch(e => {});
      if (btn.user.id !== this.message.author.id && btn.user.id !== this.opponent.id) {
        if (this.options.playerOnlyMessage) btn.followUp({ content: formatMessage(this.options, 'playerOnlyMessage'), ephemeral: true });
        return;
      }


      if (btn.user.id === this.message.author.id && !this.playerPick) {
        this.playerPick = choice[btn.customId.split('_')[1]];
        btn.followUp({ content: this.options.pickMessage.replace('{emoji}', this.playerPick), ephemeral: true });
      } 
      else if (btn.user.id === this.opponent.id && !this.opponentPick) {
        this.opponentPick = choice[btn.customId.split('_')[1]];
        btn.followUp({ content: this.options.pickMessage.replace('{emoji}', this.opponentPick), ephemeral: true });
      }
      if (this.playerPick && this.opponentPick) return collector.stop();
    })

    collector.on('end', async (_, reason) => {
      if (reason === 'idle' || reason === 'user') return this.gameOver(msg, this.getResult());
    })
  }


  getResult() {
    if (!this.playerPick && !this.opponentPick) return 'timeout';
    else if (this.playerPick === this.opponentPick) return 'tie';
    else return 'win';
  }

  player1Won() {
    const { rock: r, paper: p, scissors: s } = this.options.emojis;
    return ((this.playerPick === s && this.opponentPick === p) || (this.playerPick === r && this.opponentPick === s) || (this.playerPick === p && this.opponentPick === r));
  }


  async gameOver(msg, result) {
    const RPSGame = { player: this.message.author, opponent: this.opponent, playerPick: this.playerPick, opponentPick: this.opponentPick };
    if (result === 'win') RPSGame.winner = this.player1Won() ? this.message.author.id : this.opponent.id;
    this.emit('gameOver', { result, ...RPSGame });
    this.player1Turn = this.player1Won();


    const embed = new EmbedBuilder()
    .setColor(this.options.embed.color)
    .setTitle(this.options.embed.title)
    .setFooter({ text: this.message.author.tag + ' vs ' + this.opponent.tag })
    .setDescription(this.formatTurnMessage(this.options, result+'Message'))
    .addFields({ name: this.message.author.username, value: this.playerPick ?? '❔', inline: true })
    .addFields({ name: 'VS', value: '⚡', inline: true })
    .addFields({ name: this.opponent.username, value: this.opponentPick ?? '❔', inline: true })
    
    return msg.edit({ embeds: [embed], components: [] });
  }
}