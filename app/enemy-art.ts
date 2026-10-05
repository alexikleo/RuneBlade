export type Foe={x:number;y:number;kind:string;finalBoss?:boolean;region?:number;bossType?:string;wind:number;flash:number};
// Shared combat roles, distinct regional silhouettes and materials.
export function drawSinisterEnemy(c:CanvasRenderingContext2D,e:Foe,time:number){
 const region=e.region??(e.bossType==='golem'?1:e.bossType==='wisp'?2:0),boss=e.kind==='boss',brute=e.kind==='brute'||e.bossType==='golem',runner=e.kind==='runner',archer=e.kind==='archer';
 const colors=[{body:'#353a50',edge:'#8793a5',cloth:'#672e44',eye:'#ff6479'},{body:'#3c5046',edge:'#849371',cloth:'#293e35',eye:'#c5f579'},{body:'#49363e',edge:'#ae7460',cloth:'#652c31',eye:'#ffb34e'},{body:'#536b83',edge:'#b5e1ed',cloth:'#34465e',eye:'#9cffff'},{body:'#594873',edge:'#b69ad7',cloth:'#37264f',eye:'#efb9ff'},{body:'#315963',edge:'#81b9b1',cloth:'#233d49',eye:'#8cffe1'},{body:'#7e6248',edge:'#d8b77d',cloth:'#633f3a',eye:'#ffe49b'},{body:'#435442',edge:'#9ba66e',cloth:'#293529',eye:'#dbff80'},{body:'#62728c',edge:'#e0dcc1',cloth:'#3e4a6c',eye:'#d0efff'},{body:'#392a52',edge:'#a38abf',cloth:'#281933',eye:'#f0a8ff'}][region];
 const size=boss?1.55:brute?1.18:runner?.84:1,step=e.wind>=0?0:Math.sin(time*(runner?22:11)+e.x)*4;
 const poly=(points:number[][],fill:string,stroke='#131a24')=>{const material=c.createLinearGradient(-25,-40,25,30);material.addColorStop(0,fill);material.addColorStop(.45,fill);material.addColorStop(1,'#151c28');c.fillStyle=e.flash?'#f4fcff':material;c.strokeStyle=stroke;c.lineWidth=2;c.beginPath();points.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.closePath();c.fill();c.stroke();};
 const line=(points:number[][],color:string,width=2)=>{c.strokeStyle=color;c.lineWidth=width;c.beginPath();points.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.stroke();};
 c.save();c.translate(e.x,e.y);c.scale(size,size);c.lineJoin='round';c.lineCap='round';
 const shadow=c.createRadialGradient(0,24,2,0,24,brute?35:28);shadow.addColorStop(0,'#00000099');shadow.addColorStop(1,'#00000000');c.fillStyle=shadow;c.save();c.scale(1,.4);c.beginPath();c.arc(0,60,brute?35:28,0,7);c.fill();c.restore();
 if(e.finalBoss){c.save();c.strokeStyle='#eab8ff';c.shadowColor='#cf7aff';c.shadowBlur=15;c.lineWidth=3;c.beginPath();c.ellipse(0,-12,39,49,0,0,7);c.stroke();c.restore();poly([[-20,-39],[-23,-60],[-10,-50],[0,-68],[10,-50],[23,-60],[20,-39]],'#ab85c1');}
 const body=e.flash?'#fff':colors.body;
 if(e.bossType==='golem'){
  // A broad ancient stone guardian, framed by roots and luminous runes.
  for(const side of [-1,1]){poly([[side*20,-20],[side*41,-13],[side*45,15],[side*27,24]],'#6a7970','#a3ad8d');poly([[side*4,12],[side*20,12],[side*24,33],[side*5,31]],'#57665d');line([[side*26,-16],[side*33,-34],[side*30,-46]],'#8c9a6d',5);line([[side*33,-34],[side*45,-40]],'#8c9a6d',3);}
  poly([[-27,-26],[0,-35],[27,-26],[25,18],[0,26],[-25,18]],'#778576','#bac09c');poly([[-17,-37],[0,-43],[17,-37],[16,-12],[0,-3],[-16,-12]],'#596960','#afbc9d');
  c.shadowColor='#cbff8c';c.shadowBlur=12;line([[-12,-25],[-4,-22]],'#d6ff9f',3);line([[4,-22],[12,-25]],'#d6ff9f',3);line([[0,0],[-8,8],[0,16],[8,8],[0,0]],'#c0f08a',3);c.shadowBlur=0;
  for(const side of [-1,1]){line([[side*21,-17],[side*15,-6],[side*20,4]],'#344b40');poly([[side*23,-24],[side*16,-31],[side*29,-32]],'#739063');}c.restore();return;
 }
 if(e.bossType==='wisp'){
  c.translate(0,Math.sin(time*4)*4);c.save();c.globalAlpha=.3;c.strokeStyle=colors.eye;c.lineWidth=2;for(let i=0;i<3;i++){c.beginPath();c.ellipse(0,4,38+i*6,20+i*3,time*.4+i,0,7);c.stroke();}c.restore();
  poly([[0,-42],[-23,-25],[-32,2],[-23,23],[-15,11],[-5,30],[5,13],[20,25],[29,3],[21,-27]],body,colors.edge);
  for(const side of [-1,1])poly([[side*12,-29],[side*26,-43],[side*23,-17]],'#b06c51');
  poly([[-16,-17],[0,-27],[16,-17],[11,5],[0,14],[-11,5]],'#211d2b');
  line([[-10,-12],[-3,-8]],colors.eye,3);line([[3,-8],[10,-12]],colors.eye,3);
  for(let i=0;i<4;i++){const a=time*2+i*Math.PI/2;c.fillStyle=colors.eye;c.beginPath();c.ellipse(Math.cos(a)*35,Math.sin(a)*19,3,7,a,0,7);c.fill();}
  c.restore();return;
 }
 // Tattered cloak, pointed boots and hunched shoulders replace round toy proportions.
 poly([[-15,-12],[-25,24],[-13,20],[-7,30],[2,22],[14,29],[25,19],[15,-13]],colors.cloth);
 for(const side of [-1,1]){const y=step*side;poly([[side*5,9],[side*15,9],[side*17,25+y],[side*5,27+y]],body);}
 const width=brute?26:runner?14:19;
 poly([[-width,-18],[0,-24],[width,-18],[width-3,12],[0,20],[-width+3,12]],body,colors.edge);
 if(region===0){
  // Ironbound raiders: riveted plates, spiked pauldrons, slit-faced helmets.
  for(const side of [-1,1])poly([[side*13,-16],[side*25,-24],[side*31,-9],[side*18,-5]],body,colors.edge);
  line([[0,-18],[0,13]],colors.edge);poly([[-5,-9],[5,-9],[3,0],[-3,0]],colors.cloth);
 }else if(region===1){
  // Thornborn: root limbs, split bark and branch antlers.
  for(const side of [-1,1]){line([[side*16,-9],[side*27,3],[side*23,20]],colors.edge,7);line([[side*26,5],[side*34,-3]],colors.edge,3);line([[side*8,-29],[side*16,-43],[side*27,-48]],colors.edge,3);line([[side*16,-43],[side*13,-51]],colors.edge,3);}
  line([[-5,-16],[3,-6],[-4,6],[4,15]],'#acac75',2);
 }else{
  // Ashbound: jagged obsidian armor with hot fissures and swept horns.
  for(const side of [-1,1])poly([[side*12,-15],[side*27,-26],[side*30,-8],[side*19,-2]],body,colors.edge);
  line([[-8,-15],[-2,-4],[-6,3],[4,12]],colors.eye,2);
 }
 // Raised chest plates and rivets catch the regional rim light.
 if(region===0){for(const side of [-1,1]){line([[side*3,-16],[side*15,-12],[side*12,0]],'#b0bec7',1.4);for(let i=0;i<3;i++){c.fillStyle='#c4ac82';c.beginPath();c.arc(side*(17+i*3),-13+i*2,1.3,0,7);c.fill();}}}
 if(region===1){for(const side of [-1,1])poly([[side*16,-10],[side*24,-21],[side*25,-11],[side*19,-5]],'#8aaa71');}
 if(region===2){c.shadowColor=colors.eye;c.shadowBlur=8;for(const side of [-1,1])line([[side*14,-16],[side*19,-8],[side*15,-3]],'#ffc280',1.5);c.shadowBlur=0;}
 if(region>=3){for(const side of [-1,1]){if(region===3||region===4)poly([[side*18,-17],[side*24,-40],[side*31,-17]],colors.edge);else if(region===5||region===7)line([[side*14,-24],[side*24,-35],[side*29,-27]],colors.eye,3);else if(region===8)poly([[side*17,-14],[side*38,-27],[side*30,-6]],colors.edge);}if(region===9){c.save();c.strokeStyle=colors.eye;c.globalAlpha=.5;c.beginPath();c.ellipse(0,-22,27,37,time*.4,0,7);c.stroke();c.restore();}}
 const hy=runner?-20:-25;
 c.save();c.translate(0,hy);
 poly(archer?[[-17,7],[-15,-14],[0,-23],[15,-14],[17,7],[0,14]]:[[-14,-13],[0,-19],[14,-13],[13,6],[0,15],[-13,6]],archer?colors.cloth:body,colors.edge);
 poly([[-10,-5],[0,-9],[10,-5],[8,6],[0,10],[-8,6]],'#111721');
 c.shadowColor=colors.eye;c.shadowBlur=7;line([[-9,-4],[-3,-1]],colors.eye,2.5);line([[3,-1],[9,-4]],colors.eye,2.5);c.shadowBlur=0;
 if(region===2||boss)for(const side of [-1,1])poly([[side*10,-12],[side*24,-27],[side*18,-6]],colors.edge);
 if(region===1)line([[0,1],[0,8]],colors.edge);else{line([[-11,-12],[0,-17],[11,-12]],'#d5d9d5',1);line([[0,-16],[0,-8]],colors.edge,2);}if(boss)poly([[-12,-17],[-15,-27],[-5,-23],[0,-32],[5,-23],[15,-27],[12,-17]],'#c6a674');
 c.restore();
 // Role-specific weapons remain obvious across all three factions.
 c.save();
 if(archer){
  // Bow spans the chest; its arrow points toward the hero, not sideways.
  c.rotate(Math.atan2(-(200-e.x),535-e.y));
  const draw=e.wind>=0?Math.max(0,Math.min(1,1-e.wind/.8)):0,bowY=17,pull=bowY-5-draw*14;
  line([[-15,-4],[-18,5],[0,bowY]],colors.edge,6);
  line([[15,-4],[12,9],[0,pull]],colors.edge,6);
  c.strokeStyle=colors.edge;c.lineWidth=3;c.beginPath();c.moveTo(-24,bowY-7);c.quadraticCurveTo(0,bowY+18,24,bowY-7);c.stroke();
  line([[-24,bowY-7],[0,pull],[24,bowY-7]],'#e1d3b0',1.2);
  line([[0,pull-3],[0,bowY+22]],'#d8c291',2);
  poly([[0,bowY+28],[-4,bowY+19],[4,bowY+19]],colors.eye);
  line([[-4,pull-3],[0,pull+2],[4,pull-3]],colors.cloth,2);
  for(const [x,y] of [[0,bowY],[0,pull]]){c.fillStyle=colors.edge;c.beginPath();c.arc(x,y,3.5,0,7);c.fill();}
 }else{c.translate(width+4,e.wind>=0?-12:7+step);c.rotate(e.wind>=0?-.3:.15);}
 if(archer){/* Bow and both gripping hands drawn above. */}
 else if(brute){line([[0,15],[0,-26]],'#66594d',5);poly([[-13,-38],[12,-40],[17,-19],[-13,-17]],body,colors.edge);line([[-6,-34],[2,-26],[-3,-20]],colors.eye,2);}
 else {line([[0,15],[0,-9]],'#8a7158',4);poly([[-4,-9],[-3,-32],[3,-43],[6,-13]],region===1?'#a9b28b':region===2?'#d49b73':'#bbc0c8');line([[-8,-9],[8,-9]],colors.edge,3);if(runner){c.translate(-40,6);poly([[-3,0],[0,-20],[5,-5]],colors.edge);}}
 c.restore();c.restore();
}
