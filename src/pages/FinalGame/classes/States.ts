import Player from "./Player";

enum States {
    SITTING,
    RUNNING,
    JUMPING,
    FALLING
}

export class State {

    state: States;
    player?: Player;

    constructor(state: States) {
        this.state = state;
    }

    enter() {}
    handleInput(_input: string[]) {}
}

export class Sitting extends State {
    constructor(player: Player) {
        super(States.SITTING);
        this.player = player;
    }

    enter() {
        this.player!.frameX = 0
        this.player!.frameY = 5
        this.player!.maxFrame = 4
    }

    handleInput(input: string[]) {
        if (input.includes('ArrowLeft') || input.includes('ArrowRight')) {
            this.player?.setState(States.RUNNING);
        }
    }
}

export class Running extends State {
    constructor(player: Player) {
        super(States.RUNNING);
        this.player = player;
    }

    enter() {
        this.player!.frameX = 0
        this.player!.maxFrame = 6
        this.player!.frameY = 3;
    }

    handleInput(input: string[]) {
        if (input.includes('ArrowDown')) {
            this.player?.setState(States.SITTING);
        } else if (input.includes('ArrowUp')) {
            this.player?.setState(States.JUMPING);
        }
    }
}

export class Jumping extends State {
    constructor(player: Player) {
        super(States.JUMPING);
        this.player = player;
    }

    enter() {
        if (this.player?.onGround()) this.player.vy -= 27;
        this.player!.frameX = 0
        this.player!.maxFrame = 6
        this.player!.frameY = 1;
    }

    handleInput(_input: string[]) {
        if (this.player!.vy > this.player!.weight) {
            this.player?.setState(States.FALLING);
        }
    }
}

export class Falling extends State {
    constructor(player: Player) {
        super(States.FALLING);
        this.player = player;
    }

    enter() {
        this.player!.maxFrame = 6
        this.player!.frameY = 2;
    }
    
    handleInput(_input: string[]) {
        if (this.player?.onGround()) this.player.setState(States.RUNNING);
    }
}
