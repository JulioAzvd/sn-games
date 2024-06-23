import { Message} from 'discord.js';
import { AttachmentBuilder } from 'discord.js';
import { EventEmitter } from 'events';

interface WordleOptions {
    isSlashGame?: boolean;
    message: Message;
    embed?: {
        title?: string;
        color?: string;
    };
    customWord?: string | null;
    timeoutTime?: number;
    winMessage?: string;
    loseMessage?: string;
}

export default class Wordle extends EventEmitter {
    constructor(options: WordleOptions);

    sendMessage(content: any): Promise<Message>;

    getBoardImage(): Promise<AttachmentBuilder>;

    startGame(): Promise<void>;

    gameOver(msg: Message): Promise<Message>;
}
