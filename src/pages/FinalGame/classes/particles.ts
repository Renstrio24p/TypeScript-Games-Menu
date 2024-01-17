import Game from "./game";

export class Particle {

    game: Game
    markedForDeletion: boolean
    x?: number
    y?:number
    speedX?:number
    speedY?:number
    size?: number
    color?: string
    image?: HTMLImageElement
    angle?: number
    va?: number
    gravity?: number

    constructor(game: Game){
        this.game = game
        this.markedForDeletion = false
    }
    update(){
        this.x! -= this.speedX! + this.game.speed
        this.y! -= this.speedY!
        this.size! *= 0.97
        if(this.size! < 0.5) this.markedForDeletion = true
    }
    draw(_ctx:CanvasRenderingContext2D){}

}

export class Dust extends Particle {
    constructor(game: Game,x: number,y: number){
        super(game)
        this.size = Math.random() * 10 + 10
        this.x = x
        this.y = y
        this.speedX = Math.random()
        this.speedY = Math.random()
        this.color = 'rgba(0,0,0,0.3)'
    }
    draw(ctx: CanvasRenderingContext2D){
        ctx.beginPath()
        ctx.arc(this.x!,this.y!,this.size!,0,Math.PI * 2 )
        ctx.fillStyle  = this.color!
        ctx.fill()
    }
}

export class Splash extends Particle {
    constructor(game: Game,x:number,y:number){
        super(game)
        this.size = Math.random() * 100 + 100
        this.x = x - this.size * 0.4
        this.y = y - this.size * 0.4
        this.speedX= Math.random() * 6 - 4
        this.speedY= Math.random() * 2 + 1
        this.gravity = 0
        this.image = document.getElementById('fire') as HTMLImageElement
    }
    update(): void {
        super.update()
        this.gravity! += 0.1
        this.y! += this.gravity!
    }
    draw(_ctx: CanvasRenderingContext2D): void {
        _ctx.drawImage(this.image!,this.x!,this.y!,this.size!,this.size!)
    }
}

export class Fire extends Particle {
    constructor(game: Game,x: number,y: number){
        super(game)
        this.image = document.getElementById('fire') as HTMLImageElement
        this.size = Math.random() * 100 + 100
        this.x = x - 1
        this.y = y 
        
        this.speedX = 1
        this.speedY = 1
        this.angle = 0
        this.va = Math.random() * 0.4 - 0.1
    }
    update(): void {
        super.update()
        this.angle! += this.va!
        this.x! += Math.sin(this.angle! * 10)
    }
    draw(_ctx: CanvasRenderingContext2D): void {
        _ctx.save()
        _ctx.translate(this.x!,this.y!)
        _ctx.rotate(this.angle!)
        _ctx.drawImage(
            this.image!,
            -this.size! * 0.5,
            -this.size! * 0.5,
            this.size!,
            this.size!
        )
        _ctx.restore()
    }
}