// Visual strength tracks Arcane Power, independently of projectile collision/damage.
export const spellColors=['#8eeaff','#65d8ff','#b89aff','#f4c47e'];
export function drawSpell(ctx:CanvasRenderingContext2D,x:number,y:number,rank:number,time:number,piercing:boolean,tint?:string){
 const level=Math.max(0,Math.min(5,rank)),color=tint??spellColors[Math.min(3,Math.floor(level))],radius=4+level*1.7,length=27+level*15;
 ctx.save();ctx.translate(x,y);ctx.globalCompositeOperation='lighter';
 const trail=ctx.createLinearGradient(0,-6,0,length);trail.addColorStop(0,color);trail.addColorStop(.35,color+'88');trail.addColorStop(1,color+'00');
 ctx.fillStyle=trail;ctx.beginPath();ctx.moveTo(-radius,-3);ctx.quadraticCurveTo(-radius*1.6,length*.45,0,length);ctx.quadraticCurveTo(radius*1.6,length*.45,radius,-3);ctx.closePath();ctx.fill();
 ctx.shadowColor=color;ctx.shadowBlur=10+level*5;ctx.fillStyle=color;ctx.beginPath();ctx.ellipse(0,0,radius,10+level*3,0,0,Math.PI*2);ctx.fill();ctx.shadowBlur=0;
 ctx.fillStyle='#fffbed';ctx.beginPath();ctx.ellipse(0,-2,radius*.45,6+level*2,0,0,Math.PI*2);ctx.fill();
 if(level>=2){ctx.strokeStyle=color;ctx.lineWidth=1.5;for(const side of [-1,1]){ctx.beginPath();for(let n=0;n<7;n++){const px=side*(radius+3)+Math.sin(time*18+n*.9+y*.03)*3,py=n*6;n?ctx.lineTo(px,py):ctx.moveTo(px,py);}ctx.stroke();}}
 if(level>=3){ctx.strokeStyle=color;ctx.lineWidth=1.5;ctx.globalAlpha=.65;for(let i=0;i<3;i++){const a=time*8+i*Math.PI*2/3;ctx.beginPath();ctx.arc(Math.cos(a)*(radius+5),12+Math.sin(a)*8,1.5+(level-3),0,Math.PI*2);ctx.stroke();}ctx.globalAlpha=1;}
 if(piercing){ctx.strokeStyle='#d7fcff';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(-radius-4,1);ctx.lineTo(0,-23-level*2);ctx.lineTo(radius+4,1);ctx.stroke();ctx.globalAlpha=.55;ctx.beginPath();ctx.ellipse(0,8,radius+6,4,0,0,Math.PI*2);ctx.stroke();}
 ctx.restore();
}
