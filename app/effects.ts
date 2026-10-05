import {shape,oval,armor} from './cartoon';
import { drawSinisterEnemy, type Foe } from './enemy-art';
export const drawEnemy=drawSinisterEnemy;
const sparks:{x:number;y:number;vx:number;vy:number;life:number;color:string;size:number}[]=[];
export function burst(x:number,y:number,color:string,power=0){const count=10+power*4;for(let i=0;i<count;i++){const a=i*Math.PI*2/count;sparks.push({x,y,vx:Math.cos(a)*(75+power*24),vy:Math.sin(a)*(75+power*24),life:.45,color,size:2.5+power*.45});}if(sparks.length>240)sparks.splice(0,sparks.length-240);}
export function clearEffects(){sparks.length=0;}
export function drawEffects(ctx:CanvasRenderingContext2D,dt:number){for(let i=sparks.length-1;i>=0;i--){const p=sparks[i];p.life-=dt;if(p.life<=0){sparks.splice(i,1);continue;}p.x+=p.vx*dt;p.y+=p.vy*dt;ctx.globalAlpha=p.life/.45;ctx.fillStyle=p.color;ctx.beginPath();ctx.arc(p.x,p.y,p.size*p.life/.45,0,7);ctx.fill();}ctx.globalAlpha=1;}
export function drawRoadside(ctx:CanvasRenderingContext2D,time:number,region=0){
 for(let row=-1;row<5;row++){const y=row*170+time*125%170;for(const x of [28,372]){
 if(region===1){shape(ctx,x-5,y+6,10,42,'#795347',4);oval(ctx,x,y,28,33,'#284c43');oval(ctx,x-8,y-8,20,25,'#467954');oval(ctx,x+8,y-15,14,18,'#629464');continue;}
 if(region===2){shape(ctx,x-18,y,36,48,'#59404a',9);ctx.strokeStyle='#eaa069';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(x-5,y+5);ctx.lineTo(x+6,y+20);ctx.lineTo(x-3,y+38);ctx.stroke();oval(ctx,x+15,y+65,3,3,'#f1b273');continue;}
 ctx.fillStyle='#253d43';ctx.fillRect(x-12,y,24,52);ctx.fillStyle='#3b5359';ctx.fillRect(x-15,y,30,9);ctx.fillRect(x-15,y+44,30,8);ctx.fillStyle='#151f27';ctx.fillRect(x-4,y+14,8,19);
 const glow=ctx.createRadialGradient(x,y+16,1,x,y+16,35);glow.addColorStop(0,'#ffba6655');glow.addColorStop(1,'#ffba6600');ctx.fillStyle=glow;ctx.fillRect(x-35,y-20,70,70);ctx.fillStyle='#ffcb85';ctx.beginPath();ctx.ellipse(x,y+16,3,6+Math.sin(time*13+row),0,0,7);ctx.fill();
 }}
}

export function drawDefeat(ctx:CanvasRenderingContext2D,e:Foe,age:number){
 const t=Math.min(1,age/.5);ctx.save();ctx.globalAlpha=1-t;
 if(e.bossType==='wisp'){ctx.fillStyle='#bba2ea';for(let i=0;i<7;i++){const a=i*Math.PI*2/7;ctx.beginPath();ctx.arc(e.x+Math.cos(a)*t*40,e.y+Math.sin(a)*t*25,8+t*12,0,7);ctx.fill();}}
 else{ctx.translate(e.x,e.y);ctx.rotate((e.x<200?-1:1)*t*1.4);ctx.scale(1-t*.35,1-t*.35);drawEnemy(ctx,{...e,x:0,y:-t*15},0);}
 ctx.restore();
}
