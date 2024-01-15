import { Background } from "./Background"
import { InputHandler } from "./Input"
import Player from "./Player"

export default class Game {

    width: number
    height: number
    groundMargin: number
    speed: number
    background: Background
    player: Player
    input: InputHandler

    constructor(width: number,height: number){
        this.width = width
        this.height = height
        this.groundMargin = 50
        this.speed = 3
        this.background = new Background(this)
        this.player = new Player(this)
        this.input = new InputHandler()
    }

    update(deltaTime: number){
        this.background.update()
        this.player.update(this.input.keys,deltaTime)
    }
    draw(cctx: CanvasRenderingContext2D){
        this.background.draw(cctx)
        this.player.draw(cctx)
    }
 }