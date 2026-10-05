export type GearKind='sword'|'magic'|'shield';
export type GearSave={sword:number[];magic:number[];shield:number[];magicEquipped:number;shieldEquipped:number};
export type GearItem={name:string;color:string;cost:number;damage:number;family:number};
const swordNames=['Iron sword','Knight’s blade','Runic sword','Thornfang','Ember Cleaver','Frostbite','Stormfang','Moonsteel','Dusk Reaver','Sunbreaker','Venom Edge','Dragon Tooth','Crystal Saber','Soul Harvester','Phoenix Blade','Glacier King','Thunder Crown','Void Splitter','Astral Edge','Eclipse','Worldbreaker'];
const magicNames=['Arcane Bolt','Fireball','Ice Lance','Chain Spark','Rune Spear','Star Volley','Inferno','Glacial Shard','Thunderbolt','Crystal Ray','Moon Barrage','Dragonfire','Winter Star','Storm Surge','Soul Lance','Astral Rain','Phoenix Flare','Absolute Zero','Tempest','Oblivion Ray'];
const shieldNames=['Iron Guard','Oak Bulwark','Ember Crest','Frost Ward','Storm Disc','Moon Aegis','Thorn Wall','Dragon Scale','Crystal Bastion','Dusk Sentinel','Sun Defender','Venom Shell','Runic Fortress','Phoenix Wing','Glacier Wall','Thunder Wheel','Soul Keeper','Astral Barrier','Eclipse Guard','Eternal Aegis','Captain America Shield'];
const palette=['#d8e4ed','#f2ce80','#8ceaff','#a2dd83','#ff9968','#9ce9ff','#d0b1ff','#c7d5ff','#bc89db','#ffe297','#91e5af','#f3958a','#b8f4e2','#b69adb','#ffc1a0','#b6e8ff','#e8d0ff','#bd92ff','#a9e6ff','#f6dc9f','#ffeba8'];
export const catalog:Record<GearKind,GearItem[]>={sword:swordNames.map((name,i)=>({name,color:palette[i],cost:i===0?0:i===1?140:i===2?360:Math.round(160*Math.pow(i,1.55)/10)*10,damage:i===0?2:i===1?3:i===2?4.5:4.5*Math.pow(1.19,i-2),family:i%5})),magic:magicNames.map((name,i)=>({name,color:['#8eeaff','#ff9968','#a1e9ff','#d0b1ff','#efcf8c'][i%5],cost:i?Math.round(130*Math.pow(i,1.55)/10)*10:0,damage:.7*Math.pow(1.2,i),family:i%5})),shield:shieldNames.map((name,i)=>({name,color:palette[i],cost:i?Math.round(120*Math.pow(i,1.55)/10)*10:0,damage:1.5*Math.pow(1.18,i),family:i%5}))};
catalog.sword.push({name:'Infinity Saber',color:'#f2d5ff',cost:0,damage:180,family:4});
export function gearDefaults(unlocked=0):GearSave{return {sword:catalog.sword.map((_,i)=>i<21&&i<=unlocked?0:-1),magic:catalog.magic.map((_,i)=>i===0?0:-1),shield:catalog.shield.map((_,i)=>i===0?0:-1),magicEquipped:0,shieldEquipped:0};}
export function loadGear(raw:unknown,unlocked:number,infinity=false):GearSave{const fallback=gearDefaults(unlocked);if(infinity)fallback.sword[21]=0;if(!raw||typeof raw!=='object')return fallback;const data=raw as Record<string,unknown>;for(const kind of ['sword','magic','shield'] as GearKind[]){const ranks=data[kind];if(Array.isArray(ranks)){let locked=false;fallback[kind]=catalog[kind].map((_,i)=>{const v=ranks[i];if(kind==='sword'&&i===21)return infinity?(Number.isInteger(v)&&v>=0&&v<=10?v:0):-1;if(i===0)return Number.isInteger(v)&&v>=0&&v<=10?v:0;if(locked||!Number.isInteger(v)||v<0||v>10){locked=true;return -1;}return v;});}}for(const kind of ['magic','shield'] as const){const key=kind==='magic'?'magicEquipped':'shieldEquipped',v=data[key];fallback[key]=typeof v==='number'&&Number.isInteger(v)&&v>=0&&v<catalog[kind].length&&fallback[kind][v]>=0?v:0;}if(infinity)fallback.sword[21]=Math.max(0,fallback.sword[21]);return fallback;}
export function upgradePrice(kind:GearKind,index:number,rank:number){return Math.round((30+(kind==='sword'&&index===21?10000:catalog[kind][index].cost)*.16)*(rank+1));}
export function gearDamage(kind:GearKind,index:number,rank=0){return catalog[kind][index].damage*(1+Math.max(0,rank)*.12);}
export function shieldEfficiency(index:number,rank:number){return Math.min(.65,index*.025+Math.max(0,rank)*.015);}
export function throwCooldown(index:number,rank:number){return Math.max(4,8-index*.12-Math.max(0,rank)*.1);}
// Identical geometry is used by the catalogue preview and the live game.
export function drawGear(c:CanvasRenderingContext2D,kind:GearKind,index:number,rank:number,time=0){const item=catalog[kind][index]??catalog[kind][0];c.save();c.strokeStyle=item.color;c.fillStyle=item.color;c.lineWidth=2;c.lineJoin='round';c.shadowColor=item.color;c.shadowBlur=index>1||rank>0?6+rank:0;
if(kind==='sword'&&index===21){c.save();c.strokeStyle='#bdf7ff';c.lineWidth=2;for(let i=0;i<2;i++){c.beginPath();c.ellipse(0,-28,11,30,time*(i?1:-1),0,7);c.stroke();}c.restore();}if(kind==='sword'){const w=5+index%4,len=47+Math.floor(index/4)*3;c.beginPath();c.moveTo(-w,-8);c.lineTo(-w,-len+12);if(index%3===1)c.lineTo(-w-5,-len+6);c.lineTo(0,-len-7);if(index%3===2)c.lineTo(w+5,-len+4);c.lineTo(w,-len+12);c.lineTo(w,-8);c.closePath();c.fill();c.shadowBlur=0;c.fillStyle='#fff9dd';c.fillRect(-1,-len+8,2,len-19);c.strokeStyle=index%2?'#d9bb73':item.color;c.lineWidth=4;c.beginPath();c.moveTo(-13,-8);c.quadraticCurveTo(0,index%2?-1:-14,13,-8);c.stroke();c.fillStyle='#725444';c.fillRect(-3,-7,6,17);c.fillStyle=item.color;c.beginPath();c.arc(0,12,4,0,7);c.fill();}
else if(kind==='shield'){
 const r=20;
 if(index===20){
  c.shadowColor='#77bcff';c.shadowBlur=8+Math.max(0,rank);
  for(const [radius,color] of [[21,'#d74448'],[16,'#edf3ff'],[12,'#d74448'],[8,'#2865b0']] as const){c.fillStyle=color;c.beginPath();c.arc(0,0,radius,0,Math.PI*2);c.fill();}
  c.shadowBlur=0;c.fillStyle='#fff';c.beginPath();for(let i=0;i<10;i++){const a=-Math.PI/2+i*Math.PI/5,rr=i%2?3:7;i?c.lineTo(Math.cos(a)*rr,Math.sin(a)*rr):c.moveTo(Math.cos(a)*rr,Math.sin(a)*rr);}c.closePath();c.fill();
 }else{
  const shape=index%5;c.beginPath();
  if(shape===0)c.arc(0,0,r,0,Math.PI*2);
  else if(shape===1){c.moveTo(-18,-21);c.lineTo(18,-21);c.lineTo(16,10);c.lineTo(0,27);c.lineTo(-16,10);c.closePath();}
  else if(shape===2){c.moveTo(-23,-18);c.lineTo(-9,-12);c.lineTo(0,-25);c.lineTo(9,-12);c.lineTo(23,-18);c.lineTo(17,12);c.lineTo(0,25);c.lineTo(-17,12);c.closePath();}
  else if(shape===3){c.moveTo(0,-26);c.lineTo(19,-8);c.lineTo(15,15);c.lineTo(0,27);c.lineTo(-15,15);c.lineTo(-19,-8);c.closePath();}
  else{for(let i=0;i<12;i++){const a=-Math.PI/2+i*Math.PI/6,rr=i%2?17:24;i?c.lineTo(Math.cos(a)*rr,Math.sin(a)*rr):c.moveTo(Math.cos(a)*rr,Math.sin(a)*rr);}c.closePath();}
  c.fillStyle=index===1?'#785336':'#243545';c.fill();c.lineWidth=3;c.stroke();c.save();c.clip();c.globalAlpha=.35;c.fillStyle=item.color;c.fillRect(-22,-26,22,55);c.restore();
  if(index===1){for(const x of [-10,0,10]){c.beginPath();c.moveTo(x,-18);c.lineTo(x,18);c.stroke();}}
  c.shadowBlur=0;c.beginPath();c.moveTo(0,-12);c.lineTo(7,0);c.lineTo(0,12);c.lineTo(-7,0);c.closePath();c.fillStyle=item.color;c.fill();
  for(const side of [-1,1]){c.beginPath();c.moveTo(side*11,-10);c.lineTo(side*14,0);c.lineTo(side*10,10);c.stroke();}
 }
 if(rank>0){c.globalAlpha=.25+rank*.035;c.strokeStyle=item.color;c.lineWidth=1+rank*.1;c.beginPath();c.arc(0,0,25+Math.sin(time*3)*1.5,0,Math.PI*2);c.stroke();c.globalAlpha=1;}
}
else{c.rotate(Math.sin(time)*.15);const family=item.family;c.beginPath();if(family===1){c.moveTo(0,-25);c.quadraticCurveTo(27,8,0,18);c.quadraticCurveTo(-22,8,0,-25);}else if(family===2||family===4){c.moveTo(0,-27);c.lineTo(12,0);c.lineTo(0,22);c.lineTo(-12,0);c.closePath();}else if(family===3){c.moveTo(5,-25);c.lineTo(-13,3);c.lineTo(0,1);c.lineTo(-6,24);c.lineTo(15,-5);c.lineTo(2,-3);c.closePath();}else c.arc(0,0,14+rank*.4,0,7);c.fill();c.shadowBlur=0;c.fillStyle='#fffbe8';c.beginPath();c.arc(0,0,4,0,7);c.fill();for(let i=0;i<1+Math.floor(index/5);i++){const a=time*2+i*2*Math.PI/(1+Math.floor(index/5));c.beginPath();c.arc(Math.cos(a)*24,Math.sin(a)*19,2,0,7);c.fill();}}
if(rank>0&&!(kind==='shield'&&index===20)){c.shadowBlur=0;c.fillStyle='#fff6cd';for(let i=0;i<Math.ceil(rank/2);i++){c.beginPath();c.arc(kind==='sword'?0:-8+i*4,kind==='sword'?-18-i*5:0,1.3,0,7);c.fill();}}c.restore();}
