// Player class, to hold stats
export class Player
// TODO: Add Win class? Convert to array with guess stat?
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