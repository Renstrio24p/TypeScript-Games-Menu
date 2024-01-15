import Styles from './FinalGame.module.css'
import Game from './classes/Game'

export default function FinalGame(DOM: HTMLDivElement) {

  document.title = 'Final Game'

  DOM.innerHTML = (`
    <div class=${Styles.container}>
        <h1>FinalGame</h1>
        <canvas id='canvas' class=${Styles.canvas}></canvas>
        <img class='${Styles.player}' id='player' src='player-final.png' alt='image'>
        <img class='${Styles.layer}' id='layer1' src='background/layer-1.png' alt='image'>
        <img class='${Styles.layer}' id='layer2' src='background/layer-2.png' alt='image'>
        <img class='${Styles.layer}' id='layer3' src='background/layer-3.png' alt='image'>
        <img class='${Styles.layer}' id='layer4' src='background/layer-4.png' alt='image'>
        <img class='${Styles.layer}' id='layer5' src='background/layer-5.png' alt='image'>
    </div>
  `)

  window.addEventListener('load',()=>{
     const canvas = document.getElementById('canvas') as HTMLCanvasElement | null
     const ctx = canvas!.getContext('2d')
     canvas!.width = 500
     canvas!.height = 500


     const game = new Game(canvas!.width,canvas!.height)
     console.log(game)

     let lastTime = 0

     function animate(timeStamp: number){
       const deltaTime = timeStamp - lastTime
       lastTime = timeStamp
       ctx?.clearRect(0,0,canvas!.width,canvas!.height)
       game.update(deltaTime)
       game.draw(ctx!)
       requestAnimationFrame(animate)
     }
     animate(0)
  })

}