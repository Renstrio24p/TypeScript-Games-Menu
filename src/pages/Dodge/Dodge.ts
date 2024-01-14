import Styles from './Dodge.module.css'

export default function Dodge(DOM: HTMLDivElement) {

    document.title = 'TypeScript 2D Game'

    DOM.innerHTML = (`
        <div class='${Styles.dodger}'>
        <a class='${Styles.navigate}' href='/'>Home</a>
        <h1 class='${Styles.title}'>Dog Dodger</h1>
            <canvas id='canvas' class='${Styles.dodge}'>
            </canvas>
            <img id='playerImage' class='${Styles.playerImage}' src='player.png'>
            <img id='backgroundImage' class='${Styles.backgroundImage}' src='background_single.png'>
            <img id='enemyImage' class='${Styles.enemyImage}' src='enemy_1.png'>
            <button id='fullscreen' class=${Styles.fullscreen}>Toggle FullScreen</button>
        </div>
    `)

    window.addEventListener('load', () => {
        const canvas = document.getElementById('canvas') as HTMLCanvasElement
        const ctx = canvas.getContext('2d')
        canvas.width = 1300
        canvas.height = 520
        let enemies: Enemy[] = []
        let score = 0
        let gameOver = false
        const fullscreenEl = document.getElementById('fullscreen') as HTMLButtonElement

        class InputHandler {
            keys: Record<string, boolean>
            touchY: number
            touchTreshold: number
            touchStartX!: number
            touchStartY!: number

            constructor() {
                this.keys = {}
                this.touchY = 0
                this.touchTreshold = 30

                window.addEventListener('keydown', (e) => {
                    if (['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
                        this.keys[e.key] = true;
                    } else if (e.key === 'Enter' && gameOver) {
                        RestartGame();
                        console.log('enter pressed')
                        return
                    }
                });

                window.addEventListener('keyup', (e) => {
                    if (['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
                        this.keys[e.key] = false;
                    }
                });
                window.addEventListener('touchstart', (e) => {
                    this.touchY = e.changedTouches[0].pageY;
                });
    
                window.addEventListener('touchstart', (e) => {
                    this.touchStartX = e.changedTouches[0].pageX;
                    this.touchStartY = e.changedTouches[0].pageY;
                    this.touchY = e.changedTouches[0].pageY;
                });
                
                
                
                window.addEventListener('touchmove', (e) => {
                    const swipeXDistance = e.changedTouches[0].pageX - this.touchStartY;
                    const swipeYDistance = e.changedTouches[0].pageY - this.touchStartY;
                
                    if (Math.abs(swipeXDistance) > Math.abs(swipeYDistance)) {
                        if (swipeXDistance < -this.touchTreshold) {
                            this.keys['swipe left'] = true;
                            this.keys['swipe right'] = false;
                        } else if (swipeXDistance > this.touchTreshold) {
                            this.keys['swipe right'] = true;
                            this.keys['swipe left'] = false;
                        }
                    } else {
                        if (swipeYDistance < -this.touchTreshold) {
                            this.keys['swipe up'] = true;
                            this.keys['swipe down'] = false;
                        } else if (swipeYDistance > this.touchTreshold) {
                            this.keys['swipe down'] = true;
                            this.keys['swipe up'] = false;
                        }
                    }
                    
                });
                
                window.addEventListener('touchend', (e) => {
                    const tapThreshold = 10;
                    const tapXDistance = e.changedTouches[0].pageX - this.touchStartX;
                    const tapYDistance = e.changedTouches[0].pageY - this.touchStartY;
                
                    if (Math.abs(tapXDistance) < tapThreshold && Math.abs(tapYDistance) < tapThreshold) {
                        this.keys['swipe down'] = true;
                
                        if (gameOver) {
                            RestartGame();
                        }
                    } else {
                        this.keys['swipe down'] = false;
                    }
                });
                
                
                
                window.addEventListener('touchend', () => {
                    // Reset swipe keys on touch end
                    this.keys['swipe up'] = false;
                    this.keys['swipe down'] = false;
                    this.keys['swipe left'] = false;
                    this.keys['swipe right'] = false;
                });
                
    
                window.addEventListener('touchend', () => {
                    // Reset swipe keys on touch end
                    this.keys['swipe up'] = false;
                    this.keys['swipe down'] = false;
                    this.keys['tap'] = false
                });
            }

            isKeyPressed(key: string): boolean {
                return !!this.keys[key];
            }
        }


        class Player {
            gameWidth: number;
            gameHeight: number;
            width: number;
            height: number;
            x?: number;
            y?: number;
            image: HTMLImageElement;
            frameX?: number;
            maxFrame?: number;
            frameY?: number;
            speed?: number;
            vy?: number;
            gravity?: number;
            fps?: number;
            frameTimer?: number;
            frameInterval?: number;
        
            constructor(gameWidth: number, gameHeight: number) {
                this.gameWidth = gameWidth;
                this.gameHeight = gameHeight;
                this.width = 200;
                this.height = 200;
                this.image = document.getElementById('playerImage') as HTMLImageElement;
                this.reset();
            }
        
            reset() {
                this.x = 100;
                this.y = this.gameHeight - this.height;
                this.frameX = 0;
                this.maxFrame = 8;
                this.frameY = 0;
                this.speed = 0;
                this.vy = 0;
                this.gravity = 1;
                this.fps = 20;
                this.frameTimer = 0;
                this.frameInterval = 1000 / this.fps;
            }
        
            draw(ctx: CanvasRenderingContext2D) {
                ctx!.drawImage(
                    this.image,
                    this.frameX! * this.width,
                    this.frameY! * this.height,
                    this.width,
                    this.height,
                    this.x!,
                    this.y!,
                    this.width,
                    this.height
                );
            }
        
            move(input: InputHandler, deltaTime: number, enemies: Enemy[]) {
                this.handleCollision(enemies);
                this.animateSprite(deltaTime, input.isKeyPressed('ArrowLeft') || input.isKeyPressed('swipe left'));
                this.handleInput(input, deltaTime);
                this.updatePosition();
            }
            
            handleCollision(enemies: Enemy[]) {
                for (const enemy of enemies) {
                    const dx = this.x! + (this.width / 3) - (enemy.x + enemy.width / 2);
                    const dy = this.y! + this.height / 2 - (enemy.y + enemy.height / 2);
                    const collisionRadius = (Math.min(this.width, this.height) + Math.min(enemy.width, enemy.height)) / 3;
                    const squaredDistance = dx ** 2 + dy ** 2;
            
                    if (squaredDistance < collisionRadius ** 2) {
                        const distance = Math.sqrt(squaredDistance);
                        const overlap = (collisionRadius - distance) / 2;
                        
                        const overlapX = overlap * (dx / distance);
                        const overlapY = overlap * (dy / distance);
            
                        this.x! -= overlapX;
                        this.y! -= overlapY;
            
                        gameOver = true;
                    }
                }
            }
            
            
            
        
            animateSprite(deltaTime: number, isMovingLeft: boolean) {
                if (this.frameTimer! > this.frameInterval!) {
                    if (isMovingLeft) {
                        this.frameX = (this.frameX! - 1 + this.maxFrame!) % this.maxFrame!;
                    } else {
                        this.frameX = (this.frameX! + 1) % this.maxFrame!;
                    }
                    this.frameTimer = 0;
                } else {
                    this.frameTimer! += deltaTime;
                }
            }
            
            
        
            handleInput(input: InputHandler,deltaTime: number) {
                this.speed = input.isKeyPressed('ArrowRight') || input.isKeyPressed('swipe right') ? 5 : input.isKeyPressed('ArrowLeft') || input.isKeyPressed('swipe left') ? -5 : 0;

                if (input.isKeyPressed('ArrowUp') && this.onGround() || input.isKeyPressed('swipe up') && this.onGround()) {
                    this.vy! -= 30;
                }
            
                if (input.isKeyPressed('swipe down') && gameOver) {
                    RestartGame();
                }
            
                this.animateSprite(deltaTime, input.isKeyPressed('ArrowLeft') || input.isKeyPressed('swipe left'));
            }
        
            updatePosition() {
                this.x! += this.speed!;
                this.x = Math.max(0, Math.min(this.x!, this.gameWidth - this.width));
        
                this.y! += this.vy!;
                if (!this.onGround()) {
                    this.vy! += this.gravity!;
                    this.maxFrame = 5;
                    this.frameY = 1;
                } else {
                    this.vy = 0;
                    this.maxFrame = 8;
                    this.frameY = 0;
                }
        
                this.y = Math.min(this.y!, this.gameHeight - this.height);
            }
        
            onGround() {
                return this.y! >= this.gameHeight - this.height;
            }
        }
        

        class Background {
            gameWidth: number
            gameHeight: number
            image: HTMLImageElement
            x: number
            y: number
            width: number
            height: number
            speed: number
            constructor(gameWidth: number, gameHeight: number) {
                this.gameWidth = gameWidth
                this.gameHeight = gameHeight
                this.image = document.getElementById('backgroundImage') as HTMLImageElement
                this.x = 0
                this.y = 0
                this.width = 1900
                this.height = 520
                this.speed = 5
            }
            restart(){
                this.x = 0
            }
            draw(ctx: CanvasRenderingContext2D) {
                ctx.drawImage(
                    this.image,
                    this.x,
                    this.y,
                    this.width,
                    this.height
                )
                ctx.drawImage(
                    this.image,
                    this.x + this.width - this.speed,
                    this.y,
                    this.width,
                    this.height
                )
            }
            update() {
                this.x -= this.speed
                if (this.x < 0 - this.width) this.x = 0
            }
        }

        class Enemy {
            gameWidth: number;
            gameHeight: number;
            width: number;
            height: number;
            image: HTMLImageElement;
            x: number;
            y: number;
            frameX: number;
            maxFrame: number;
            fps: number;
            frameTimer: number;
            frameInterval: number;
            speed: number;
            markedForDeletion: boolean

            constructor(gameWidth: number, gameHeight: number) {
                this.gameWidth = gameWidth;
                this.gameHeight = gameHeight;
                this.width = 160;
                this.height = 119;
                this.image = document.getElementById('enemyImage') as HTMLImageElement;
                this.x = this.gameWidth;
                this.y = this.gameHeight - this.height;
                this.frameX = 0;
                this.maxFrame = 5;
                this.fps = 20;
                this.frameTimer = 0;
                this.frameInterval = 1000 / this.fps;
                this.speed = 8;
                this.markedForDeletion = false
            }

            draw(ctx: CanvasRenderingContext2D) {
                ctx.drawImage(
                    this.image,
                    this.frameX * this.width,
                    0,
                    this.width,
                    this.height,
                    this.x,
                    this.y,
                    this.width,
                    this.height
                );
            }

            move(deltaTime: number) {
                // Update the frame of the enemy image
                if (this.frameTimer > this.frameInterval) {
                    if (this.frameX >= this.maxFrame) {
                        this.frameX = 0;
                    } else {
                        this.frameX++;
                    }
                    this.frameTimer = 0;
                } else {
                    this.frameTimer += deltaTime;
                }

                // Move the enemy horizontally
                this.x -= this.speed;
                if (this.x < 0 - this.width) {
                    this.markedForDeletion = true
                    score++
                }
            }
        }



        let elapsedGameTime = 0; // Variable to track elapsed game time

function handleEnemies(deltaTime: number) {
    if (enemyTimer > enemyInterval + randomEnemyInterval) {
        enemies.push(new Enemy(canvas.width, canvas.height));
        enemyTimer = 0;

        // Check if 60 seconds have elapsed to increase enemy speed
        if (elapsedGameTime > 60) {
            increaseEnemySpeed();
            elapsedGameTime = 0; // Reset the timer
        }
    } else {
        enemyTimer += deltaTime;
    }

    enemies.forEach((enemy) => {
        enemy.draw(ctx!);
        enemy.move(deltaTime);
    });
    enemies = enemies.filter((enemy) => !enemy.markedForDeletion);

    elapsedGameTime += deltaTime;
}

function increaseEnemySpeed() {
    enemies.forEach((enemy) => {
        enemy.speed += 7; 
    });
}
        

        function displayStatusText(ctx: CanvasRenderingContext2D) {
            ctx.textAlign = 'left'
            ctx.font = '50px Helvetica';
            ctx.fillStyle = 'white';
            ctx.fillText(`Score: ${score}`, 50, 50);
        
            ctx.save();
        
            ctx.fillStyle = 'black';
            ctx.fillText(`Score: ${score}`, 52, 52);
        
            if (gameOver) {
                ctx.textAlign = 'center';
                ctx.fillStyle = 'black';
                ctx.fillText('GAME OVER, TRY AGAIN! :D', canvas.width / 2, 200);
        
                ctx.translate(2, 2);
                ctx.fillStyle = 'white';
                ctx.fillText('GAME OVER, TRY AGAIN! :D', canvas.width / 2, 200);
            }
            ctx.restore();
        }
        
        function RestartGame(){
            player.reset()
            background.restart()
            enemies = []
            score = 0
            gameOver = false
            animate(0)
        }

        function ToggleFullScreen():void{
            if(!document.fullscreenElement){
                canvas.requestFullscreen()
                .catch(err => alert(`Cannot Enable Fullscreen mode : ${(err as Error).message}`))
            } else {
                document.exitFullscreen()
            }
        }

        fullscreenEl.addEventListener('click',
            ToggleFullScreen
        )

        const input = new InputHandler()
        const player = new Player(canvas.width, canvas.height)
        const background = new Background(canvas.width, canvas.height)

        let lastTime = 0
        let enemyTimer = 0
        let enemyInterval = 1000
        let randomEnemyInterval = Math.random() * 1000 + 500

        function animate(timeStamp: number) {
            const deltaTime = timeStamp - lastTime
            lastTime = timeStamp
            ctx!.clearRect(0, 0, canvas.width, canvas.height)
            background.draw(ctx!)
            background.update()
            player.draw(ctx!)
            player.move(input, deltaTime, enemies)
            handleEnemies(deltaTime)
            displayStatusText(ctx!)
            if (!gameOver) {
                requestAnimationFrame(animate)
            }
        }
        animate(0)
    })
}