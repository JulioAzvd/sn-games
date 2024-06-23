import { Message, User, InteractionReplyOptions } from 'discord.js';
import approve from '../utils/approve';

interface TicTacToeOptions {
    isSlashGame?: boolean;
    message: Message | InteractionReplyOptions;
    opponent: User;
    embed?: {
        title?: string;
        statusTitle?: string;
        overTitle?: string;
        color?: string;
    };
    emojis?: {
        xButton?: string;
        oButton?: string;
        blankButton?: string;
    };
    timeoutTime?: number;
    xButtonStyle?: string;
    oButtonStyle?: string;
    turnMessage?: string;
    winMessage?: string;
    tieMessage?: string;
    timeoutMessage?: string;
    requestMessage?: string;
    rejectMessage?: string;
    playerOnlyMessage?: string | false;
}

export default class TicTacToe extends approve {
    constructor(options: TicTacToeOptions);

    sendMessage(content: any): Promise<Message>;

    startGame(): Promise<void>;

    TicTacToeGame(msg: Message): Promise<void>;

    handleButtons(msg: Message): void;

    gameOver(msg: Message, result: 'win' | 'tie' | 'timeout'): Promise<Message>;

    isGameOver(): boolean;

    hasWonGame(player: number): boolean;

    getPlayerEmoji(): string;

    getTurnMessage(msg?: string): string;

    getButton(btn: number): { emoji: string; style: string };

    getComponents(): ActionRowBuilder[];
}
