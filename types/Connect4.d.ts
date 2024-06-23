import { Message } from "discord.js";
import EventEmitter from "events";

type EmojiOptions = {
    board: string;
    player1: string;
    player2: string;
};

type EmbedOptions = {
    title?: string;
    statusTitle?: string;
    color?: string;
}

type GameOptions = {
    isSlashGame?: boolean;
    message: Message;
    opponent: any;
    embed?: EmbedOptions;
    emojis?: EmojiOptions;
    timeoutTime?: number;
    buttonStyle?: string;
    turnMessage?: string;
    winMessage?: string;
    tieMessage?: string;
    timeoutMessage?: string;
    requestMessage?: string;
    rejectMessage?: string;
    playerOnlyMessage?: string | false;
}

declare class Connect4 extends EventEmitter {
    constructor(options: GameOptions);

    startGame(): Promise<void>;
    sendMessage(content: string): Promise<Message>;
    getBoardContent(): string;
    connect4Game(msg: Message): Promise<void>;
    handleButtons(msg: Message): Promise<void>;
    gameOver(msg: Message, result: string): Promise<void>;
    getPlayerEmoji(): string;
    getTurnMessage(msg?: string): string;
    isBoardFull(): boolean;
    foundCheck(blockX: number, blockY: number): boolean;
}

export default Connect4;