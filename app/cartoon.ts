// Shared smooth cartoon rendering for the animated game characters.
export function shape(ctx:CanvasRenderingContext2D,x:number,y:number,w:number,h:number,color:string,r=6){
 ctx.fillStyle=color;ctx.strokeStyle='#18232e';ctx.lineWidth=2;ctx.beginPath();ctx.roundRect(x,y,w,h,r);ctx.fill();ctx.stroke();
}
export function oval(ctx:CanvasRenderingContext2D,x:number,y:number,rx:number,ry:number,color:string){ctx.fillStyle=color;ctx.beginPath();ctx.ellipse(x,y,rx,ry,0,0,Math.PI*2);ctx.fill();}
export function armor(ctx:CanvasRenderingContext2D,x:number,y:number,w:number,h:number,base:string){const fill=ctx.createLinearGradient(x,y,x+w,y+h);fill.addColorStop(0,'#e5f2f5');fill.addColorStop(.3,base);fill.addColorStop(1,'#385363');ctx.fillStyle=fill;ctx.strokeStyle='#1d303e';ctx.lineWidth=2;ctx.beginPath();ctx.roundRect(x,y,w,h,7);ctx.fill();ctx.stroke();}
