var he="Animation-module__canvas_nzR7EW__100",le="Animation-module__container_nzR7EW__100",me="Animation-module__loading_nzR7EW__100",de="Animation-module__navigate_nzR7EW__100",pe="Animation-module__playerImage_nzR7EW__100",ue="Animation-module__title_nzR7EW__100",w={canvas:he,container:le,loading:me,navigate:de,playerImage:pe,title:ue};var x=class{lastKey;constructor(){this.lastKey="",window.addEventListener("keydown",e=>{switch(e.key){case"ArrowLeft":this.lastKey="PRESS Left";break;case"ArrowRight":this.lastKey="PRESS Right";break;case"ArrowDown":this.lastKey="PRESS Down";break;case"ArrowUp":this.lastKey="PRESS Up";break}}),window.addEventListener("keyup",e=>{switch(e.key){case"ArrowLeft":this.lastKey="RELEASE Left";break;case"ArrowRight":this.lastKey="RELEASE Right";break;case"ArrowDown":this.lastKey="RELEASE Down";break;case"ArrowUp":this.lastKey="RELEASE Up";break}})}};var l=class{state;player;constructor(e){this.state=e}enter(){this.state}handleInput(e){}},b=class extends l{constructor(e){super("STANDING LEFT"),this.player=e}enter(){this.player.frameY=1,this.player.speed=0,this.player.maxFrame=6}handleInput(e){switch(super.handleInput(e),e){case"PRESS Right":this.player?.setState(5);break;case"PRESS Left":this.player?.setState(4);break;case"PRESS Down":this.player?.setState(2);break;case"PRESS Up":this.player?.setState(6);break}}},T=class extends l{constructor(e){super("STANDING RIGHT"),this.player=e}enter(){this.player.frameY=0,this.player.speed=0,this.player.maxFrame=6}handleInput(e){switch(super.handleInput(e),e){case"PRESS Left":this.player?.setState(4);break;case"PRESS Right":this.player?.setState(5);break;case"PRESS Down":this.player?.setState(3);break;case"PRESS Up":this.player?.setState(7);break}}},R=class extends l{constructor(e){super("SITTING LEFT"),this.player=e}enter(){this.player.frameY=9,this.player.speed=0,this.player.maxFrame=4}handleInput(e){switch(super.handleInput(e),e){case"PRESS Right":this.player?.setState(3);break;case"PRESS Up":this.player?.setState(0);break;case"RELEASE Down":this.player?.setState(0);break}}},v=class extends l{constructor(e){super("SITTING RIGHT"),this.player=e}enter(){this.player.frameY=8,this.player.speed=0,this.player.maxFrame=4}handleInput(e){switch(super.handleInput(e),e){case"PRESS Left":this.player?.setState(2);break;case"PRESS Up":this.player?.setState(1);break;case"RELEASE Down":this.player?.setState(1);break}}},L=class extends l{constructor(e){super("RUNNING LEFT"),this.player=e}enter(){this.player.frameY=7,this.player.speed=-this.player.maxSpeed,this.player.maxFrame=8}handleInput(e){switch(super.handleInput(e),e){case"PRESS Right":this.player?.setState(5);break;case"RELEASE Left":this.player?.setState(0);break;case"PRESS Down":this.player?.setState(2);break;case"PRESS Up":this.player?.setState(6);break}}},G=class extends l{constructor(e){super("RUNNING RIGHT"),this.player=e}enter(){this.player.frameY=6,this.player.speed=this.player.maxSpeed,this.player.maxFrame=8}handleInput(e){switch(super.handleInput(e),e){case"PRESS Left":this.player?.setState(4);break;case"RELEASE Right":this.player?.setState(1);break;case"PRESS Down":this.player?.setState(3);break;case"PRESS Up":this.player?.setState(7);break}}},k=class extends l{constructor(e){super("JUMPING LEFT"),this.player=e}enter(){this.player.frameY=3,this.player?.onGround()&&(this.player.vy-=20),this.player.speed=-this.player.maxSpeed*.5,this.player.maxFrame=6}handleInput(e){super.handleInput(e),e==="PRESS Right"?this.player?.setState(7):this.player?.onGround()?this.player.setState(0):this.player.vy>0&&this.player?.setState(8)}},N=class extends l{constructor(e){super("JUMPING RIGHT"),this.player=e}enter(){this.player.frameY=2,this.player?.onGround()&&(this.player.vy-=20),this.player.speed=this.player.maxSpeed*.5,this.player.maxFrame=6}handleInput(e){super.handleInput(e),e==="PRESS Left"?this.player?.setState(6):this.player?.onGround()?this.player.setState(1):this.player.vy>0&&this.player?.setState(9)}},A=class extends l{constructor(e){super("FALLING LEFT"),this.player=e}enter(){this.player.frameY=5}handleInput(e){super.handleInput(e),e==="PRESS Right"?this.player?.setState(9):this.player?.onGround()&&this.player.setState(0)}},D=class extends l{constructor(e){super("FALLING RIGHT"),this.player=e}enter(){this.player.frameY=4}handleInput(e){super.handleInput(e),e==="PRESS LEFT"?this.player?.setState(8):this.player?.onGround()&&this.player.setState(1)}};var S=class{gameWidth;gameHeight;states;currentState;image;width;height;x;y;vy;weight;frameX;frameY;maxFrame;speed;maxSpeed;fps;frameTimer;frameInterval;constructor(e,a){this.gameWidth=e,this.gameHeight=a,this.states=[new b(this),new T(this),new R(this),new v(this),new L(this),new G(this),new k(this),new N(this),new A(this),new D(this)],this.currentState=this.states[1],this.image=document.getElementById("dogImage"),this.width=200,this.height=181.83,this.x=this.gameWidth/2-this.width/2,this.y=this.gameHeight-this.height,this.vy=0,this.weight=.5,this.frameX=0,this.frameY=0,this.maxFrame=6,this.speed=0,this.maxSpeed=10,this.fps=120,this.frameTimer=0,this.frameInterval=1e3/this.fps}update(e){this.currentState.handleInput(e),this.x+=this.speed,this.x<=0?this.x=0:this.x>=this.gameWidth-this.width&&(this.x=this.gameWidth-this.width),this.y+=this.vy,this.onGround()?this.vy=0:this.vy+=this.weight,this.y>this.gameHeight-this.height&&(this.y=this.gameHeight-this.height)}onGround(){return this.y>=this.gameHeight-this.height}draw(e,a){this.frameTimer>this.frameInterval?(this.frameX<this.maxFrame?this.frameX++:this.frameX=0,this.frameTimer=0):this.frameTimer+=a,e.drawImage(this.image,this.width*this.frameX,this.height*this.frameY,this.width,this.height,this.x,this.y,this.width,this.height)}setState(e){e>=0&&e<this.states.length?(this.currentState=this.states[e],this.currentState.enter()):console.error("Invalid state index")}};function Q(i,e,a){i.font="28px Helvetica",i.fillStyle="white",i.fillText("Last input: "+e.lastKey,20,40),i.fillText("Active State: "+a.currentState.state,20,80)}function B(i){document.title="State Management in Game",i.innerHTML=`
        <div class=${w.container}>
            <h1 class='${w.title}'>Animation States</h1>
            <a class='${w.navigate}' href='/'>Home<a>
            <div>
                <canvas id='canvas' class=${w.canvas}></canvas>
                <img id='dogImage' src='dog.png' alt='dog image'>
                <h1 class='${w.loading}' id='loading'>LOADING...</h1>
            </div>
        </div>
    `,window.addEventListener("load",()=>{let e=document.getElementById("loading");e.style.display="none";let a=document.getElementById("canvas"),n=a.getContext("2d");a.width=window.innerWidth,a.height=window.innerHeight;let h=new S(a.width,a.height),m=new x,u=0;function _(I){let c=I-u;u=I,n?.clearRect(0,0,a.width,a.height),h.update(m.lastKey),h.draw(n,c),Q(n,m,h),requestAnimationFrame(_)}_(0)})}var ce="Dodge-module__backgroundImage_UtEIBq__100",ge="Dodge-module__dodge_UtEIBq__100",fe="Dodge-module__dodger_UtEIBq__100",ye="Dodge-module__enemyImage_UtEIBq__100",_e="Dodge-module__fullscreen_UtEIBq__100",Ie="Dodge-module__playerImage_UtEIBq__100",p={backgroundImage:ce,dodge:ge,dodger:fe,enemyImage:ye,fullscreen:_e,playerImage:Ie};function C(i){document.title="TypeScript 2D Game",i.innerHTML=`
        <div class='${p.dodger}'>
        <a class='${p.navigate}' href='/'>Home</a>
        <h1 class='${p.title}'>Dog Dodger</h1>
            <canvas id='canvas' class='${p.dodge}'>
            </canvas>
            <img id='playerImage' class='${p.playerImage}' src='player.png'>
            <img id='backgroundImage' class='${p.backgroundImage}' src='background_single.png'>
            <img id='enemyImage' class='${p.enemyImage}' src='enemy_1.png'>
            <button id='fullscreen' class=${p.fullscreen}>Toggle FullScreen</button>
        </div>
    `,window.addEventListener("load",()=>{let e=document.getElementById("canvas"),a=e.getContext("2d");e.width=1300,e.height=520;let n=[],h=0,m=!1,u=document.getElementById("fullscreen");class _{keys;touchY;touchTreshold;touchStartX;touchStartY;constructor(){this.keys={},this.touchY=0,this.touchTreshold=30,window.addEventListener("keydown",t=>{if(["ArrowDown","ArrowUp","ArrowLeft","ArrowRight"].includes(t.key))this.keys[t.key]=!0;else if(t.key==="Enter"&&m){P(),console.log("enter pressed");return}}),window.addEventListener("keyup",t=>{["ArrowDown","ArrowUp","ArrowLeft","ArrowRight"].includes(t.key)&&(this.keys[t.key]=!1)}),window.addEventListener("touchstart",t=>{this.touchY=t.changedTouches[0].pageY}),window.addEventListener("touchstart",t=>{this.touchStartX=t.changedTouches[0].pageX,this.touchStartY=t.changedTouches[0].pageY,this.touchY=t.changedTouches[0].pageY}),window.addEventListener("touchmove",t=>{let r=t.changedTouches[0].pageX-this.touchStartY,d=t.changedTouches[0].pageY-this.touchStartY;Math.abs(r)>Math.abs(d)?r<-this.touchTreshold?(this.keys["swipe left"]=!0,this.keys["swipe right"]=!1):r>this.touchTreshold&&(this.keys["swipe right"]=!0,this.keys["swipe left"]=!1):d<-this.touchTreshold?(this.keys["swipe up"]=!0,this.keys["swipe down"]=!1):d>this.touchTreshold&&(this.keys["swipe down"]=!0,this.keys["swipe up"]=!1)}),window.addEventListener("touchend",t=>{let d=t.changedTouches[0].pageX-this.touchStartX,E=t.changedTouches[0].pageY-this.touchStartY;Math.abs(d)<10&&Math.abs(E)<10?(this.keys["swipe down"]=!0,m&&P()):this.keys["swipe down"]=!1}),window.addEventListener("touchend",()=>{this.keys["swipe up"]=!1,this.keys["swipe down"]=!1,this.keys["swipe left"]=!1,this.keys["swipe right"]=!1}),window.addEventListener("touchend",()=>{this.keys["swipe up"]=!1,this.keys["swipe down"]=!1,this.keys.tap=!1})}isKeyPressed(t){return!!this.keys[t]}}class I{gameWidth;gameHeight;width;height;x;y;image;frameX;maxFrame;frameY;speed;vy;gravity;fps;frameTimer;frameInterval;constructor(t,r){this.gameWidth=t,this.gameHeight=r,this.width=200,this.height=200,this.image=document.getElementById("playerImage"),this.reset()}reset(){this.x=100,this.y=this.gameHeight-this.height,this.frameX=0,this.maxFrame=8,this.frameY=0,this.speed=0,this.vy=0,this.gravity=1,this.fps=20,this.frameTimer=0,this.frameInterval=1e3/this.fps}draw(t){t.drawImage(this.image,this.frameX*this.width,this.frameY*this.height,this.width,this.height,this.x,this.y,this.width,this.height)}move(t,r,d){this.handleCollision(d),this.animateSprite(r,t.isKeyPressed("ArrowLeft")||t.isKeyPressed("swipe left")),this.handleInput(t,r),this.updatePosition()}handleCollision(t){for(let r of t){let d=this.x+this.width/3-(r.x+r.width/2),E=this.y+this.height/2-(r.y+r.height/2),J=(Math.min(this.width,this.height)+Math.min(r.width,r.height))/3,O=d**2+E**2;if(O<J**2){let Y=Math.sqrt(O),j=(J-Y)/2,ne=j*(d/Y),oe=j*(E/Y);this.x-=ne,this.y-=oe,m=!0}}}animateSprite(t,r){this.frameTimer>this.frameInterval?(r?this.frameX=(this.frameX-1+this.maxFrame)%this.maxFrame:this.frameX=(this.frameX+1)%this.maxFrame,this.frameTimer=0):this.frameTimer+=t}handleInput(t,r){this.speed=t.isKeyPressed("ArrowRight")||t.isKeyPressed("swipe right")?5:t.isKeyPressed("ArrowLeft")||t.isKeyPressed("swipe left")?-5:0,(t.isKeyPressed("ArrowUp")&&this.onGround()||t.isKeyPressed("swipe up")&&this.onGround())&&(this.vy-=30),t.isKeyPressed("swipe down")&&m&&P(),this.animateSprite(r,t.isKeyPressed("ArrowLeft")||t.isKeyPressed("swipe left"))}updatePosition(){this.x+=this.speed,this.x=Math.max(0,Math.min(this.x,this.gameWidth-this.width)),this.y+=this.vy,this.onGround()?(this.vy=0,this.maxFrame=8,this.frameY=0):(this.vy+=this.gravity,this.maxFrame=5,this.frameY=1),this.y=Math.min(this.y,this.gameHeight-this.height)}onGround(){return this.y>=this.gameHeight-this.height}}class c{gameWidth;gameHeight;image;x;y;width;height;speed;constructor(t,r){this.gameWidth=t,this.gameHeight=r,this.image=document.getElementById("backgroundImage"),this.x=0,this.y=0,this.width=1900,this.height=520,this.speed=5}restart(){this.x=0}draw(t){t.drawImage(this.image,this.x,this.y,this.width,this.height),t.drawImage(this.image,this.x+this.width-this.speed,this.y,this.width,this.height)}update(){this.x-=this.speed,this.x<0-this.width&&(this.x=0)}}class g{gameWidth;gameHeight;width;height;image;x;y;frameX;maxFrame;fps;frameTimer;frameInterval;speed;markedForDeletion;constructor(t,r){this.gameWidth=t,this.gameHeight=r,this.width=160,this.height=119,this.image=document.getElementById("enemyImage"),this.x=this.gameWidth,this.y=this.gameHeight-this.height,this.frameX=0,this.maxFrame=5,this.fps=20,this.frameTimer=0,this.frameInterval=1e3/this.fps,this.speed=8,this.markedForDeletion=!1}draw(t){t.drawImage(this.image,this.frameX*this.width,0,this.width,this.height,this.x,this.y,this.width,this.height)}move(t){this.frameTimer>this.frameInterval?(this.frameX>=this.maxFrame?this.frameX=0:this.frameX++,this.frameTimer=0):this.frameTimer+=t,this.x-=this.speed,this.x<0-this.width&&(this.markedForDeletion=!0,h++)}}let f=0;function y(s){U>ae+re?(n.push(new g(e.width,e.height)),U=0,f>60&&(ee(),f=0)):U+=s,n.forEach(t=>{t.draw(a),t.move(s)}),n=n.filter(t=>!t.markedForDeletion),f+=s}function ee(){n.forEach(s=>{s.speed+=7})}function te(s){s.textAlign="left",s.font="50px Helvetica",s.fillStyle="white",s.fillText(`Score: ${h}`,50,50),s.save(),s.fillStyle="black",s.fillText(`Score: ${h}`,52,52),m&&(s.textAlign="center",s.fillStyle="black",s.fillText("GAME OVER, TRY AGAIN! :D",e.width/2,200),s.translate(2,2),s.fillStyle="white",s.fillText("GAME OVER, TRY AGAIN! :D",e.width/2,200)),s.restore()}function P(){F.reset(),M.restart(),n=[],h=0,m=!1,W(0)}function ie(){document.fullscreenElement?document.exitFullscreen():e.requestFullscreen().catch(s=>alert(`Cannot Enable Fullscreen mode : ${s.message}`))}u.addEventListener("click",ie);let se=new _,F=new I(e.width,e.height),M=new c(e.width,e.height),V=0,U=0,ae=1e3,re=Math.random()*1e3+500;function W(s){let t=s-V;V=s,a.clearRect(0,0,e.width,e.height),M.draw(a),M.update(),F.draw(a),F.move(se,t,n),y(t),te(a),m||requestAnimationFrame(W)}W(0)})}var we="Intro-module__container_nV6iiW__100",xe="Intro-module__items_nV6iiW__100",X={container:we,items:xe};function z(i){document.title="TypeScript Intro Games",i.innerHTML=`
    <div class='${X.container}'>
      <h1>Vanilla TS Games Menu</h1>
      <p>Vanilla TypeScript Single Page Routing Games</p>
      <div class=${X.items}>
        <a href='/game1'>Dog Dodge Game Basics</a>
        <a href='/game2'>Dog Dodge Game Managing States</a>
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
  `}function K(i){i.innerHTML=`
    <div>
      <h1>NotFound</h1>
    </div>
  `}var H=class{routes=[];constructor(e){this.routes=e,window.addEventListener("popstate",this.handlePopState.bind(this)),this.handlePopState()}handlePopState(){let e=window.location.pathname,a=this.findMatchingRoute(e,this.routes);if(a){let n=document.createElement("div");a.element(n)}else{let n=this.findMatchingRoute("*",this.routes);if(n){let h=document.createElement("div");n.element(h)}}}findMatchingRoute(e,a){for(let n of a){let h=n.path;if(h==="*")return n;{let u=[],_=h.replace(/:[^\s/]+/g,g=>(u.push(g.substring(1)),"([^\\s/]+)")),I=new RegExp(`^${_}(?:/|$)`),c=e.match(I);if(c){let g={};if(u.forEach((f,y)=>{g[f]=c[y+1]}),n.children){let f=e.slice(c[0].length),y=this.findMatchingRoute(f,n.children);if(y)return y.params=g,y}return{...n,params:g}}}}}navigate(e){history.pushState(null,"",e),this.handlePopState()}};function q(i){new H([{path:"/",element:()=>z(i),errorElement:()=>{}},{path:"/game1",element:()=>C(i),errorElement:()=>{}},{path:"/game2",element:()=>B(i),errorElement:()=>{}},{path:"*",element:()=>K(i)}]).navigate("")}function $(i){i.innerHTML=`
    <div>
        <div id='router'></div>
    </div>
  `;let e=document.getElementById("router");q(e)}var Z=document.getElementById("app");Z&&$(Z);
