import Game from "./game";
import { Dust, Fire, Splash } from "./particles";

enum States {
    SITTING = 0,
    RUNNING,
    JUMPING,
    FALLING,
    ROLLING,
    DIVING,
    HIT,
}

export class State {
    state: States;
    game: Game

    constructor(state: States, game: Game) {
        this.state = state;
        this.game = game
    }

    enter() { }
    handleInput(_input: string[]) { }
}

// Sitting State
export class Sitting extends State {

    constructor(game: Game) {
        super(States.SITTING, game);
    }

    enter() {
        this.game.player.frameX = 0;
        this.game.player.frameY = 5;
        this.game.player.maxFrame = 4;
    }

    handleInput(input: string[]) {
        if (input.includes('ArrowLeft') || input.includes('ArrowRight')) {
            this.game.player.setState(States.RUNNING, 1);
        } else if (input.includes('Enter')) {
            this.game.player.setState(States.ROLLING, 2);
        }

        if (input.includes('ArrowUp')) {
            this.game.player.setState(States.JUMPING, 1)
        }
    }
}

// Running State
export class Running extends State {

    constructor(game: Game) {
        super(States.RUNNING, game);
    }

    enter() {
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 8
        this.game.player.frameY = 3;
    }

    handleInput(input: string[]) {
        this.game.particles.unshift(new Dust(
            this.game,
            this.game.player.x + this.game.width * 0.1,
            this.game.player.y + this.game.player.height
        ))
        if (input.includes('ArrowUp')) {
            this.game.player.setState(States.JUMPING, 1);
        } else if (input.includes('ArrowDown')) {
            this.game.player.setState(States.SITTING, 0);
        }
        if (input.includes('Enter')) {
            this.game.player.setState(States.ROLLING, 2);
        }
    }
}


// Jumping State
export class Jumping extends State {

    constructor(game: Game) {
        super(States.JUMPING, game);
    }

    enter() {
        if (this.game.player.onGround()) {
            this.game.player.vy -= 27;
        }
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 6
        this.game.player.frameY = 1;
    }

    handleInput(_input: string[]) {
        if (this.game.player.vy > this.game.player.weight) {
            this.game.player.setState(States.FALLING, 1)
        }
        else if (_input.includes('Enter')) {
            this.game.player.setState(States.ROLLING, 2);
        } 
        else if(_input.includes('ArrowDown')){
            this.game.player.setState(States.DIVING,0)
        }
    }
}


// Falling State
export class Falling extends State {

    constructor(game: Game) {
        super(States.FALLING, game);
    }

    enter() {
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 6
        this.game.player.frameY = 2;
    }

    handleInput(_input: string[]) {
        if (this.game.player.onGround()) {
            this.game.player.setState(States.RUNNING, 1);
        } else if(_input.includes('ArrowDown')){
            this.game.player.setState(States.DIVING,0)
        }
    }
}

// Rolling State
export class Rolling extends State {

    constructor(game: Game) {
        super(States.ROLLING, game);
    }

    enter() {
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 6;
        this.game.player.frameY = 6;
    }

    handleInput(_input: string[]) {
        this.game.particles.unshift(new Fire(
            this.game,
            this.game.player.x - this.game.player.width * -0.6, // Adjust the x-coordinate
            this.game.player.y + this.game.player.height * 0.6
        ));

        if (!_input.includes('Enter') && this.game.player.onGround()) {
            this.game.player.setState(States.RUNNING, 1);
        } else if (!_input.includes('Enter') && !this.game.player.onGround()) {
            this.game.player.setState(States.FALLING, 1);
        } else if (_input.includes('Enter') && _input.includes('ArrowUp') && this.game.player.onGround()) {
            this.game.player.vy -= 27;
        } else if(_input.includes('ArrowDown') && !this.game.player.onGround()){
            this.game.player.setState(States.DIVING,0)
        }
    }
}

// Diving State
export class Diving extends State {

    constructor(game: Game) {
        super(States.DIVING, game);
    }

    enter() {
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 6;
        this.game.player.frameY = 6;
        this.game.player.vy = 15
    }

    handleInput(_input: string[]) {
        this.game.particles.unshift(new Fire(
            this.game,
            this.game.player.x - this.game.player.width * -0.6, // Adjust the x-coordinate
            this.game.player.y + this.game.player.height * 0.6
        ));

        if (this.game.player.onGround()) {
            this.game.player.setState(States.RUNNING, 1);
            for(let i = 0; i < 30 ; i++){
                this.game.particles.unshift(new Splash(
                    this.game,
                    this.game.player.x + this.game.player.width * 0.5,
                    this.game.player.y + this.game.player.height
                    ))
            }
        } else if (_input.includes('Enter') && !this.game.player.onGround()) {
            this.game.player.setState(States.ROLLING, 0);
        }
    }
}

// Hitting State
export class Hit extends State {

    constructor(game: Game) {
        super(States.HIT, game);
    }

    enter() {
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 10;
        this.game.player.frameY = 4;
    }

    handleInput(_input: string[]) {
       
        if (this.game.player.frameX >= 10 && this.game.player.onGround()) {
            this.game.player.setState(States.RUNNING, 1);
        } else if (this.game.player.frameX >= 10 && !this.game.player.onGround()) {
            this.game.player.setState(States.FALLING, 1);
        }
    }
}
