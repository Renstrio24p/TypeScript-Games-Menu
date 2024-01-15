import Game from "./Game"
import { Falling, Jumping, Running, Sitting, State } from "./States"

export default class Player {

    game: Game
    width: number
    height: number
    x: number
    y: number
    vy: number
    weight: number
    image: HTMLImageElement
    frameX: number
    frameY: number
    maxFrame: number
    fps: number
    frameInterval: number
    frameTimer: number
    speed: number
    maxSpeed: number
    states: State[]
    currentState: State

    constructor(game: Game) {
        this.game = game
        this.width = 100
        this.height = 91.3
        this.x = 0
        this.y = this.game.height - this.height - this.game.groundMargin
        this.vy = 0
        this.weight = 1
        this.image = document.getElementById('player') as HTMLImageElement
        this.frameX = 0
        this.frameY = 0
        this.maxFrame = 5
        this.fps = 20
        this.frameInterval = 1000/this.fps
        this.frameTimer = 0
        this.speed = 0
        this.maxSpeed = 10
        this.states = [
            new Sitting(this),
            new Running(this),
            new Jumping(this),
            new Falling(this),
        ]
        this.currentState = this.states[0]
        this.currentState.enter()
    }
    update(input: string[], deltaTime: number) {
        this.currentState.handleInput(input);

        // Horizontal moves
        this.x += this.speed; 

        if (input.includes('ArrowRight')) {
            this.speed = this.maxSpeed;
        } else if (input.includes('ArrowLeft')) {
            this.speed = -this.maxSpeed;
        } else {
            this.speed = 0;
        }

        if (this.x < 0) {
            this.x = 0;
        }

        if (this.x > this.game.width - this.width) {
            this.x = this.game.width - this.width;
        }

         // Vertical moves
         this.y += this.vy
         if(!this.onGround()) this.vy += this.weight;
         else this.vy = 0
 
         // Sprite Animation
         this.frameTimer += deltaTime;

        if (this.frameTimer > this.frameInterval) {
            this.frameTimer = 0;
            if (this.frameX < this.maxFrame) this.frameX++;
            else this.frameX = 0;
        }
    }
    
    draw(ctx: CanvasRenderingContext2D) {
        ctx.drawImage(
            this.image,
            this.frameX * this.width,
            this.frameY * this.height,
            this.width,
            this.height,
            this.x,
            this.y,
            this.width,
            this.height
        )
    }
    onGround(){
        return this.y >= this.game.height - this.height - this.game.groundMargin
    }
    setState(state: number){
        this.currentState = this.states[state]
        this.currentState.enter()
    }
}