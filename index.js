const TwoZeroFourEight = require("./src/2048").default;
const Connect4 = require("./src/Connect4").default;
const FindEmoji = require("./src/FindEmoji").default;
const Flood = require("./src/Flood").default;
const Hangman = require("./src/Hangman").default;
const MatchPairs = require("./src/MatchPairs").default;
const Minesweeper = require("./src/Minesweeper").default;
const GuessThePokemon = require("./src/GuessThePokemon").default;
const RockPaperScissors = require("./src/RockPaperScissors").default;
const TicTacToe = require("./src/TicTacToe").default;
const Snake = require("./src/Snake").default;
const Wordle = require("./src/Wordle").default;

const packageVersion = require("./package.json").version;

export {
    TwoZeroFourEight,
    Connect4,
    FindEmoji,
    Flood,
    Hangman,
    MatchPairs,
    Minesweeper,
    GuessThePokemon,
    RockPaperScissors,
    TicTacToe,
    Snake,
    Wordle,
    packageVersion
};