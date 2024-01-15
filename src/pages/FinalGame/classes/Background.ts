import Game from "./Game";

export class Layer {

    game: Game
    width: number
    height: number
    speedModifier: number
    image: HTMLImageElement
    x: number
    y: number

    constructor(
        game: Game,
        width: number,
        height: number,
        speedModifier: number,
        image: HTMLImageElement
    ){
        this.game = game 
        this.width = width
        this.height = height
        this.speedModifier = speedModifier
        this.image = image
        this.x = 0
        this.y = 0
    }
    update(){
        if(this.x < -this.width){
            this.x = 0
        } else {
            this.x -= this.game.speed! * this.speedModifier
        }
    }
    draw(ctx: CanvasRenderingContext2D){
        ctx.drawImage(
                this.image,
                this.x,
                this.y,
                this.width,
                this.height
        )
    }
}

export class Background {

    game: Game
    width: number
    height: number
    layer5Image: HTMLImageElement
    layer1: Layer
    backgroundLayers: Layer[]

    constructor(game: Game){
        this.game = game
        this.width = 1667
        this.height = 500
        this.layer5Image = document.getElementById('layer5') as HTMLImageElement
        this.layer1 = new Layer(
            this.game,
            this.width,
            this.height,
            1,
            this.layer5Image
        )
        this.backgroundLayers = [this.layer1]
    }
    update(){
        this.backgroundLayers.forEach(layer => {
            layer.update()
        })
    }
    draw(ctx: CanvasRenderingContext2D){
        this.backgroundLayers.forEach(layer => {
            layer.draw(ctx)
        })
        
    }
}