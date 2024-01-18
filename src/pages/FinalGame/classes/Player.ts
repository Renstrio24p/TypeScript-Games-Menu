import { CollisionAnimation } from "./collisionAnimation";
import { FloatingMessage } from "./floatingMessages";
import Game from "./game";
import { Diving, Falling, Hit, Jumping, Rolling, Running, State } from "./state";
import { Sitting } from "./state";

export class Player {
    
    game: Game;
    width: number;
    height: number;
    x: number;
    y: number;
    vy: number;
    weight: number;
    image: HTMLImageElement;
    frameX: number;
    frameY: number;
    maxFrame: number;
    fps: number;
    frameInterval: number;
    frameTimer: number;
    speed: number;
    maxSpeed: number;
    states: State[];
    currentState?: State;
    
    constructor(game: Game){

        this.game = game;
        this.width = 100;
        this.height = 91.3;
        this.x = 0;
        this.y = this.game.height - this.height - this.game.groundMargin;
        this.frameX = 0;
        this.frameY = 0;
        this.maxFrame = 5;
        this.fps = 20;
        this.frameInterval = 1000/this.fps
        this.frameTimer = 0;
        this.vy = 0;
        this.weight = 1;
        this.image = new Image();  
        this.image.src = 'player-final.png';  

        this.speed = 0;
        this.maxSpeed = 19;
        this.states = [
            new Sitting(this.game),
            new Running(this.game),
            new Jumping(this.game),
            new Falling(this.game),
            new Rolling(this.game),
            new Diving(this.game),
            new Hit(this.game),
        ];
        this.currentState = undefined
    }

    update(input: string[],deltaTime: number) {
        this.checkcollision()
        this.currentState!.handleInput(input);
    
        // horizontal moves
        if (this.currentState instanceof Jumping || this.currentState instanceof Falling) {
            // Prevent horizontal movement during jumping and falling
            this.speed = 0;
        } else {
            // Allow horizontal movement in other states
            if (input.includes('ArrowRight') && this.currentState !== this.states[6]) {
                this.speed = this.maxSpeed;
            } else if (input.includes('ArrowLeft') && this.currentState !== this.states[6]) {
                this.speed = -this.maxSpeed;
            } else {
                this.speed = 0;
            }
        }
        // horizontal boundaries

        if(this.y > this.game.height - this.height - this.game.groundMargin) this.y = this.game.height - this.height - this.game.groundMargin;
    
        this.x += this.speed;
    
        if (this.x < 0) {
            this.x = 0;
        }
        if (this.x > this.game.width - this.width) {
            this.x = this.game.width - this.width;
        }
    
        // vertical moves
        this.y += this.vy;
    
        if (!this.onGround()) {
            this.vy += this.weight;
        } else {
            this.vy = 0;
        }
        // vertical boundaries
        
        //Sprite animate
        if(this.frameTimer > this.frameInterval){
            this.frameTimer = 0
            if(this.frameX < this.maxFrame){
                this.frameX++
            } else {
                this.frameX = 0
            }
        } else {
            this.frameTimer += deltaTime
        }
    }
    

    draw(ctx: CanvasRenderingContext2D){
        if(this.game.debug) ctx.strokeRect(this.x,this.y,this.width,this.height)
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
        );
    }

    onGround(){
        return this.y >= this.game.height - this.height - this.game.groundMargin;
    }

    setState(state:number,speed:number){
        this.currentState = this.states[state]
        this.game.speed = this.game.maxSpeed * speed // Left Of
        this.currentState.enter()
    }
    checkcollision(): void{
        this.game.enemies.forEach(enemy =>{
            if(
                enemy.x! < this.x + this.width &&
                enemy.x! + enemy.width! > this.x &&
                enemy.y! < this.y + this.height &&
                enemy.y! + enemy.height! > this.y
            ){
                // collision detected
                enemy.markedForDeletion = true
                this.game.collisions.push(new CollisionAnimation(this.game,enemy.x! + enemy.width! * 0.5,enemy.y! + enemy.height! * 0.5))
                if(this.currentState === this.states[4] || this.currentState === this.states[5]){
                    this.game.score++
                    this.game.floatingMessages.push(new FloatingMessage('+1',enemy.x!,enemy.y!,100,50))
                } else {
                    this.setState(6,0)
                    if(this.game.score <= 0){
                        this.game.score = 0
                    } else {
                        this.game.score-=5
                    }
                    this.game.lives--
                    if(this.game.lives <= 0) this.game.gameOver = true
                }

            } 
        })
    }
}
