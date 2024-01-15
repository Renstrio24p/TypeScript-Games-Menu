import Styles from './Intro.module.css'

export default function intro(DOM: HTMLDivElement) {

  document.title = 'TypeScript Intro Games'

  DOM.innerHTML = (`
    <div class='${Styles.container}'>
      <h1>Vanilla TS Games Menu</h1>
      <p>Vanilla TypeScript Single Page Routing Games</p>
      <div class=${Styles.items}>
        <a href='/game1'>Dog Dodge Game Basics</a>
        <a href='/game2'>Dog Dodge Game Managing States</a>
        <a href='/game3'>Final Game</a>
      </div>
      <p>Work in Progress to add some Games this is not the final work yet. <br>
         I wrote this project in Vanilla TypeScript. 
      </p>
      <h2>Later Games</h2>
      <ul>
        <li>Rubix Cube</li>
        <li>Flappy Bird</li>
        <li>Boomer Man</li>
      </ul>
    </div>
  `)

}