export class Player
// TODO: Add Win class?
{
    constructor
    (
        name = 'Player One',
        totalWins = 0,
        totalLosses = 0,
    )
    {
        this.name = name,
        this.totalWins = totalWins,
        this.totalLosses = totalLosses
    }
}