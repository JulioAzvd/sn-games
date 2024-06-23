import { Message, User, InteractionReplyOptions, ActionRowBuilder } from 'discord.js';
import EventEmitter from 'events';

interface FindEmojiOptions {
    isSlashGame?: boolean;
    message: Message | InteractionReplyOptions;
    embed?: {
        title?: string;
        color?: string;
        description?: string;
        findDescription?: string;
    };
    timeoutTime?: number;
    hideEmojiTime?: number;
    buttonStyle?: string;
    emojis?: string[];
    winMessage?: string;
    loseMessage?: string;
    timeoutMessage?: string;
    playerOnlyMessage?: string | false;
}

interface FindEmojiGame {
    player: User;
    selectedEmoji?: string;
    correctEmoji: string;
}

export default class FindEmoji extends EventEmitter {
    options: FindEmojiOptions;
    message: Message | InteractionReplyOptions;
    emojis: string[];
    selected: string | null;
    emoji: string | null;

    constructor(options?: FindEmojiOptions);

    sendMessage(content: any): Promise<Message>;

    startGame(): Promise<void>;

    gameOver(msg: Message, result: boolean): void;

    getComponents(showEmoji: boolean): ActionRowBuilder[];
}
