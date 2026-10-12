// Layered scenery kept outside the central attack corridor for readability.
export function drawEnvironment(c:CanvasRenderingContext2D,distance:number,time:number,region:number){
 const mod=(v:number,n:number)=>(v%n+n)%n;
 const ellipse=(x:number,y:number,rx:number,ry:number,color:string)=>{c.fillStyle=color;c.beginPath();c.ellipse(x,y,rx,ry,0,0,Math.PI*2);c.fill();};
 const glow=(x:number,y:number,r:number,color:string)=>{const g=c.createRadialGradient(x,y,1,x,y,r);g.addColorStop(0,color+'66');g.addColorStop(1,color+'00');c.fillStyle=g;c.fillRect(x-r,y-r,r*2,r*2);};
 const floor=c.createLinearGradient(0,0,400,0);const base=[['#101b2c','#344754','#263744'],['#102a28','#355148','#2b413a'],['#1e1422','#4c353a','#362731'],['#18283d','#607b8c','#3b546a'],['#1b1639','#494263','#302b49'],['#0b2b37','#34616a','#24464f'],['#392c26','#8a7050','#69553e'],['#192720','#465144','#2b3c30'],['#26374c','#79878b','#515f72'],['#130f27','#40344d','#292037']][region];floor.addColorStop(0,base[0]);floor.addColorStop(.5,base[1]);floor.addColorStop(1,base[0]);c.fillStyle=floor;c.fillRect(0,0,400,610);
 // Broken paving with bevelled edges, alternating rows and subtle mineral veins.
 for(let row=-2;row<12;row++){const y=row*68+mod(distance,68);for(let col=0;col<5;col++){const x=65+col*58+(row%2?9:0),w=51+(col%2)*4;c.fillStyle=base[0];c.beginPath();c.roundRect(x,y,w,61,6);c.fill();const stone=c.createLinearGradient(x,y,x+w,y+61);stone.addColorStop(0,base[1]);stone.addColorStop(1,base[2]);c.fillStyle=stone;c.beginPath();c.roundRect(x+1,y+1,w-3,57,5);c.fill();c.strokeStyle=region===2?'#c1977720':'#b4d9d21b';c.lineWidth=1;c.beginPath();c.moveTo(x+6,y+2);c.lineTo(x+w-7,y+2);c.stroke();if((row+col)%3===0){c.strokeStyle=base[0]+'88';c.beginPath();c.moveTo(x+20,y+7);c.lineTo(x+25,y+23);c.lineTo(x+17,y+31);c.stroke();}}}
 if(region>=3){
  const accents=['#bcecff','#cf9dff','#6ce2dd','#f9ce7c','#c2e079','#e5eaff','#d9a2ff'],accent=accents[region-3];
  for(let row=-1;row<5;row++){const y=row*165+mod(distance,165);for(const side of [0,1]){const x=side?367:33;
   c.save();c.translate(x,y);
   if(region===3){ // Snow banks and jagged ice spires.
    ellipse(0,28,35,52,'#a2bac9');ellipse(-5,20,31,43,'#cfdee4');c.fillStyle='#75acc7';c.beginPath();c.moveTo(-20,34);c.lineTo(-10,-50);c.lineTo(13,-24);c.lineTo(24,37);c.fill();c.fillStyle='#d1f4ff';c.beginPath();c.moveTo(-10,-50);c.lineTo(-2,30);c.lineTo(13,-24);c.fill();
   }else if(region===4){ // Clusters of luminous amethyst.
    for(let i=0;i<3;i++){const px=-21+i*19,top=-34-i%2*28;glow(px,0,35,accent);c.fillStyle=i%2?'#9a78bf':'#675b9b';c.beginPath();c.moveTo(px-9,34);c.lineTo(px-12,top+15);c.lineTo(px,top);c.lineTo(px+11,top+14);c.lineTo(px+8,34);c.fill();c.strokeStyle='#dfc8ff';c.lineWidth=2;c.beginPath();c.moveTo(px,top);c.lineTo(px,29);c.stroke();}
   }else if(region===5){ // Flooded ruins, coral and turquoise pools.
    ellipse(0,5,34,65,'#123f50');ellipse(0,8,28,52,'#20596a');c.fillStyle='#719893';c.fillRect(-13,-43,26,60);c.fillRect(-18,-44,36,8);c.strokeStyle='#e593ab';c.lineWidth=4;c.beginPath();c.moveTo(15,44);c.lineTo(17,20);c.lineTo(30,5);c.moveTo(17,25);c.lineTo(5,15);c.stroke();glow(-6,33,20,accent);
   }else if(region===6){ // Dunes and engraved sandstone obelisks.
    ellipse(0,20,44,65,'#aa8551');ellipse(-8,12,33,51,'#cba468');c.fillStyle='#826647';c.beginPath();c.moveTo(-12,29);c.lineTo(-10,-44);c.lineTo(0,-57);c.lineTo(12,-43);c.lineTo(15,30);c.fill();c.strokeStyle='#ebc887';c.lineWidth=2;c.beginPath();c.moveTo(0,-38);c.lineTo(-5,-22);c.lineTo(5,-8);c.lineTo(0,14);c.stroke();
   }else if(region===7){ // Poison pools and skeletal mangrove roots.
    ellipse(0,20,33,47,'#263f29');glow(0,18,35,accent);c.strokeStyle='#6c7460';c.lineWidth=8;c.beginPath();c.moveTo(-18,52);c.quadraticCurveTo(12,-2,4,-47);c.lineTo(21,-67);c.moveTo(3,-20);c.lineTo(-21,-41);c.stroke();for(let i=0;i<3;i++)ellipse(i*10-10,30+Math.sin(time*2+i)*5,3,2,'#cee882');
   }else if(region===8){ // Cloud banks and floating marble buttresses.
    for(let i=0;i<3;i++)ellipse(i*15-15,20+i*8,30,21,'#a7b8c4');c.fillStyle='#c1c8cc';c.fillRect(-13,-42,26,63);c.fillStyle='#e4dbc1';c.fillRect(-20,-46,40,9);c.fillRect(-18,18,36,9);c.strokeStyle='#707e98';c.lineWidth=3;c.beginPath();c.moveTo(-5,-33);c.lineTo(-5,11);c.moveTo(5,-33);c.lineTo(5,11);c.stroke();
   }else{ // Floating obsidian shards and pulsing void gates.
    c.translate(0,Math.sin(time*2+row)*5);glow(0,0,46,accent);c.strokeStyle='#bf8bdb';c.lineWidth=3;c.beginPath();c.ellipse(0,0,22,47,0,0,7);c.stroke();c.fillStyle='#100d23';c.beginPath();c.moveTo(-13,29);c.lineTo(-20,-16);c.lineTo(0,-46);c.lineTo(17,-8);c.lineTo(10,32);c.fill();c.strokeStyle='#68518d';c.stroke();
   }
   c.restore();
  }}
  for(let i=0;i<24;i++){const x=mod(i*53+Math.sin(time+i)*8,400),y=mod(i*79+distance*.4+(region===3?time*18:-time*9),630);c.globalAlpha=region===3?.6:.3;ellipse(x,y,region===3?2:1,region===6?1:2,accent);}c.globalAlpha=1;
 }else if(region===0){
  for(const x of [0,342]){c.fillStyle='#132337';c.fillRect(x,0,58,610);for(let row=-1;row<8;row++){const y=row*100+mod(distance*.8,100);c.fillStyle='#283f53';c.fillRect(x+5,y,46,90);c.fillStyle='#496174';c.fillRect(x+5,y,46,5);c.fillStyle='#0a1727';c.fillRect(x+12,y+18,32,52);c.fillStyle='#3a5165';c.fillRect(x+7,y+86,44,5);}}
  for(let row=-1;row<4;row++){const y=row*235+mod(distance,235);for(const x of [39,361]){c.fillStyle='#070e1c66';c.fillRect(x-22,y+5,44,75);c.fillStyle='#536576';c.fillRect(x-18,y,36,62);c.fillStyle='#75838b';c.fillRect(x-22,y-4,44,10);c.fillRect(x-22,y+54,44,9);c.fillStyle='#243445';c.fillRect(x-10,y+9,20,36);glow(x,y+22,48,'#ffb56a');ellipse(x,y+22,4,9+Math.sin(time*12+row)*2,'#ffc983');ellipse(x,y+24,2,5,'#fff2be');
   if(row%2===0){c.fillStyle='#752d49';c.beginPath();c.moveTo(x-11,y+68);c.lineTo(x+11,y+68);c.lineTo(x+10+Math.sin(time*3)*3,y+107);c.lineTo(x,y+99);c.lineTo(x-10,y+110);c.fill();c.strokeStyle='#d5ad76';c.lineWidth=2;c.stroke();}}}
 }else if(region===1){
  for(let row=-1;row<6;row++){const y=row*145+mod(distance*.9,145);for(const x of [14,386]){ellipse(x+8,y+16,56,58,'#081d2377');c.strokeStyle='#584b3b';c.lineWidth=13;c.beginPath();c.moveTo(x,y+44);c.quadraticCurveTo(x+(x<200?28:-28),y+3,x,y-45);c.stroke();for(let leaf=0;leaf<5;leaf++){const a=leaf*1.3,tx=x+Math.cos(a)*22,ty=y+Math.sin(a)*30;const canopy=c.createRadialGradient(tx-9,ty-12,3,tx,ty,37);canopy.addColorStop(0,'#527d5b');canopy.addColorStop(.6,'#244e42');canopy.addColorStop(1,'#12362f');ellipse(tx,ty,37,30,'#163f36');c.fillStyle=canopy;c.fill();}for(let i=0;i<3;i++){const mx=x+(x<200?33:-33)+i*4,my=y+48+i*8;c.strokeStyle='#92bcb1';c.lineWidth=2;c.beginPath();c.moveTo(mx,my);c.lineTo(mx,my-8);c.stroke();ellipse(mx,my-9,5,3,i%2?'#83d9d0':'#b5a0e0');}}}
  for(let i=0;i<17;i++){const x=i%2?350+Math.sin(i*7)*30:45+Math.sin(i*9)*25,y=mod(i*71+distance*.55-time*8,650)-20;glow(x,y,9,'#bded8f');ellipse(x,y,1.3,1.3,'#e3ffc1');}
 }else{
  for(const side of [0,1]){const x=side?363:22;c.strokeStyle='#e95d3f';c.lineWidth=18;c.shadowColor='#ff6838';c.shadowBlur=20;c.beginPath();for(let i=-1;i<13;i++){const y=i*65+mod(distance*.7,65),px=x+Math.sin(i*2.7)*10;i===-1?c.moveTo(px,y):c.lineTo(px,y);}c.stroke();c.shadowBlur=0;c.strokeStyle='#ffd16b';c.lineWidth=4;c.stroke();}
  for(let row=-1;row<5;row++){const y=row*170+mod(distance,170);for(const x of [35,365]){c.fillStyle='#2a2430';c.beginPath();c.moveTo(x-25,y+55);c.lineTo(x-18,y-31);c.lineTo(x+7,y-46);c.lineTo(x+23,y-15);c.lineTo(x+24,y+56);c.closePath();c.fill();c.strokeStyle='#786071';c.lineWidth=3;c.stroke();c.strokeStyle='#ff9860';c.lineWidth=2;c.beginPath();c.moveTo(x,y-25);c.lineTo(x-6,y-2);c.lineTo(x+7,y+12);c.lineTo(x-3,y+30);c.stroke();glow(x,y+4,27,'#ef794c');}}
  for(let i=0;i<22;i++){const x=i%2?350+Math.sin(i)*33:35+Math.sin(i)*30,y=mod(i*43+distance*.6-time*23,650);ellipse(x,y,1+(i%2),2,'#ffc186');}
 }
 // Regional wear breaks up the paving: moss, frost, sand and shallow water.
 for(let i=0;i<9;i++){
  const x=i%2?315:85,y=mod(i*89+distance,790)-90;
  if(region===1||region===7){
   for(let j=0;j<4;j++)ellipse(x+(j%2?1:-1)*j*3,y+j*7,8-j,4,region===1?'#52754a55':'#64743e55');
  }else if(region===3){
   ellipse(x,y,14,30,'#d3e7ed38');c.strokeStyle='#d9f5ff66';c.lineWidth=1;c.beginPath();c.moveTo(x-4,y-10);c.lineTo(x+2,y);c.lineTo(x-3,y+8);c.stroke();
  }else if(region===6){
   ellipse(x,y,19,34,'#c5a16a35');c.strokeStyle='#dec59344';c.lineWidth=1;for(let j=0;j<3;j++){c.beginPath();c.ellipse(x,y+j*7,15,3,0,0,Math.PI);c.stroke();}
  }else if(region===5){
   ellipse(x,y,15,26,'#347b8933');c.strokeStyle='#9cddd533';c.lineWidth=1;c.beginPath();c.ellipse(x,y,10,17,0,0,Math.PI);c.stroke();
  }
 }
 // Inlaid curbs and irregular rubble anchor the road in its surroundings.
 const accent=['#bca882','#8dba8b','#dd9a70','#c4e5ed','#b59ad4','#8ccecb','#dcc08b','#96ad78','#d6d8c3','#b19acd'][region];
 for(const side of [-1,1]){
  const x=side<0?63:337;
  c.fillStyle=base[0];c.fillRect(x-5,0,10,610);
  for(let i=-1;i<13;i++){const y=i*54+mod(distance,54);const bevel=c.createLinearGradient(x-4,0,x+4,0);bevel.addColorStop(0,base[2]);bevel.addColorStop(.5,base[1]);bevel.addColorStop(1,base[0]);c.fillStyle=bevel;c.fillRect(x-4,y,8,50);c.fillStyle=accent+'44';c.fillRect(x-3,y+1,5,1);}
 }
 // Sparse chips and moss stay at the edges rather than behind incoming attacks.
 for(let i=0;i<18;i++){
  const x=i%2?310+(i*13%20):72+(i*17%20),y=mod(i*97+distance,720)-55;
  ellipse(x+2,y+3,6,3,'#00000045');ellipse(x,y,3+i%3,2+i%2,base[2]);
  c.strokeStyle=accent+'55';c.lineWidth=1;c.beginPath();c.moveTo(x-2,y-1);c.lineTo(x+2,y-2);c.stroke();
  if(region===1||region===7){c.strokeStyle=region===1?'#719269':'#7a9156';c.beginPath();c.moveTo(x,y+7);c.quadraticCurveTo(x-6,y-2,x-8,y);c.moveTo(x,y+7);c.quadraticCurveTo(x+3,y-4,x+6,y-3);c.stroke();}
 }
 // Low drifting mist and soft edge shadows give depth without obscuring the lane.
 c.save();
 for(let i=0;i<4;i++){
  const x=i%2?390:10,y=mod(i*181+distance*.3+time*5,800)-90;
  const mist=c.createRadialGradient(x,y,5,x,y,105);mist.addColorStop(0,accent+'12');mist.addColorStop(1,accent+'00');c.fillStyle=mist;c.fillRect(x-105,y-105,210,210);
 }
 const edge=c.createLinearGradient(0,0,400,0);edge.addColorStop(0,'#030a18aa');edge.addColorStop(.2,'#030a1800');edge.addColorStop(.8,'#030a1800');edge.addColorStop(1,'#030a18aa');c.fillStyle=edge;c.fillRect(0,0,400,610);
 c.restore();
 // Gentle lighting across the road, leaving foes and warnings drawn above it.
 const shade=c.createLinearGradient(0,0,0,610);shade.addColorStop(0,'#060c1d55');shade.addColorStop(.35,'#00000000');shade.addColorStop(1,'#050c1718');c.fillStyle=shade;c.fillRect(0,0,400,610);
}
