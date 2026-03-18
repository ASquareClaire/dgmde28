export class Game
{
    constructor
    (
        wordLength = 5,
        alphabetFull = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
        alphabetGuessed = [],
        guessesAllowed = 6,
        guessesMade = 0,
        answer = ''
    )
    {
        this.wordLength = wordLength,
        this.alphabetFull = alphabetFull,
        this.alphabetGuessed = alphabetGuessed,
        this.guessesAllowed = guessesAllowed,
        this.guessesMade = guessesMade,
        this.answer = answer
    }
}