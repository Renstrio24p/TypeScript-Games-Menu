import './index.css'
import Start from "./Start"

const DOM = document.getElementById('app') as HTMLDivElement | null

{DOM && Start(DOM)}