import Animation from "../../pages/Animation/Animation.ts";
import Dodge from "../../pages/Dodge/Dodge.ts";
import intro from "../../pages/Intro/Intro.ts";
import NotFound from "../../pages/NotFound.ts";
import { TSRouter } from "./router.class.ts";

export default function Router(DOM: HTMLDivElement) {

const router = new TSRouter([
    {
      path: '/',
      element: ()=> intro(DOM),
      errorElement: ()=>{},
    },
    {
      path: '/game1',
      element: ()=> Dodge(DOM),
      errorElement: ()=>{},
    },
    {
      path: '/game2',
      element: ()=> Animation(DOM),
      errorElement: ()=>{},
    },
    {
        path: '*',
        element: () => NotFound(DOM)
    }
  ]);
  router.navigate('');
}