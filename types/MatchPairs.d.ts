import { Message, User, InteractionReplyOptions } from 'discord.js';
import EventEmitter from 'events';

interface MatchPairsOptions {
    isSlashGame?: boolean;
    message: Message | InteractionReplyOptions;
    embed?: {
        title?: string;
        color?: string;
        description?: string;
    };
    timeoutTime?: number;
    emojis?: string[];
    winMessage?: string;
    loseMessage?: string;
    playerOnlyMessage?: string | false;
}

interface MatchPairsGame {
    player: User;
    tilesTurned: number;
    remainingPairs: number;
}

export default class MatchPairs extends EventEmitter {
    options: MatchPairsOptions;
    message: Message | InteractionReplyOptions;
    emojis: string[];
    remainingPairs: number;
    components: import("discord.js").ActionRowComponent[][];
    selected: { x: number; y: number; id: number } | null;
    tilesTurned: number;
    length: number;

    constructor(options?: MatchPairsOptions);

    sendMessage(content: any): Promise<Message>;

    startGame(): Promise<void>;

    gameOver(msg: Message, result: boolean): Promise<void>;

    handleButtons(msg: Message): Promise<void>;

    private getPairEmoji(emoji: string): { x: number; y: number; id: number }[];

    private getComponents(): import("discord.js").ActionRowComponent[];

    private getBoardContent(): string;
}
