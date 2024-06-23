import { Message, User, InteractionReplyOptions } from 'discord.js';
import EventEmitter from 'events';

interface HangmanOptions {
    isSlashGame?: boolean;
    message: Message | InteractionReplyOptions;
    embed?: {
        title?: string;
        color?: string;
    };
    hangman?: {
        hat?: string;
        head?: string;
        shirt?: string;
        pants?: string;
        boots?: string;
    };
    customWord?: string | null;
    timeoutTime?: number;
    theme?: string;
    winMessage?: string;
    loseMessage?: string;
    playerOnlyMessage?: string | false;
}

interface HangmanGame {
    player: User;
    word: string;
    damage: number;
    guessed: string[];
}

export default class Hangman extends EventEmitter {
    options: HangmanOptions;
    message: Message | InteractionReplyOptions;
    hangman: HangmanOptions['hangman'];
    word: string | null;
    guessed: string[];
    damage: number;

    constructor(options?: HangmanOptions);

    sendMessage(content: any): Promise<Message>;

    startGame(): Promise<void>;

    gameOver(msg: Message, result: boolean): Promise<void>;

    foundWord(): boolean;

    getWordEmojis(): string;

    getComponents(page?: number): import("discord.js").ActionRowComponent[];

    private getBoardContent(): string;

    private handleButtons(msg: Message): void;
}
