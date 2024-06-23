import { Message, User, InteractionReplyOptions } from 'discord.js';
import EventEmitter from 'events';

interface FloodOptions {
    isSlashGame?: boolean;
    message: Message | InteractionReplyOptions;
    embed?: {
        title?: string;
        color?: string;
    };
    difficulty?: number;
    timeoutTime?: number;
    buttonStyle?: string;
    winMessage?: string;
    loseMessage?: string;
    playerOnlyMessage?: string | false;
    emojis?: string[];
}

interface FloodGame {
    player: User;
    turns: number;
    maxTurns: number;
    boardColor: string;
}

export default class Flood extends EventEmitter {
    options: FloodOptions;
    message: Message | InteractionReplyOptions;
    length: number;
    gameBoard: string[];
    maxTurns: number;
    turns: number;

    constructor(options?: FloodOptions);

    getBoardContent(): string;

    sendMessage(content: any): Promise<Message>;

    startGame(): Promise<void>;

    gameOver(msg: Message, result: boolean): void;

    updateGame(selected: string, msg: Message): Promise<boolean | void>;
}
