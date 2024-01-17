import Game from "./game";

export class InputHandler {
    keys: string[]
    game: Game
    constructor(game: Game) {
        this.keys = [];
        this.game = game
        window.addEventListener('keydown', (e) => {
            if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight','Enter'].includes(e.key) && this.keys.indexOf(e.key) === -1) {
                this.keys.push(e.key)
            } else if (e.key === 'd') this.game.debug = !this.game.debug
        });
        window.addEventListener('keyup', (e) => {
            if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight','Enter'].includes(e.key) && this.keys.indexOf(e.key) !== -1) {
                this.keys.splice(this.keys.indexOf(e.key), 1);
            }
        });
    }
}