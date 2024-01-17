import Styles from './NotFound.module.css'

export default function NotFound(DOM: HTMLDivElement) {

  DOM.innerHTML = (`
    <div class='${Styles.container}'>
      <h1>NotFound</h1>
      <a href='/'>Return Home</a>
    </div>
  `);

}