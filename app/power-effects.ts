export type PowerCelebration={kind:string;x:number;y:number;age:number};
type Palette=Record<string,{name:string;icon:string;color:string}>;
const TAU=Math.PI*2;
export function drawPowerEffects(ctx:CanvasRenderingContext2D,time:number,buffs:Record<string,number>,fades:Record<string,number>,pickups:PowerCelebration[],palette:Palette,slash:number){
 const ring=(x:number,y:number,rx:number,ry=rx)=>{ctx.beginPath();ctx.ellipse(x,y,rx,ry,0,0,TAU);ctx.stroke();};
 const path=(points:number[][],fill=false)=>{ctx.beginPath();points.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));if(fill){ctx.closePath();ctx.fill();}else ctx.stroke();};
 const spark=(x:number,y:number,r:number)=>{path([[x,y-r],[x+r*.3,y-r*.3],[x+r,y],[x+r*.3,y+r*.3],[x,y+r],[x-r*.3,y+r*.3],[x-r,y],[x-r*.3,y-r*.3]],true);};
 const blade=(x:number,y:number,a:number)=>{ctx.save();ctx.translate(x,y);ctx.rotate(a);path([[0,-20],[4,-11],[3,6],[-3,6],[-4,-11]],true);ctx.strokeStyle='#fff2c6';ctx.lineWidth=1;path([[0,-16],[0,4]]);ctx.lineWidth=2;path([[-7,7],[7,7]]);path([[0,7],[0,14]]);ctx.restore();};
 for(const key of new Set([...Object.keys(buffs),...Object.keys(fades)])){
  const remaining=buffs[key]??0,p=palette[key];if(!p)continue;
  // Expiry breathes gently instead of rapidly flashing; removed powers fade away.
  const opacity=Math.max(0,Math.min(1,remaining>0?Math.min(1,remaining/.4)*(remaining<3?.65+.35*(.5+.5*Math.sin(time*4)):1):(fades[key]??0)/.45));
  ctx.save();ctx.globalAlpha=opacity;ctx.strokeStyle=p.color;ctx.fillStyle=p.color;ctx.shadowColor=p.color;ctx.shadowBlur=7;ctx.lineWidth=1.8;ctx.lineCap='round';ctx.lineJoin='round';
  if(key==='guardian'){
   const a=time*1.6,x=200+Math.cos(a)*48,y=503+Math.sin(a)*20;
   // A winged companion with a face, halo and trailing spirit motes.
   ctx.save();ctx.translate(x,y);ctx.globalAlpha=opacity*.65;
   path([[-4,0],[-20,-10],[-16,3],[-7,8]],true);path([[4,0],[20,-10],[16,3],[7,8]],true);
   ctx.globalAlpha=opacity;ctx.fillStyle='#eaffef';ctx.beginPath();ctx.ellipse(0,0,6,9,0,0,TAU);ctx.fill();path([[-5,5],[0,19+Math.sin(time*5)*3],[5,5]],true);
   ctx.strokeStyle=p.color;ring(0,-14,8,3);ctx.shadowBlur=0;ctx.fillStyle='#295645';ctx.fillRect(-3,-2,1.5,2);ctx.fillRect(2,-2,1.5,2);ctx.restore();
   for(let i=1;i<=4;i++){ctx.globalAlpha=opacity*(1-i/5)*.5;const t=a-i*.15;spark(200+Math.cos(t)*48,503+Math.sin(t)*20,3);}
  }else if(key==='frost'){
   ctx.globalAlpha=opacity*.25;ctx.fillStyle=p.color;ctx.beginPath();ctx.ellipse(200,535,82,29,0,0,TAU);ctx.fill();ctx.globalAlpha=opacity*.75;ring(200,535,82,29);
   for(let i=0;i<8;i++){const a=i*TAU/8+time*.18,x=200+Math.cos(a)*77,y=535+Math.sin(a)*27;ctx.save();ctx.translate(x,y);ctx.rotate(a);ctx.globalAlpha=opacity*.75;path([[0,-10],[4,-2],[0,5],[-4,-2]],true);ctx.strokeStyle='#f2ffff';ctx.lineWidth=1;path([[0,-7],[0,2]]);ctx.restore();}
   for(let i=0;i<6;i++){const f=(time*.65+i/6)%1;ctx.globalAlpha=opacity*(1-f)*.7;spark(150+i*19,530-f*35,2.5);}
  }else if(key==='magnet'){
   for(let i=0;i<8;i++){const f=(time*.8+i/8)%1,a=i*2.4,r=90*(1-f)+12;ctx.globalAlpha=opacity*Math.sin(f*Math.PI)*.8;const x=200+Math.cos(a)*r,y=536+Math.sin(a)*r*.4;ctx.beginPath();ctx.ellipse(x,y,3,4,0,0,TAU);ctx.fill();ctx.strokeStyle='#fff4ba';path([[x-1,y-2],[x-1,y+2]]);ctx.strokeStyle=p.color;}
   ctx.globalAlpha=opacity*.5;ring(200,536,44,16);
  }else if(key==='guard'){
   ctx.save();ctx.translate(177,512);ctx.globalAlpha=opacity*.16;
   path([[-24,-29],[0,-36],[24,-29],[21,7],[0,28],[-21,7]],true);
   ctx.globalAlpha=opacity*.85;path([[-24,-29],[0,-36],[24,-29],[21,7],[0,28],[-21,7],[-24,-29]]);
   ctx.globalAlpha=opacity*.45;path([[-17,-24],[0,-29],[17,-24],[14,3],[0,18],[-14,3],[-17,-24]]);
   ctx.globalAlpha=opacity;path([[0,-20],[0,10]]);path([[-11,-8],[11,-8]]);spark(0,-8,4);ctx.restore();
  }else if(key==='storm'){
   // Arcane sigil and three luminous satellites, separate from chain lightning.
   ctx.globalAlpha=opacity*.55;ring(220,503,28,13);
   for(let i=0;i<3;i++){const a=time*2.8+i*TAU/3,x=220+Math.cos(a)*28,y=503+Math.sin(a)*13;ctx.globalAlpha=opacity;ctx.fillStyle='#f1e8ff';spark(x,y,5);ctx.fillStyle=p.color;ctx.globalAlpha=opacity*.55;path([[x,y],[220+Math.cos(a-.22)*28,503+Math.sin(a-.22)*13]]);}
   ctx.globalAlpha=opacity*.5;path([[220,484],[233,503],[220,522],[207,503],[220,484]]);
  }else if(key==='chain'){
   // Crawling bolts stay beside the hero so hostile orange projectiles stand out.
   for(const side of [-1,1]){const phase=time*9+side;ctx.globalAlpha=opacity*(.6+.2*Math.sin(phase));path([[200+side*36,488],[200+side*(43+Math.sin(phase)*3),499],[200+side*34,510],[200+side*45,521],[200+side*37,533]]);ctx.globalAlpha=opacity*.9;spark(200+side*37,533,3);}
  }else if(key==='flame'){
   // Layered flame tongues with bright cores, rising from the sword hand.
   for(let i=0;i<7;i++){const f=(time*1.3+i/7)%1,x=224+Math.sin(i*2.1+time*4)*7,y=505-f*48,r=6*(1-f)+1;ctx.globalAlpha=opacity*(1-f)*.85;ctx.fillStyle=i%2?'#ffb34d':p.color;path([[x-r,y+5],[x-r*.7,y-6],[x+2,y-17],[x+r,y-3],[x+r*.6,y+5]],true);ctx.fillStyle='#fff0ac';path([[x-2,y+3],[x,y-7],[x+2,y+3]],true);}
   ctx.fillStyle=p.color;for(let i=0;i<4;i++){const f=(time*.8+i/4)%1;ctx.globalAlpha=opacity*(1-f)*.7;spark(212+i*6,488-f*49,1.8);}
  }else if(key==='frenzy'){
   // Always visible while active, with additional swept trails during slashes.
   for(const side of [-1,1]){ctx.globalAlpha=opacity*.7;blade(200+side*44,523+Math.sin(time*5+side)*3,side*.35);}
   if(slash>0)for(let i=0;i<3;i++){ctx.strokeStyle=p.color;ctx.globalAlpha=opacity*(1-i/3)*Math.min(1,slash/.22)*.5;ctx.lineWidth=3;ctx.beginPath();ctx.arc(200,535,112+i*7,Math.PI*1.08,Math.PI*1.92);ctx.stroke();}
  }
  ctx.restore();
 }
 for(const pickup of pickups){
  const p=palette[pickup.kind];if(!p)continue;const t=pickup.age;ctx.save();ctx.textAlign='center';ctx.strokeStyle=p.color;ctx.fillStyle=p.color;
  if(t<.4){const f=Math.max(0,t/.4);ctx.save();ctx.translate(pickup.x+(200-pickup.x)*f,pickup.y+(510-pickup.y)*f-18*Math.sin(f*Math.PI));ctx.scale(1-f*.8,1-f*.8);ctx.shadowColor=p.color;ctx.shadowBlur=12;ctx.lineWidth=2;ring(0,0,18);ctx.font='bold 23px system-ui';ctx.fillText(p.icon,0,8);ctx.restore();}
  if(t>.15&&t<1){const f=(t-.15)/.85;ctx.globalAlpha=(1-f)*.75;ctx.lineWidth=3*(1-f)+1;ring(200,532,20+f*65,8+f*24);for(let i=0;i<10;i++){const a=i*TAU/10,r=18+f*60;spark(200+Math.cos(a)*r,518+Math.sin(a)*r*.65-f*14,3*(1-f)+1);}}
  if(pickup.kind==='heal'){ctx.globalAlpha=Math.max(0,1-t/1.4);ctx.shadowColor=p.color;ctx.shadowBlur=8;for(let i=0;i<3;i++){const x=183+i*17,y=515-t*44-i*9;ctx.fillRect(x-2,y-7,4,14);ctx.fillRect(x-7,y-2,14,4);}}
  ctx.restore();
 }
 // Only the newest pickup gets a label; simultaneous effects remain bounded.
 const latest=pickups[pickups.length-1];if(latest){const p=palette[latest.kind];if(!p)return;const t=latest.age;ctx.save();ctx.translate(200,453-Math.min(1,t/.25)*9);ctx.globalAlpha=Math.max(0,Math.min(1,t/.1,(1.5-t)/.35));ctx.textAlign='center';ctx.font='bold 15px system-ui';const label=p.name.toUpperCase(),w=ctx.measureText(label).width+32;ctx.fillStyle='#10202fee';ctx.strokeStyle=p.color;ctx.lineWidth=1;ctx.beginPath();ctx.roundRect(-w/2,-20,w,30,8);ctx.fill();ctx.stroke();ctx.fillStyle=p.color;ctx.fillText(label,0,0);ctx.restore();}
}
