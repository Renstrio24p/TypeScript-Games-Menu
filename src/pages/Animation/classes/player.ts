import State, { FallingLeft, FallingRight, JumpingLeft, JumpingRight, RunningLeft, RunningRight, SittingLeft, SittingRight } from "./state";
import { StandingLeft, StandingRight } from "./state";

export default class Player {

    gameWidth: number;
    gameHeight: number;
    states: State[];
    currentState: State;
    image: HTMLImageElement;
    width: number;
    height: number;
    x: number;
    y: number;
    vy: number;
    weight: number;
    frameX: number;
    frameY: number;
    maxFrame: number;
    speed: number;
    maxSpeed: number;
    fps: number;
    frameTimer: number;
    frameInterval: number;

    constructor(gameWidth: number, gameHeight: number) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.states = [
                new StandingLeft(this), 
                new StandingRight(this),
                new SittingLeft(this),
                new SittingRight(this),
                new RunningLeft(this),
                new RunningRight(this),
                new JumpingLeft(this),
                new JumpingRight(this),
                new FallingLeft(this),
                new FallingRight(this),
            ];
        this.currentState = this.states[1];
        this.image = document.getElementById('dogImage') as HTMLImageElement;
        this.width = 200;
        this.height = 181.83;
        this.x = this.gameWidth / 2 - this.width / 2;
        this.y = this.gameHeight - this.height;
        this.vy = 0;
        this.weight = 0.5;
        this.frameX = 0;
        this.frameY = 0;
        this.maxFrame = 6;
        this.speed = 0;
        this.maxSpeed = 10;
        this.fps = 120;
        this.frameTimer = 0;
        this.frameInterval = 1000 / this.fps
    }

    update(input: string) {
        this.currentState.handleInput(input);
        // horizontal moves
        this.x += this.speed
        if(this.x <= 0){
            this.x = 0
        } else if(this.x >= this.gameWidth - this.width) {
            this.x = this.gameWidth - this.width
        }
        // vertical moves
        this.y += this.vy
        if(!this.onGround()){
            this.vy += this.weight
        } else {
            this.vy = 0
        }
        if(this.y > this.gameHeight - this.height){
            this.y = this.gameHeight - this.height
        }

    }
    onGround(){
        return this.y >= this.gameHeight - this.height
    }

    draw(ctx: CanvasRenderingContext2D,deltaTime: number) {
        if(this.frameTimer > this.frameInterval){
            if(this.frameX < this.maxFrame) this.frameX++
            else this.frameX = 0
            this.frameTimer = 0
        } else {
            this.frameTimer += deltaTime
        }
        ctx.drawImage(
            this.image,
            this.width * this.frameX,
            this.height * this.frameY,
            this.width,
            this.height,
            this.x,
            this.y,
            this.width,
            this.height
        );
    }

    setState(state: number) {
        if (state >= 0 && state < this.states.length) {
            this.currentState = this.states[state];
            this.currentState.enter();
        } else {
            console.error("Invalid state index");
        }
    }
}
