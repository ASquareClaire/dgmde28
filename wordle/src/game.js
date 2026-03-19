export class Game
{
    constructor
    (
        wordLength = 5,
        alphabetFull = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
        alphabetGuessed = [],
        guessesMax = 6,
        guesses = 0,
        answer = '',
        usedKeyboard = 
        [
            ['Q','W','E','R','T','Y','U','I','O','P'],
            ['A','S','D','F','G','H','J','K','L'],
            ['Z','X','C','V','B','N','M']
        ]
    )
    {
        this.wordLength = wordLength,
        this.alphabetFull = alphabetFull,
        this.alphabetGuessed = alphabetGuessed,
        this.guessesMax = guessesMax,
        this.guesses = guesses,
        this.answer = answer,
        this.usedKeyboard = usedKeyboard
    }
}