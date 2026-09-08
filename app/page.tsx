'use client';
import { useEffect, useRef, useState } from 'react';
import { Sword, Shield, Sparkles, Pause, Play, RotateCcw } from 'lucide-react';
type Enemy = { x: number; y: number; hp: number; wind: number; flash: number };
type Bolt = { x: number; y: number };
type Mode = 'ready' | 'playing' | 'paused' | 'won' | 'lost';
export default function Home() {
 const canvas=useRef<HTMLCanvasElement>(null);
 const game=useRef({mode:'ready' as Mode,hp:5,stamina:100,time:0,kills:0,blocks:0,enemies:[] as Enemy[],bolts:[] as Bolt[],spawn:1,shot:0,slash:0,cooldown:0,hurt:0,broken:false,notice:'',noticeTime:0});
 const input=useRef({left:new Set<number>(),right:new Map<number,number>()});
 const [hud,setHud]=useState({mode:'ready' as Mode,hp:5,stamina:100,time:0,kills:0,blocks:0,shield:false,shooting:false,broken:false,notice:''});
 function release(){input.current.left.clear();input.current.right.clear();}
 function start(){release();Object.assign(game.current,{mode:'playing',hp:5,stamina:100,time:0,kills:0,blocks:0,enemies:[],bolts:[],spawn:1,shot:0,slash:0,cooldown:0,hurt:0,broken:false,notice:'',noticeTime:0});}
 function pause(){if(game.current.mode==='playing'){game.current.mode='paused';release();}}
 function swing(){const g=game.current;if(g.mode!=='playing'||input.current.left.size||g.cooldown>0)return;g.slash=.22;g.cooldown=.29;g.enemies.forEach(e=>{if(e.y>430){e.hp-=2;e.flash=.15;}});}
 useEffect(()=>{
  let frame=0,last=performance.now();
  const onBlur=()=>pause();
  const keyDown=(e:KeyboardEvent)=>{if(e.code==='Escape'){pause();return;}if(e.code!=='Space'&&!e.code.startsWith('Shift'))return;e.preventDefault();if(e.repeat||game.current.mode!=='playing')return;if(e.code==='Space')input.current.right.set(-1,performance.now());else input.current.left.add(-2);};
  const keyUp=(e:KeyboardEvent)=>{if(e.code==='Space'){const at=input.current.right.get(-1);input.current.right.delete(-1);if(at!==undefined&&performance.now()-at<230)swing();}if(e.code.startsWith('Shift'))input.current.left.delete(-2);};
  window.addEventListener('blur',onBlur);document.addEventListener('visibilitychange',onBlur);window.addEventListener('keydown',keyDown);window.addEventListener('keyup',keyUp);
  const tick=(now:number)=>{
   const dt=Math.min((now-last)/1000,.04);last=now;const g=game.current;
   let shield=input.current.left.size>0&&!g.broken&&g.stamina>0;
   const shooting=!input.current.left.size&&[...input.current.right.values()].some(t=>now-t>=230);
   if(g.mode==='playing'){
    g.time+=dt;g.shot-=dt;g.slash=Math.max(0,g.slash-dt);g.cooldown-=dt;g.hurt=Math.max(0,g.hurt-dt);g.noticeTime-=dt;
    g.stamina=Math.max(0,Math.min(100,g.stamina+(shield?-24:19)*dt));
    if(g.stamina<=0){g.broken=true;shield=false;}
    if(g.broken&&g.stamina>=35&&!input.current.left.size)g.broken=false;
    if(shooting&&g.shot<=0){g.bolts.push({x:200,y:510});g.shot=.24;}
    g.spawn-=dt;if(g.spawn<=0&&g.time<60){g.enemies.push({x:145+Math.random()*110,y:-25,hp:3,wind:-1,flash:0});g.spawn=Math.max(1.35,3.3-g.time*.032);}
    for(const b of g.bolts){b.y-=470*dt;const target=g.enemies.find(e=>e.hp>0&&Math.abs(e.y-b.y)<27&&Math.abs(e.x-b.x)<35);if(target){target.hp-=.7;target.flash=.1;b.y=-100;}}
    for(const e of g.enemies){e.flash=Math.max(0,e.flash-dt);if(e.hp<=0)continue;if(e.y<470){e.y+=(65+g.time*.45)*dt;e.x+=(200-e.x)*dt*.9;}else if(e.wind<0)e.wind=.8;else{e.wind-=dt;if(e.wind<=0){if(shield&&g.stamina>=15){g.stamina-=15;g.blocks++;g.notice='BLOCKED';}else{g.hp--;g.hurt=.25;g.notice='HIT';}g.noticeTime=.65;e.y=380;e.wind=-1;}}}
    g.kills+=g.enemies.filter(e=>e.hp<=0).length;g.enemies=g.enemies.filter(e=>e.hp>0);g.bolts=g.bolts.filter(b=>b.y>-30);
    if(g.hp<=0){g.hp=0;g.mode='lost';release();}else if(g.time>=60&&!g.enemies.length){g.mode='won';release();}
   }
   const ctx=canvas.current?.getContext('2d');if(ctx){
    ctx.clearRect(0,0,400,610);ctx.fillStyle='#101e25';ctx.fillRect(0,0,400,610);const scroll=g.time*40%80;ctx.strokeStyle='#27363b';ctx.lineWidth=1;
    for(let y=-80;y<630;y+=80){ctx.beginPath();ctx.moveTo(64,y+scroll);ctx.lineTo(336,y+scroll);ctx.stroke();}for(const x of [64,132,200,268,336]){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,610);ctx.stroke();}
    ctx.fillStyle='#0b171d';ctx.fillRect(0,0,60,610);ctx.fillRect(340,0,60,610);ctx.fillStyle='#65704b';for(let y=-80;y<630;y+=80){ctx.fillRect(49,y+scroll,4,24);ctx.fillRect(347,y+scroll+30,4,24);}
    ctx.strokeStyle='#ddc58a22';ctx.setLineDash([5,8]);ctx.beginPath();ctx.arc(200,535,108,Math.PI,Math.PI*2);ctx.stroke();ctx.setLineDash([]);ctx.textAlign='center';
    for(const b of g.bolts){ctx.shadowColor='#8feaff';ctx.shadowBlur=17;ctx.fillStyle='#c5f7ff';ctx.beginPath();ctx.ellipse(b.x,b.y,5,13,0,0,7);ctx.fill();ctx.shadowBlur=0;}
    for(const e of g.enemies){ctx.fillStyle='#0005';ctx.beginPath();ctx.ellipse(e.x,e.y+20,22,8,0,0,7);ctx.fill();ctx.font='37px system-ui';ctx.fillText('👹',e.x,e.y+12);ctx.fillStyle='#33444a';ctx.fillRect(e.x-18,e.y-32,36,4);ctx.fillStyle=e.flash?'#fff':'#de8c74';ctx.fillRect(e.x-18,e.y-32,36*Math.max(0,e.hp)/3,4);if(e.wind>=0){ctx.strokeStyle='#ff8069';ctx.lineWidth=3;ctx.beginPath();ctx.arc(e.x,e.y,31,0,Math.PI*2*(1-e.wind/.8));ctx.stroke();ctx.fillStyle='#ffb39e';ctx.font='bold 22px system-ui';ctx.fillText('!',e.x,e.y-43);}}
    ctx.fillStyle='#0006';ctx.beginPath();ctx.ellipse(200,557,26,10,0,0,7);ctx.fill();ctx.font='45px system-ui';ctx.fillText('🧙',200,552);
    if(shield&&g.mode==='playing'){ctx.strokeStyle='#89dcef';ctx.lineWidth=5;ctx.shadowColor='#89dcef';ctx.shadowBlur=15;ctx.beginPath();ctx.arc(200,540,45,Math.PI*1.12,Math.PI*1.88);ctx.stroke();ctx.shadowBlur=0;}
    if(g.slash>0){ctx.strokeStyle=`rgba(255,224,159,${g.slash/.22})`;ctx.lineWidth=15;ctx.beginPath();ctx.arc(200,535,95,Math.PI*1.03,Math.PI*1.97);ctx.stroke();}
    if(g.hurt>0){ctx.fillStyle=`rgba(230,70,50,${g.hurt})`;ctx.fillRect(0,0,400,610);}
   }
   setHud({mode:g.mode,hp:g.hp,stamina:g.stamina,time:g.time,kills:g.kills,blocks:g.blocks,shield,shooting,broken:g.broken,notice:g.noticeTime>0?g.notice:''});frame=requestAnimationFrame(tick);
  };frame=requestAnimationFrame(tick);
  return()=>{cancelAnimationFrame(frame);window.removeEventListener('blur',onBlur);document.removeEventListener('visibilitychange',onBlur);window.removeEventListener('keydown',keyDown);window.removeEventListener('keyup',keyUp);};
 },[]);
 useEffect(()=>{
  type Tool = { name:string; description:string; inputSchema:object; annotations:object; execute:(input:unknown)=>unknown };
  const context=(document as Document & {modelContext?:{registerTool:(tool:Tool,options:{signal:AbortSignal})=>void|Promise<void>}}).modelContext;
  if(!context?.registerTool)return;
  const lifecycle=new AbortController();
  try{void Promise.resolve(context.registerTool({name:'read_trial_status',description:'Read the current combat trial status, health, stamina, defeated enemies and blocks.',inputSchema:{type:'object',properties:{},additionalProperties:false},annotations:{readOnlyHint:true},execute:(input)=>{if(!input||typeof input!=='object'||Array.isArray(input)||Object.keys(input).length)throw new Error('Expected an empty object');const g=game.current;return {status:g.mode,health:g.hp,stamina:Math.round(g.stamina),seconds:Math.floor(g.time),defeated:g.kills,blocked:g.blocks};}},{signal:lifecycle.signal})).catch(()=>{});}catch{}
  return()=>lifecycle.abort();
 },[]);
 const down=(side:'left'|'right',e:React.PointerEvent<HTMLButtonElement>)=>{e.preventDefault();if(game.current.mode!=='playing')return;e.currentTarget.setPointerCapture(e.pointerId);if(side==='left')input.current.left.add(e.pointerId);else input.current.right.set(e.pointerId,performance.now());};
 const up=(side:'left'|'right',e:React.PointerEvent<HTMLButtonElement>,cancelled=false)=>{e.preventDefault();if(side==='left')input.current.left.delete(e.pointerId);else{const at=input.current.right.get(e.pointerId);input.current.right.delete(e.pointerId);if(!cancelled&&at!==undefined&&performance.now()-at<230)swing();}};
 return <main><div className="desktop-note"><span className="eyebrow">PLAYABLE PROTOTYPE · 01</span><h1>Runeblade</h1><p>A sword. A spell.<br/>One minute to survive.</p><div className="key-hint">On desktop<br/><b>Space</b> Tap / hold to attack<br/><b>Shift</b> Hold to shield</div></div><section className="game" aria-label="Runeblade combat game">
 <header><div><span className="eyebrow">RUNEBLADE</span><span className="chapter">The first trial</span></div><button className="icon-button" onClick={pause} disabled={hud.mode!=='playing'} aria-label="Pause game"><Pause size={20}/></button></header>
 <div className="stats"><div><span className="stat-label">VITALITY</span><div className="hearts" aria-label={`${hud.hp} of 5 health`}>{[1,2,3,4,5].map(n=><span className={n<=hud.hp?'full':''} key={n}>◆</span>)}</div></div><div className="time"><b>{Math.max(0,60-Math.floor(hud.time))}<small>s</small></b><span className="stat-label">{hud.time>=60?'CLEAR THE PATH':'SURVIVE'}</span></div><div className="defeated"><b>{String(hud.kills).padStart(2,'0')}</b><span className="stat-label">DEFEATED</span></div></div>
 <div className="arena"><canvas ref={canvas} width="400" height="610" aria-label="Your hero stands at the bottom. Enemies approach from the top."/><div className="feedback" aria-live="polite">{hud.notice}</div>
 {hud.mode!=='playing'&&<div className="overlay"><div className="start-card"><span className="crest"><Sword size={30}/></span><span className="eyebrow">{hud.mode==='ready'?'COMBAT TRIAL · 01':hud.mode==='paused'?'TAKE A BREATH':'TRIAL COMPLETE'}</span><h2>{hud.mode==='ready'?'Hold your ground.':hud.mode==='paused'?'Paused':hud.mode==='won'?'Path cleared.':'Rise again.'}</h2><p>{hud.mode==='ready'?'Enemies approach from above. Shoot at a distance, slash up close, and block when they flash red.':hud.mode==='paused'?'Your run is waiting for you.':`${hud.kills} enemies defeated · ${hud.blocks} attacks blocked`}</p>{hud.mode==='ready'&&<div className="instructions"><span><Sword size={18}/> Tap right to slash</span><span><Sparkles size={18}/> Hold right to cast</span><span><Shield size={18}/> Hold left to block</span></div>}<button className="primary" onClick={()=>hud.mode==='paused'?(game.current.mode='playing'):start()}>{hud.mode==='ready'?<Play size={18}/>:<RotateCcw size={18}/>} {hud.mode==='ready'?'Begin trial':hud.mode==='paused'?'Resume trial':'Try again'}</button><span className="footnote">{hud.mode==='ready'?'Survive 60 seconds, then defeat the remaining enemies.':'Sword · Magic · Shield'}</span></div></div>}
 </div><footer><div className="stamina-label"><span>{hud.broken?'SHIELD EXHAUSTED — RELEASE TO RECOVER':'SHIELD STAMINA'}</span><span>{Math.round(hud.stamina)}%</span></div><meter min="0" max="100" value={hud.stamina} aria-label="Shield stamina"/><div className="controls">{(['left','right'] as const).map(side=><button key={side} disabled={hud.mode!=='playing'} className={`combat ${side} ${(side==='left'?hud.shield:hud.shooting)?'active':''}`} onContextMenu={e=>e.preventDefault()} onPointerDown={e=>down(side,e)} onPointerUp={e=>up(side,e)} onPointerCancel={e=>up(side,e,true)} onLostPointerCapture={e=>up(side,e,true)} aria-label={side==='left'?'Hold for shield':'Tap for sword, hold for magical bolts'}>{side==='left'?<Shield size={26}/>:<Sword size={26}/>}<b>{side==='left'?'Shield':hud.shooting?'Casting':'Attack'}</b><span>{side==='left'?'HOLD TO BLOCK':'TAP SWORD · HOLD MAGIC'}</span></button>)}</div><div className="stage-label">STAGE 01 / COMBAT TEST</div></footer></section></main>;
}

