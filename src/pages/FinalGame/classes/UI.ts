import Game from "./game";

export class UI {

    game: Game
    fontSize: number
    fontFamily: string

    constructor(game: Game) {
        this.game = game
        this.fontSize = 30
        this.fontFamily = 'Creepster'
    }
    draw(ctx: CanvasRenderingContext2D) {
        ctx.save()
        ctx.shadowOffsetX = 2
        ctx.shadowOffsetY = 2
        ctx.shadowColor = 'white'
        ctx.shadowBlur = 0
        ctx.font = this.fontSize + 'px ' + this.fontFamily
        ctx.textAlign = 'left'
        ctx.fillStyle = this.game.fontColor;
        // Score UI
        ctx.fillText('Score : ' + this.game.score, 20, 50)
        // Timer
        ctx.font = this.fontSize * 0.8 + 'px ' + this.fontFamily
        ctx.fillText('Time: ' + ((this.game.time * 0.001).toFixed(1)), 20, 80)
        // gameOver Message
        if (this.game.gameOver) {
            ctx.textAlign = 'center'
            ctx.font = this.fontSize * 2 + 'px ' + this.fontFamily
            if (this.game.score > 10) {
                ctx.fillText('Amazing!', this.game.width * 0.5, this.game.height * 0.5 - 20)
                ctx.font = this.fontSize * 0.7 + 'px ' + this.fontFamily
                ctx.fillText('What are creatures at night you afraid of? YOU!!!', this.game.width * 0.5, this.game.height * 0.5 + 20)
            } else {
                ctx.fillText('Love at first bite?', this.game.width * 0.5, this.game.height * 0.5 - 20)
                ctx.font = this.fontSize * 0.7 + 'px ' + this.fontFamily
                ctx.fillText('Nope, better luck next time!.', this.game.width * 0.5, this.game.height * 0.5 + 20)
            }
        }
        ctx.restore()
    }
}