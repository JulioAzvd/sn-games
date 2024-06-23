import { Message, User, InteractionReplyOptions } from 'discord.js';
import approve from '../utils/approve';

interface RPSGameOptions {
    isSlashGame?: boolean;
    message: Message | InteractionReplyOptions;
    opponent: User;
    embed?: {
        title?: string;
        color?: string;
        description?: string;
    };
    buttons?: {
        rock?: string;
        paper?: string;
        scissors?: string;
    };
    emojis?: {
        rock?: string;
        paper?: string;
        scissors?: string;
    };
    timeoutTime?: number;
    buttonStyle?: string;
    pickMessage?: string;
    winMessage?: string;
    tieMessage?: string;
    timeoutMessage?: string;
    requestMessage?: string;
    rejectMessage?: string;
    playerOnlyMessage?: string | false;
}

interface RPSGameResult {
    player: User;
    opponent: User;
    playerPick?: string;
    opponentPick?: string;
    winner?: string;
}

export default class RPSGame extends approve {
    constructor(options: RPSGameOptions);

    sendMessage(content: any): Promise<Message>;

    startGame(): Promise<void>;

    RPSGame(msg: Message): Promise<void>;

    getResult(): 'win' | 'tie' | 'timeout';

    player1Won(): boolean;

    gameOver(msg: Message, result: 'win' | 'tie' | 'timeout'): Promise<Message | void>;

    private formatTurnMessage(options: RPSGameOptions, messageType: string): string;
}