import InputHandler from "../classes/input"
import Player from "../classes/player"

export function drawStatusText (ctx: CanvasRenderingContext2D,input: InputHandler,player: Player) {
    ctx.font = '28px Helvetica'
    ctx.fillStyle = 'white'
    ctx.fillText('Last input: ' + input.lastKey,20,40)
    ctx.fillText('Active State: ' + player.currentState.state,20,80)
}