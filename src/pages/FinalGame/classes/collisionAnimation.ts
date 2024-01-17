import Game from "./game";

export class CollisionAnimation {
    game: Game
    image: HTMLImageElement
    spriteWidth: number
    spriteHeight: number
    sizeModifier: number
    width: number
    height: number
    x: number
    y: number
    frameX: number
    maxFrame: number
    markedForDeletion: boolean
    fps: number
    frameInterval: number
    frameTimer: number
    
    constructor(game: Game,x: number,y: number){
        this.game = game
        this.image = document.getElementById('collision') as HTMLImageElement
        this.spriteWidth = 200
        this.spriteHeight = 179
        this.sizeModifier = Math.random() + 0.5
        this.width = this.spriteWidth * this.sizeModifier
        this.height = this.spriteHeight * this.sizeModifier
        this.x = x - this.width * 0.5
        this.y = y - this.height * 0.5
        this.frameX = 0
        this.maxFrame = 4
        this.markedForDeletion = false
        this.fps = Math.random() * 10 + 5
        this.frameInterval = 1000/this.fps
        this.frameTimer = 0
    }
    draw(ctx: CanvasRenderingContext2D): void {
        ctx.drawImage(
            this.image,
            this.frameX * this.spriteWidth,
            0,
            this.spriteWidth,
            this.spriteHeight,
            this.x,
            this.y,
            this.width,
            this.height
        )
    }
    update(_deltaTime: number): void{
        this.x -= this.game.speed
        if(this.frameTimer > this.frameInterval){
            this.frameX++
        } else {
            this.frameTimer += _deltaTime
        }
        if(this.frameX > this.maxFrame) this.markedForDeletion = true
    }
}