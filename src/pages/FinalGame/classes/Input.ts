export class InputHandler {
    keys: string[];

    constructor() {
        this.keys = [];

        window.addEventListener('keydown', (e) => {
            console.log('Key down:', e.key);
            
            // Prevent default browser behavior for arrow keys
            if (['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
                e.preventDefault();
            }

            if (
                (e.key === 'ArrowDown' ||
                 e.key === 'ArrowUp' ||
                 e.key === 'ArrowLeft' ||
                 e.key === 'ArrowRight' ||
                 e.key === 'Enter') && this.keys.indexOf(e.key) === -1
            ) {
                this.keys.push(e.key);
            }
        });

        window.addEventListener('keyup', (e) => {
            console.log('Key up:', e.key);
            
            // Prevent default browser behavior for arrow keys
            if (['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
                e.preventDefault();
            }

            if (
                (e.key === 'ArrowDown' ||
                 e.key === 'ArrowUp' ||
                 e.key === 'ArrowLeft' ||
                 e.key === 'ArrowRight' ||
                 e.key === 'Enter') && this.keys.indexOf(e.key) !== -1
            ) {
                this.keys.splice(this.keys.indexOf(e.key), 1);
            }
        });
    }
}
