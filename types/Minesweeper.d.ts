import { Message, User, InteractionReplyOptions } from 'discord.js';
import EventEmitter from 'events';

interface MinesweeperOptions {
    isSlashGame?: boolean;
    message: Message | InteractionReplyOptions;
    embed?: {
        title?: string;
        color?: string;
        description?: string;
    };
    emojis?: {
        flag?: string;
        mine?: string;
    };
    mines?: number;
    timeoutTime?: number;
    winMessage?: string;
    loseMessage?: string;
    playerOnlyMessage?: string | false;
}

interface MinesweeperGame {
    player: User;
    blocksTurned: number;
}

export default class Minesweeper extends EventEmitter {
    options: MinesweeperOptions;
    message: Message | InteractionReplyOptions;
    emojis: {
        flag: string;
        mine: string;
    };
    gameBoard: (boolean | number)[];
    length: number;

    constructor(options?: MinesweeperOptions);

    sendMessage(content: any): Promise<Message>;

    startGame(): Promise<void>;

    handleButtons(msg: Message): void;

    gameOver(msg: Message, result: boolean): Promise<void>;

    private plantMines(): void;

    private getMinesAround(x: number, y: number): number;

    private showFirstBlock(): void;

    private foundAllMines(): boolean;

    private getComponents(showMines?: boolean, found?: boolean): import("discord.js").ActionRowComponent[];

    private getBoardContent(): string;
}
