// Height is separate from the road position so the shadow stays on the floor.
export function drawCoins(ctx:CanvasRenderingContext2D,coins:readonly {x:number;y:number;z:number;age:number;value:number}[],time:number){
 for(const coin of coins){if(coin.age<0)continue;
  const radius=coin.value>1?8:6, width=Math.max(2,Math.abs(Math.cos(coin.age*11))*radius);
  ctx.save();ctx.fillStyle='#0005';ctx.beginPath();ctx.ellipse(coin.x,coin.y+3,radius+2,3,0,0,Math.PI*2);ctx.fill();
  ctx.translate(coin.x,coin.y-coin.z);ctx.shadowColor='#ffc64f';ctx.shadowBlur=6;
  ctx.fillStyle='#ffc94e';ctx.strokeStyle='#9c601c';ctx.lineWidth=2;ctx.beginPath();ctx.ellipse(0,0,width,radius,0,0,Math.PI*2);ctx.fill();ctx.stroke();
  ctx.shadowBlur=0;ctx.strokeStyle='#fff0a1';ctx.lineWidth=1;ctx.beginPath();ctx.ellipse(0,-1,width*.6,radius*.65,0,0,Math.PI*2);ctx.stroke();
  if(Math.sin(time*9+coin.x)>.85){ctx.fillStyle='#fff9d9';ctx.fillRect(-2,-radius-4,4,2);}
  ctx.restore();
 }
}
