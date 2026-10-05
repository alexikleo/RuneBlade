from pathlib import Path
p=Path('app/page.tsx');s=p.read_text(encoding='utf-8-sig')
s=s.replace("'brute' | 'boss';", "'brute' | 'boss' | 'archer'; casts?:number;")
s=s.replace("type Mode =", "type Shot = {x:number;y:number;vx:number;vy:number};\nconst regions=[{name:'Old road',floor:'#101e25',edge:'#0b171d',lines:'#27363b'},{name:'Mosswood',floor:'#1b3027',edge:'#101e18',lines:'#33483a'},{name:'Ember ruins',floor:'#352628',edge:'#21191e',lines:'#53393a'}];\ntype Mode =")
s=s.replace('bolts:[] as Bolt[],','bolts:[] as Bolt[],hostile:[] as Shot[],').replace('enemies:[],bolts:[],','enemies:[],bolts:[],hostile:[],')
s=s.replace("g.wave%5===0?'boss':g.wave>=3", "g.wave%5===0?'boss':g.wave>=3&&g.remaining%4===0?'archer':g.wave>=3")
s=s.replace("kind==='brute'?8:kind==='runner'", "kind==='brute'?8:kind==='archer'?5:kind==='runner'")
s=s.replace("if(e.hp<=0)continue;if(e.y<470)","""if(e.hp<=0)continue;
     if((e.kind==='archer'||e.kind==='boss')&&(e.casts??0)<(e.kind==='boss'?1:2)&&e.y>=275&&e.y<400){
      if(e.wind<0){e.wind=e.warning;g.notice=e.kind==='boss'?'BOSS VOLLEY — BLOCK':'ARCHER AIMING';g.noticeTime=1;}
      else {e.wind-=dt;if(e.wind<=0){const count=e.kind==='boss'?3:1;for(let n=0;n<count;n++){const x=e.x+(n-(count-1)/2)*32,y=e.y;const length=Math.hypot(200-x,535-y);g.hostile.push({x,y,vx:(200-x)/length*200,vy:(535-y)/length*200});}e.casts=(e.casts??0)+1;e.wind=-1;}}
      continue;
     }
     if(e.y<470)""")
s=s.replace('e.y=380;e.wind=-1;',"e.y=e.kind==='boss'?280:380;if(e.kind==='boss')e.casts=0;e.wind=-1;")
s=s.replace('    for(const defeated',"""    for(const shot of g.hostile){shot.x+=shot.vx*dt;shot.y+=shot.vy*dt;if(shot.y>=505){if(shield&&g.stamina>=10){g.stamina-=10;g.blocks++;g.notice='PROJECTILE BLOCKED';sound('block');burst(shot.x,505,'#b1eaff');}else{g.hp--;g.hurt=.25;g.notice='HIT';sound('hurt');}g.noticeTime=.65;shot.y=700;}}
    g.hostile=g.hostile.filter(shot=>shot.y<650);
    for(const defeated""")
s=s.replace("e.kind==='brute'?5:2","e.kind==='brute'||e.kind==='archer'?5:2")
s=s.replace("!g.enemies.length&&g.rest<=0","!g.enemies.length&&!g.hostile.length&&g.rest<=0")
s=s.replace("ctx.clearRect(0,0,400,610);ctx.fillStyle='#101e25';","const region=regions[Math.floor((g.wave-1)/5)%3];ctx.clearRect(0,0,400,610);ctx.fillStyle=region.floor;")
s=s.replace("ctx.strokeStyle='#27363b';","ctx.strokeStyle=region.lines;").replace("ctx.fillStyle='#0b171d';","ctx.fillStyle=region.edge;")
s=s.replace('    drawRunner(ctx',"    for(const shot of g.hostile){ctx.fillStyle='#ff9e6e';ctx.shadowColor='#ff643d';ctx.shadowBlur=12;ctx.beginPath();ctx.arc(shot.x,shot.y,6,0,7);ctx.fill();ctx.shadowBlur=0;}\n    drawRunner(ctx")
s=s.replace('COMBAT POLISH · PHASE 05','NEW THREATS · PHASE 06')
s=s.replace('<span className="chapter">{weapons[saved.equipped??0].name}</span>', '<span className="chapter">{regions[Math.floor((hud.wave-1)/5)%3].name}</span>')
s=s.replace('Fight endless waves. A boss awaits every fifth wave.','Archers join from wave 3. Block orange projectiles. Bosses fire a volley, then close in.')
p.write_text(s,encoding='utf-8')
p=Path('app/effects.ts');s=p.read_text(encoding='utf-8-sig');s=s.replace("const size=boss?", "const archer=e.kind==='archer';\n const size=boss?");s=s.replace("runner?'#696298':'#547a73'","archer?'#9c784e':runner?'#696298':'#547a73'");s=s.replace('ctx.restore();\n}',"if(archer){ctx.strokeStyle='#e6bd7c';ctx.lineWidth=3;ctx.beginPath();ctx.arc(26,0,18,-Math.PI/2,Math.PI/2);ctx.stroke();ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(26,-18);ctx.lineTo(26,18);ctx.stroke();}ctx.restore();\n}",1);p.write_text(s,encoding='utf-8')
