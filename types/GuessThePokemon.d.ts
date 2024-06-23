import { Message, User, InteractionReplyOptions } from 'discord.js';
import EventEmitter from 'events';

interface GuessThePokemonOptions {
    isSlashGame?: boolean;
    message: Message | InteractionReplyOptions;
    embed?: {
        title?: string;
        color?: string;
    };
    timeoutTime?: number;
    winMessage?: string;
    loseMessage?: string;
    errMessage?: string;
}

interface GuessThePokemonGame {
    player: User;
    pokemon: {
        name: string;
        types: string[];
        abilities: string[];
        questionImage: string;
        answerImage: string;
    };
}

export default class GuessThePokemon extends EventEmitter {
    options: GuessThePokemonOptions;
    message: Message | InteractionReplyOptions;
    pokemon: GuessThePokemonGame['pokemon'];

    constructor(options?: GuessThePokemonOptions);

    sendMessage(content: any): Promise<Message>;

    startGame(): Promise<void>;

    gameOver(msg: Message, result: boolean): Promise<void>;
}
