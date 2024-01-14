import Player from "./player";

// Enum for States

enum States {
    STANDING_LEFT = 0,
    STANDING_RIGHT,
    SITTING_LEFT,
    SITTING_RIGHT,
    RUNNING_LEFT,
    RUNNING_RIGHT,
    JUMPING_LEFT,
    JUMPING_RIGHT,
    FALLING_LEFT,
    FALLING_RIGHT,
}

// Super State

export default class State {
    state: string;
    player?: Player;

    constructor(state: string) {
        this.state = state;
    }

    enter() {
        this.state
    }

    handleInput(_input: string) {}
}

// Standing Left Dog State

export class StandingLeft extends State {
    constructor(player: Player) {
        super('STANDING LEFT');
        this.player = player;
    }

    enter() {
        this.player!.frameY = 1;
        this.player!.speed = 0
        this.player!.maxFrame = 6
    }

    handleInput(input: string) {
        super.handleInput(input); 
            switch(input){
                case 'PRESS Right':
                    this.player?.setState(States.RUNNING_RIGHT)
                    break
                case 'PRESS Left':
                    this.player?.setState(States.RUNNING_LEFT)
                    break
                case 'PRESS Down':
                    this.player?.setState(States.SITTING_LEFT)
                    break
                case 'PRESS Up':
                    this.player?.setState(States.JUMPING_LEFT)
                    break
            }
    }
}

// Standing Right Dog State

export class StandingRight extends State {
    constructor(player: Player) {
        super('STANDING RIGHT');
        this.player = player;
    }

    enter() {
        this.player!.frameY = 0;
        this.player!.speed = 0
        this.player!.maxFrame = 6
    }

    handleInput(input: string) {
        super.handleInput(input); 
        switch(input){
            case 'PRESS Left':
                this.player?.setState(States.RUNNING_LEFT)
                break
            case 'PRESS Right':
                this.player?.setState(States.RUNNING_RIGHT)
                break
            case 'PRESS Down':
                this.player?.setState(States.SITTING_RIGHT)
                break
            case 'PRESS Up':
                this.player?.setState(States.JUMPING_RIGHT)
                break
        }
    }
}

// Sitting Left Dog State

export class SittingLeft extends State {
    constructor(player: Player) {
        super('SITTING LEFT');
        this.player = player;
    }

    enter() {
        this.player!.frameY = 9;
        this.player!.speed = 0
        this.player!.maxFrame = 4
    }

    handleInput(input: string) {
        super.handleInput(input); 
        switch(input){
            case 'PRESS Right':
                this.player?.setState(States.SITTING_RIGHT)
                break
            case 'PRESS Up':
                this.player?.setState(States.STANDING_LEFT)
                break
            case 'RELEASE Down':
                this.player?.setState(States.STANDING_LEFT)
                break
        }
    }
}

// Sitting Right Dog State

export class SittingRight extends State {
    constructor(player: Player) {
        super('SITTING RIGHT');
        this.player = player;
    }

    enter() {
        this.player!.frameY = 8;
        this.player!.speed = 0
        this.player!.maxFrame = 4
    }

    handleInput(input: string) {
        super.handleInput(input); 
        switch(input){
            case 'PRESS Left':
                this.player?.setState(States.SITTING_LEFT)
                break
            case 'PRESS Up':
                this.player?.setState(States.STANDING_RIGHT)
                break
            case 'RELEASE Down':
                this.player?.setState(States.STANDING_RIGHT)
                break
        }
    }
}

// Running Left Dog State

export class RunningLeft extends State {
    constructor(player: Player) {
        super('RUNNING LEFT');
        this.player = player;
    }

    enter() {
        this.player!.frameY = 7;
        this.player!.speed = -this.player!.maxSpeed
        this.player!.maxFrame = 8
    }

    handleInput(input: string) {
        super.handleInput(input); 
        switch(input){
            case 'PRESS Right':
                this.player?.setState(States.RUNNING_RIGHT)
                break
            case 'RELEASE Left':
                this.player?.setState(States.STANDING_LEFT)
                break
            case 'PRESS Down':
                this.player?.setState(States.SITTING_LEFT)
                break
            case 'PRESS Up':
                this.player?.setState(States.JUMPING_LEFT)
                break
        }
    }
}
// Running Right Dog State

export class RunningRight extends State {
    constructor(player: Player) {
        super('RUNNING RIGHT');
        this.player = player;
    }

    enter() {
        this.player!.frameY = 6;
        this.player!.speed = this.player!.maxSpeed
        this.player!.maxFrame = 8
    }

    handleInput(input: string) {
        super.handleInput(input); 
        switch(input){
            case 'PRESS Left':
                this.player?.setState(States.RUNNING_LEFT)
                break
            case 'RELEASE Right':
                this.player?.setState(States.STANDING_RIGHT)
                break
            case 'PRESS Down':
                this.player?.setState(States.SITTING_RIGHT)
                break
            case 'PRESS Up':
                this.player?.setState(States.JUMPING_RIGHT)
                break
        }
    }
}

// Jumping Left Dog State

export class JumpingLeft extends State {
    constructor(player: Player) {
        super('JUMPING LEFT');
        this.player = player;
    }

    enter() {
        this.player!.frameY = 3;
        if(this.player?.onGround()){
            this.player!.vy -= 20;
        }
        this.player!.speed = -this.player!.maxSpeed * 0.5
        this.player!.maxFrame = 6
    }

    handleInput(input: string) {
        super.handleInput(input); 
        if(input === 'PRESS Right') {
            this.player?.setState(States.JUMPING_RIGHT)
        } else if(this.player?.onGround()){
            this.player.setState(States.STANDING_LEFT)
        } else if(this.player!.vy > 0){
            this.player?.setState(States.FALLING_LEFT)
        } 
    }
}

// Jumping Right Dog State

export class JumpingRight extends State {
    constructor(player: Player) {
        super('JUMPING RIGHT');
        this.player = player;
    }

    enter() {
        this.player!.frameY = 2;
        if(this.player?.onGround()){
            this.player!.vy -= 20;
        }
        this.player!.speed = this.player!.maxSpeed * 0.5
        this.player!.maxFrame = 6
    }

    handleInput(input: string) {
        super.handleInput(input); 
        if(input === 'PRESS Left') {
            this.player?.setState(States.JUMPING_LEFT)
        } else if(this.player?.onGround()){
            this.player.setState(States.STANDING_RIGHT)
        } else if(this.player!.vy > 0){
            this.player?.setState(States.FALLING_RIGHT)
        } 
    }
}

// Falling Left Dog State

export class FallingLeft extends State {
    constructor(player: Player) {
        super('FALLING LEFT');
        this.player = player;
    }

    enter() {
        this.player!.frameY = 5;
    }

    handleInput(input: string) {
        super.handleInput(input); 
        if(input === 'PRESS Right') {
            this.player?.setState(States.FALLING_RIGHT)
        } else if(this.player?.onGround()){
            this.player.setState(States.STANDING_LEFT)
        }
    }
}

// Falling Right Dog State

export class FallingRight extends State {
    constructor(player: Player) {
        super('FALLING RIGHT');
        this.player = player;
    }

    enter() {
        this.player!.frameY = 4;
    }

    handleInput(input: string) {
        super.handleInput(input); 
        if(input === 'PRESS LEFT') {
            this.player?.setState(States.FALLING_LEFT)
        } else if(this.player?.onGround()){
            this.player.setState(States.STANDING_RIGHT)
        }
    }
}
