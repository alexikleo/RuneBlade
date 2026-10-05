export type PowerCelebration={kind:string;x:number;y:number;age:number};
type Palette=Record<string,{name:string;icon:string;color:string}>;
export function drawPowerEffects(ctx:CanvasRenderingContext2D,time:number,buffs:Record<string,number>,fades:Record<string,number>,pickups:PowerCelebration[],palette:Palette,slash:number){
 const ring=(x:number,y:number,r:number)=>{ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.stroke();};
 for(const key of new Set([...Object.keys(buffs),...Object.keys(fades)])){
  const remaining=buffs[key]??0,p=palette[key];if(!p)continue;
  const opacity=remaining>0?Math.min(1,remaining/.4)*(remaining<3?.5+.5*Math.abs(Math.sin(time*8)):1):(fades[key]??0)/.45;
  ctx.save();ctx.globalAlpha=opacity*.7;ctx.strokeStyle=p.color;ctx.fillStyle=p.color;ctx.shadowColor=p.color;ctx.shadowBlur=8;ctx.lineWidth=2;
  if(key==='guardian'){
   const a=time*2,x=200+Math.cos(a)*40,y=515+Math.sin(a)*19;
   ctx.beginPath();ctx.ellipse(x,y,7,10,0,0,7);ctx.fill();ctx.beginPath();ctx.moveTo(x-5,y+6);ctx.lineTo(x,y+17);ctx.lineTo(x+5,y+6);ctx.fill();
  }else if(key==='frost'){
   ctx.globalAlpha=opacity*.28;ctx.beginPath();ctx.ellipse(200,531,83,31,0,0,7);ctx.stroke();ctx.font='16px system-ui';for(let i=0;i<6;i++){const a=i*Math.PI/3+time*.3;ctx.fillText('❄',200+Math.cos(a)*72,525+Math.sin(a)*24);}
  }else if(key==='magnet'){
   for(let i=0;i<3;i++){const phase=(time*1.5+i/3)%1;ctx.globalAlpha=opacity*(1-phase)*.35;ctx.beginPath();ctx.ellipse(200,532,25+phase*60,10+phase*25,0,Math.PI,2*Math.PI);ctx.stroke();}
  }else if(key==='guard'){
   ctx.beginPath();ctx.moveTo(169,497);ctx.lineTo(191,497);ctx.lineTo(189,520);ctx.lineTo(180,530);ctx.lineTo(171,520);ctx.closePath();ctx.stroke();const y=500+(time*30%24);ctx.beginPath();ctx.moveTo(172,y);ctx.lineTo(188,y-3);ctx.stroke();
  }else if(key==='storm'||key==='chain'){
   for(let i=0;i<3;i++){const a=time*5+i*2.1,x=220+Math.cos(a)*12,y=505+Math.sin(a)*12;ctx.beginPath();ctx.moveTo(220,505);ctx.lineTo(x+4,y-5);ctx.lineTo(x,y);ctx.stroke();}
  }else if(key==='flame'){
   for(let i=0;i<5;i++){const phase=(time*2+i/5)%1;ctx.globalAlpha=opacity*(1-phase);ctx.beginPath();ctx.ellipse(223+Math.sin(i*3+time*8)*4,492-phase*39,3*(1-phase)+1,7*(1-phase)+2,-.2,0,7);ctx.fill();}
  }else if(key==='frenzy'&&slash>0){
   for(let i=0;i<3;i++){ctx.globalAlpha=opacity*(1-i/3)*slash/.22*.4;ctx.lineWidth=3;ctx.beginPath();ctx.arc(200,535,112+i*7,Math.PI*1.08,Math.PI*1.92);ctx.stroke();}
  }
  ctx.restore();
 }
 for(const pickup of pickups){
  const p=palette[pickup.kind],t=pickup.age;ctx.save();ctx.textAlign='center';ctx.strokeStyle=p.color;ctx.fillStyle=p.color;
  if(t<.4){const f=t/.4;ctx.save();ctx.translate(pickup.x+(200-pickup.x)*f,pickup.y+(510-pickup.y)*f-18*Math.sin(f*Math.PI));ctx.rotate(f*Math.PI*2);ctx.scale(1-f*.9,1-f*.9);ctx.shadowColor=p.color;ctx.shadowBlur=18;ctx.lineWidth=3;ring(0,0,18);ctx.font='bold 23px system-ui';ctx.fillText(p.icon,0,8);ctx.restore();}
  if(t>.15&&t<.85){const f=(t-.15)/.7;ctx.globalAlpha=(1-f)*.65;ctx.lineWidth=4*(1-f)+1;ring(200,520,16+f*63);}
  if(pickup.kind==='heal'){ctx.font='20px system-ui';for(let i=0;i<3;i++){ctx.globalAlpha=Math.max(0,1-t/1.4);ctx.fillText('♥',183+i*17,515-t*44-i*9);}}
  ctx.restore();
 }
 // Only the latest announcement occupies the center; bursts may overlap.
 const latest=pickups[pickups.length-1];if(latest){const p=palette[latest.kind],t=latest.age;ctx.save();ctx.translate(200,462-Math.min(1,t/.25)*9);const scale=t<.2?.7+Math.sin(t/.2*Math.PI/2)*.35:1;ctx.scale(scale,scale);ctx.globalAlpha=Math.min(1,t/.1,(1.5-t)/.35);ctx.textAlign='center';ctx.font='bold 17px system-ui';ctx.strokeStyle='#10202f';ctx.lineWidth=5;ctx.strokeText(p.icon+' '+p.name,0,0);ctx.fillStyle=p.color;ctx.fillText(p.icon+' '+p.name,0,0);ctx.restore();}
}
