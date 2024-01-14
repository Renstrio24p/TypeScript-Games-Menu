import Router from './assets/router/router.ts';
export default function Start(DOM: HTMLDivElement) {

  DOM.innerHTML = (`
    <div>
        <div id='router'></div>
    </div>
  `);
    const routes = document.getElementById('router') as HTMLDivElement
    Router(routes)
}