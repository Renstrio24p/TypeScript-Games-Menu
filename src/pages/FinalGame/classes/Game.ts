import { UI } from "./UI";
import { Background } from "./background";
import { CollisionAnimation } from "./collisionAnimation";
import { ClimbingEnemy, Enemy, FlyingEnemy, GroundEnemy } from "./enemies";
import { InputHandler } from "./input";
import { Particle } from "./particles";
import { Player } from "./player";

export default class Game {

  width: number;
  height: number;
  groundMargin: number;
  speed: number;
  maxSpeed: number;
  background: Background;
  player: Player;
  input: InputHandler;
  UI: UI
  enemies: Enemy[]
  particles: Particle[]
  collisions: CollisionAnimation[]
  maxParticles: number
  enemyTimer: number
  enemyInterval: number
  debug: boolean
  score: number
  time: number
  maxTime: number
  gameOver: boolean
  fontColor: string

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.groundMargin = 40
    this.speed = 0
    this.maxSpeed = 6
    this.background = new Background(this)
    this.player = new Player(this);
    this.input = new InputHandler(this);
    this.UI = new UI(this)
    this.enemies = []
    this.particles = []
    this.collisions = []
    this.maxParticles = 50
    this.enemyTimer = 0
    this.enemyInterval = 1000
    this.debug = false
    this.score = 0
    this.fontColor = 'black'
    this.time = 0
    this.maxTime = 20000
    this.gameOver = false
    this.player.currentState = this.player.states[0];
    this.player.currentState.enter();
  }

  update(deltaTime: number): void {
    this.time += deltaTime
    if(this.time > this.maxTime) this.gameOver = true
    this.background.update();
    this.player.update(this.input.keys, deltaTime);

    // handle Enemies
    if (this.enemyTimer > this.enemyInterval) {
      this.addEnemy();
      this.enemyTimer = 0;
    } else {
      this.enemyTimer += deltaTime
    }
    this.enemies.forEach(enemy => {
      enemy.update(deltaTime)
      if (enemy.markedForDeletion) this.enemies.splice(this.enemies.indexOf(enemy), 1)
    })
    // Handle Particles
    this.particles.forEach((particle, index) => {
      particle.update()
      if (particle.markedForDeletion) this.particles.splice(index, 1)
    })
    if (this.particles.length > this.maxParticles) {
      this.particles.length = this.maxParticles
    }

    // Handle Collision Sprites
    this.collisions.forEach((collision,index)=>{
       collision.update(deltaTime)
       if(collision.markedForDeletion) this.collisions.splice(index,1)
    })
  }

  draw(ctx: CanvasRenderingContext2D): void {
    this.background.draw(ctx)
    this.player.draw(ctx);
    this.enemies.forEach(enemy => {
      enemy.draw(ctx)
    })
    this.particles.forEach(particle => {
      particle.draw(ctx)
    })
    this.collisions.forEach(collision => {
      collision.draw(ctx)
    })
    this.UI.draw(ctx)
  }
  addEnemy(): void {
    if (this.speed > 0 && Math.random() < 0.5) this.enemies.push(new GroundEnemy(this));
    else if (this.speed > 0) this.enemies.push(new ClimbingEnemy(this))
    this.enemies.push(
      new FlyingEnemy(this),
    )
  }
}
