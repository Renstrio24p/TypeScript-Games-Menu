import Styles from './Animation.module.css'
import InputHandler from './classes/input'
import Player from './classes/player'
import { drawStatusText } from './functions/utils'

export default function Animation(DOM: HTMLDivElement) {

    document.title = 'State Management in Game'
    DOM.innerHTML = (`
        <div class=${Styles.container}>
            <h1 class='${Styles.title}'>Animation States</h1>
            <a class='${Styles.navigate}' href='/'>Home<a>
            <div>
                <canvas id='canvas' class=${Styles.canvas}></canvas>
                <img id='dogImage' src='dog.png' alt='dog image'>
                <h1 class='${Styles.loading}' id='loading'>LOADING...</h1>
            </div>
        </div>
    `)

    window.addEventListener('load', () => {
        const loading = document.getElementById('loading') as HTMLHeadElement | null
        loading!.style.display = 'none'

        const canvas = document.getElementById('canvas') as HTMLCanvasElement | null
        const ctx = canvas!.getContext('2d')

        canvas!.width = window.innerWidth
        canvas!.height = window.innerHeight

        const player = new Player(canvas!.width, canvas!.height)
        const input = new InputHandler()
        
        let lastTime = 0

        function animate(timeStamp: number){
            const deltaTime = timeStamp - lastTime
            lastTime = timeStamp
            ctx?.clearRect(0,0,canvas!.width,canvas!.height)
            player.update(input.lastKey)
            player.draw(ctx!,deltaTime)
            drawStatusText(ctx!,input,player)
            requestAnimationFrame(animate)
        }
        animate(0)
    })
}