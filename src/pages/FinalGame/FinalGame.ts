import Styles from './FinalGame.module.css'
import Game from './classes/game'

export default function FinalGame(DOM: HTMLDivElement) {

  document.title = 'Final Game'

  DOM.innerHTML = (`
    <div class=${Styles.container}>
        <canvas id='canvas' class=${Styles.canvas}></canvas>
        <a href='/' class='${Styles.navigate}'>Home</a>
        <img class='${Styles.player}' id='player' src='player-final.png' alt='image'>
        <img class='${Styles.layer}' id='layer1' src='backgrounds/layer-1-forest.png' alt='image'>
        <img class='${Styles.layer}' id='layer2' src='backgrounds/layer-2-forest.png' alt='image'>
        <img class='${Styles.layer}' id='layer3' src='backgrounds/layer-3-forest.png' alt='image'>
        <img class='${Styles.layer}' id='layer4' src='backgrounds/layer-4-forest.png' alt='image'>
        <img class='${Styles.layer}' id='layer5' src='backgrounds/layer-5-forest.png' alt='image'>
        <img class='${Styles.enemy}' id='enemy_fly' src='enemies/enemy_fly.png' alt='flying enemy'>
        <img class='${Styles.enemy}' id='enemy_plant' src='enemies/enemy_plant.png' alt='plant enemy'>
        <img class='${Styles.enemy}' id='enemy_spider_big' src='enemies/enemy_spider_big.png' alt='spider enemy'>
        <img class='${Styles.particle}' id='fire' src='effects/fire.png' alt='fire particle'>
        <img class='${Styles.particle}' id='collision' src='effects/boom.png' alt='boom particle'>
    </div>
  `)

  window.addEventListener('load', () => {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement
    const ctx = canvas.getContext('2d')
    canvas.width = 500
    canvas.height = 500

    const game = new Game(canvas.width,canvas.height)

    let lastTime = 0

    function animate(_timeStamp?: number){
      const deltaTime = _timeStamp! - lastTime
      lastTime = _timeStamp!
      ctx?.clearRect(0,0,canvas.width,canvas.height)
      game.update(deltaTime)
      game.draw(ctx!)
      if(!game.gameOver)requestAnimationFrame(animate)
    }
    animate(0)

  })

}