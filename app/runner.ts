import {drawGear} from './equipment';
import {shape,oval,armor} from './cartoon';
// A small articulated game sprite, facing up the road.
export function drawRunner(ctx: CanvasRenderingContext2D, time: number, slash: number, blocking: boolean, casting: boolean, weapon = 0, blockFx = 0, flame = 0, swordRank=0, shieldIndex=0, shieldRank=0, lunging=false) {
 const stride=Math.sin(time*15), bob=Math.cos(time*30)*1.8;
 ctx.save();ctx.translate(200,535);
 ctx.fillStyle='#0006';ctx.beginPath();ctx.ellipse(0,19,24,9,0,0,Math.PI*2);ctx.fill();
 // Alternating boots and legs provide a continuous forward-running gait.
 ctx.lineCap='round';ctx.lineWidth=9;ctx.strokeStyle='#253346';
 for(const side of [-1,1]){const step=stride*side*9;ctx.beginPath();ctx.moveTo(side*8,3);ctx.lineTo(side*10,14+step);ctx.stroke();shape(ctx,side*10-6,12+step,12,12,'#596f86',4);oval(ctx,side*10-2,15+step,3,2,'#adccdc');}
 ctx.translate(stride*1.4,bob+Math.sin(Math.max(0,blockFx)/.28*Math.PI)*4);
 // Short red tabard trails behind the armoured shoulders.
 ctx.fillStyle='#b33e56';ctx.strokeStyle='#502d42';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(-13,-10);ctx.quadraticCurveTo(-22,8,-17+stride*4,24);ctx.quadraticCurveTo(0,34,17+stride*4,24);ctx.quadraticCurveTo(22,8,13,-10);ctx.closePath();ctx.fill();ctx.stroke();
 armor(ctx,-14,-16,28,29,'#87b4cc');armor(ctx,-22,-15,13,15,'#accfe0');armor(ctx,9,-15,13,15,'#accfe0');shape(ctx,-13,6,26,6,'#785044',2);shape(ctx,-4,4,8,9,'#f5cf80',2);
 // Left arm carries a physical shield, raised when blocking.
 ctx.save();ctx.translate(-20,blocking?-22:-4+stride*3);ctx.scale(.65,.65);drawGear(ctx,'shield',shieldIndex,shieldRank,time);ctx.restore();
 // Sword pivots with the hand through a broad forward slash.
 ctx.save();ctx.translate(lunging?5:18,lunging?-28:-6-stride*3);ctx.rotate(lunging?0:slash>0?-1.8+(1-Math.pow(slash/.22,3))*3.3:casting?-.35:.12);
 oval(ctx,0,3,6,7,'#f0bd96');ctx.fillStyle='#725238';ctx.fillRect(-3,-14,6,16);ctx.fillStyle='#e5bf76';ctx.fillRect(-11,-16,22,4);
 drawGear(ctx,'sword',weapon,swordRank,time);if(flame>0){ctx.save();ctx.globalAlpha=flame;ctx.shadowColor='#ff9257';ctx.shadowBlur=14;ctx.strokeStyle='#ffba64';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(-7,-10);ctx.lineTo(0,-66);ctx.lineTo(7,-10);ctx.stroke();ctx.restore();}ctx.restore();
 // Helmet seen from behind: the fighter is looking forward, toward enemies.
 armor(ctx,-13,-36,26,25,'#95bcd4');ctx.strokeStyle='#52758c';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(0,-34);ctx.lineTo(0,-14);ctx.stroke();
 ctx.fillStyle='#df6472';ctx.strokeStyle='#7b3149';ctx.beginPath();ctx.moveTo(-3,-32);ctx.bezierCurveTo(-13,-44,-5,-53,7,-50);ctx.bezierCurveTo(2,-44,12,-41,3,-31);ctx.closePath();ctx.fill();ctx.stroke();oval(ctx,-7,-29,3,5,'#e5f6fb');
 ctx.restore();
}
