
export default class InputHandler {
    lastKey: string
    constructor(){
        this.lastKey = ''
        window.addEventListener('keydown',(e)=>{
            switch(e.key){
                case 'ArrowLeft':
                    this.lastKey = 'PRESS Left'
                break
                case 'ArrowRight':
                    this.lastKey = 'PRESS Right'
                break
                case 'ArrowDown':
                    this.lastKey = 'PRESS Down'
                break
                case 'ArrowUp':
                    this.lastKey = 'PRESS Up'
                break
            }
        })
        window.addEventListener('keyup',(e)=>{
            switch(e.key){
                case 'ArrowLeft':
                    this.lastKey = 'RELEASE Left'
                break
                case 'ArrowRight':
                    this.lastKey = 'RELEASE Right'
                break
                case 'ArrowDown':
                    this.lastKey = 'RELEASE Down'
                break
                case 'ArrowUp':
                    this.lastKey = 'RELEASE Up'
                break
            }
        })
    }
}