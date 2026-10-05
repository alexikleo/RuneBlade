// Scenery is anchored to distance so it moves with the road and freezes on pause.
export function drawJourney(ctx:CanvasRenderingContext2D,distance:number,region:number){
 if(region>=3)return;
 const cycle=1900;
 for(let section=Math.floor((distance-610)/cycle);section<=Math.floor((distance+700)/cycle);section++){
  const y=distance-section*cycle;
  if(y<-700||y>1310)continue;
  ctx.save();
  if(region===0){
   // Timber bridge across a narrow river, with broad rails outside the combat lane.
   ctx.fillStyle='#254c60';ctx.fillRect(0,y-650,400,480);
   ctx.strokeStyle='#78a8b344';ctx.lineWidth=2;for(let i=0;i<12;i++){ctx.beginPath();ctx.moveTo(0,y-635+i*38);ctx.lineTo(56,y-641+i*38);ctx.moveTo(344,y-620+i*38);ctx.lineTo(400,y-628+i*38);ctx.stroke();}
   ctx.fillStyle='#695143';ctx.fillRect(62,y-650,276,480);ctx.strokeStyle='#342e2a';ctx.lineWidth=3;for(let i=0;i<20;i++){ctx.beginPath();ctx.moveTo(62,y-650+i*24);ctx.lineTo(338,y-650+i*24);ctx.stroke();}
   for(const x of [49,340]){ctx.fillStyle='#b19870';ctx.fillRect(x,y-660,11,500);ctx.fillStyle='#65523c';for(let i=0;i<6;i++)ctx.fillRect(x-4,y-655+i*95,19,18);}
  }else if(region===1){
   // A sunlit clearing opens out beyond the trail.
   ctx.fillStyle='#304b32';ctx.fillRect(0,y-650,59,480);ctx.fillRect(341,y-650,59,480);
   ctx.fillStyle='#b8d3870c';ctx.beginPath();ctx.ellipse(200,y-410,170,190,0,0,7);ctx.fill();
   for(let i=0;i<18;i++){const x=i%2?354+(i*7%35):8+(i*11%37),fy=y-640+i*25;ctx.fillStyle=i%3?'#d5c688':'#b295d4';ctx.beginPath();ctx.arc(x,fy,3,0,7);ctx.fill();ctx.strokeStyle='#77966b';ctx.beginPath();ctx.moveTo(x,fy+3);ctx.lineTo(x-2,fy+10);ctx.stroke();}
  }else{
   // Broken gateway pillars flank worn courtyard paving.
   ctx.fillStyle='#66534c22';ctx.fillRect(65,y-620,270,420);
   for(const x of [12,350]){ctx.fillStyle='#796c68';ctx.fillRect(x,y-580,38,120);ctx.fillRect(x-5,y-475,48,16);ctx.fillStyle='#a28e7c';ctx.fillRect(x-5,y-589,48,15);ctx.strokeStyle='#3b333b';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(x+12,y-575);ctx.lineTo(x+22,y-550);ctx.lineTo(x+13,y-530);ctx.stroke();}
   ctx.strokeStyle='#a090731f';ctx.lineWidth=2;for(let i=0;i<5;i++){ctx.beginPath();ctx.arc(200,y-400,30+i*17,0,7);ctx.stroke();}
  }
  ctx.restore();
 }
}
