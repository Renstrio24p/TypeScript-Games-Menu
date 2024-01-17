import Game from "./game";

export class Enemy {
    
    frameX: number
    frameY: number
    fps: number
    frameInterval: number
    frameTimer: number
    markedForDeletion: boolean
    x?: number
    y?: number
    width?: number
    height?: number
    speedX?: number
    speedY?: number
    maxFrame?: number
    image?: HTMLImageElement
    game: Game

    constructor(game: Game){
        this.game = game
        this.frameX = 0
        this.frameY = 0
        this.fps = 20
        this.frameInterval = 1000/this.fps
        this.frameTimer = 0
        this.markedForDeletion = false
    }

    update(deltaTime: number){
        // moves
        this.x! -= this.speedX! + this.game!.speed
        this.y! += this.speedY!
        if(this.frameTimer > this.frameInterval){
            this.frameTimer = 0
            if(this.frameX! < this.maxFrame!) this.frameX++;
            else this.frameX = 0
        } else {
            this.frameTimer += deltaTime
        }
    }
    draw(ctx: CanvasRenderingContext2D){
        if(this.game.debug) ctx.strokeRect(this.x!,this.y!,this.width!,this.height!)
        ctx.drawImage(
            this.image!,
            this.frameX! * this.width!,
            0,
            this.width!,
            this.height!,
            this.x!,
            this.y!,
            this.width!,
            this.height!
        )
    }
}

export class FlyingEnemy extends Enemy{

    game: Game
    width: number
    height: number
    angle: number
    va: number

    constructor(game: Game){
        super(game)
        this.game = game
        this.width = 60
        this.height = 44
        this.x = this.game.width + Math.random() * this.game.width * 0.5
        this.y = Math.random() * this.game.height * 0.5
        this.speedX = Math.random() + 1
        this.speedY = 0
        this.maxFrame = 5
        this.image = document.getElementById('enemy_fly') as HTMLImageElement
        this.angle = 0
        this.va = Math.random() * 0.1 + 0.1
    }
    update(deltaTime: number){
        super.update(deltaTime)
        this.angle += this.va
        this.y! += Math.sin(this.angle)
    }
    draw(ctx: CanvasRenderingContext2D){
        super.draw(ctx)
    }
}
export class GroundEnemy extends Enemy{
    game: Game
    constructor(game: Game){
        super(game)
        this.game = game
        this.width = 60
        this.height = 87
        this.x = this.game.width
        this.y = this.game.height - this.height - this.game.groundMargin
        this.image = document.getElementById('enemy_plant') as HTMLImageElement
        this.speedX = 0
        this.speedY = 0
        this.maxFrame = 1
    }
}
export class ClimbingEnemy extends Enemy {
    constructor(game: Game) {
      super(game);
      this.width = 120;
      this.height = 144;
      this.x = this.game.width;
      this.y = Math.random() * (this.game.height - this.height - this.game.groundMargin);
      this.image = document.getElementById('enemy_spider_big') as HTMLImageElement;
      this.speedX = 0;
      this.speedY = Math.random() > 0.5 ? 1 : -1;
      this.maxFrame = 5;
    }
  
    update(deltaTime: number): void {
      super.update(deltaTime);
  
      // Ensure the ClimbingEnemy stays within canvas bounds
      if (this.y! > this.game.height - this.height! - this.game.groundMargin) {
        this.y = this.game.height - this.height! - this.game.groundMargin;
        this.speedY! *= -1;
      }
  
      if (this.y! < 0) {
        this.y = 0;
        this.speedY! *= -1;
      }
  
      // Mark for deletion only if it's below the groundMargin
      if (this.y! > this.game.height - this.game.groundMargin) {
        this.markedForDeletion = true;
      }
    }
  
    draw(ctx: CanvasRenderingContext2D): void {
      super.draw(ctx);
      ctx.beginPath();
      ctx.moveTo(this.x! + this.width! / 2, 0);
      ctx.lineTo(this.x! + this.width! / 2, this.y! + 50);
      ctx.stroke();
    }
  }