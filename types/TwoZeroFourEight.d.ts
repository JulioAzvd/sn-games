import { Message, AttachmentBuilder } from "discord.js";
import EventEmitter from "events";

type EmojiOptions = {
    up: string;
    down: string;
    left: string;
    right: string;
};

type EmbedOptions = {
    title?: string;
    color?: string;
};

type GameOptions = {
    isSlashGame?: boolean;
    message: Message;
    embed?: EmbedOptions,
    emojis?: EmojiOptions;
    timeoutTime?: number;
    buttonStyle?: string;
    playerOnlyMessage?: string | false;
}

declare class TwoZeroFourEight extends EventEmitter {
    constructor(options: GameOptions);

    startGame(): Promise<void>;
    sendMessage(content: string): Promise<Message>;
    getBoardImage(): Promise<AttachmentBuilder>;
    handleButtons(msg: Message): Promise<void>;
    gameOver(msg: Message, result: boolean): Promise<void>;
    isGameOver(): boolean;
    placeRandomTile(): void;
    shiftVertical(direction: string): boolean;
    shiftHorizontal(direction: string): boolean;
    isInsideBlock(pos: { x: number; y: number }): boolean;
    shift(pos: { x: number; y: number }, direction: string): boolean;
}

export default TwoZeroFourEight;