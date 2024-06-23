import { Message, InteractionReplyOptions } from 'discord.js';
import EvetEmitter from 'events';

interface SnakeGameOptions {
    isSlashGame?: boolean;
    message: Message | InteractionReplyOptions;
    embed?: {
        title?: string;
        color?: string;
        overTitle?: string;
    };
    snake?: {
        head?: string;
        body?: string;
        tail?: string;
        skull?: string;
    };
    emojis?: {
        board?: string;
        food?: string;
        up?: string;
        down?: string;
        left?: string;
        right?: string;
    };
    foods?: string[];
    stopButton?: string;
    timeoutTime?: number;
    playerOnlyMessage?: string | false;
}

export default class SnakeGame extends EvetEmitter {
    constructor(options: SnakeGameOptions);

    getBoardContent(isSkull: boolean): string;

    isSnake(pos: { x: number; y: number }): boolean;

    updateFoodLoc(): void;

    sendMessage(content: any): Promise<Message>;

    startGame(): Promise<void>;

    updateGame(msg: Message): Promise<Message>;

    gameOver(msg: Message): Promise<Message>;

    handleButtons(msg: Message): void;
}
