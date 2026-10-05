from pathlib import Path
p=Path('app/page.tsx');s=p.read_text(encoding='utf-8-sig')
s=s.replace("flash: number };","flash: number; kind: 'grunt' | 'runner' | 'brute' | 'boss'; maxHp: number; speed: number; warning: number };")
s=s.replace(" | 'won'",'')
s=s.replace('time:0,kills:0,blocks:0','time:0,wave:1,remaining:4,rest:0,coins:0,kills:0,blocks:0')
s=s.replace("g.spawn-=dt;if(g.spawn<=0&&g.time<60){g.enemies.push({x:145+Math.random()*110,y:-25,hp:3,wind:-1,flash:0});g.spawn=Math.max(1.35,3.3-g.time*.032);}",'''if(g.rest>0){g.rest-=dt;if(g.rest<=0){g.wave++;g.remaining=g.wave%5===0?1:Math.min(18,3+g.wave);g.spawn=.7;g.notice=g.wave%5===0?'BOSS WAVE '+g.wave:'WAVE '+g.wave;g.noticeTime=2;}}
    else if(g.remaining>0){g.spawn-=dt;if(g.spawn<=0){
     const kind:Enemy['kind']=g.wave%5===0?'boss':g.wave>=3&&g.remaining%3===0?'brute':g.wave>=2&&g.remaining%2===0?'runner':'grunt';
     const base=kind==='boss'?28:kind==='brute'?8:kind==='runner'?2:3;
     const hp=base*(1+(g.wave-1)*.09);
     g.enemies.push({x:145+Math.random()*110,y:-25,hp,maxHp:hp,kind,speed:(kind==='runner'?125:kind==='brute'?48:kind==='boss'?42:65)*Math.min(1.8,1+g.wave*.025),warning:kind==='runner'?.55:kind==='boss'?1.1:.8,wind:-1,flash:0});
     g.remaining--;g.spawn=Math.max(.65,2.5-g.wave*.12);
    }}''')
s=s.replace('e.y+=(65+g.time*.45)*dt','e.y+=e.speed*dt').replace('e.wind=.8','e.wind=e.warning')
s=s.replace("if(shield&&g.stamina>=15){g.stamina-=15;", "const cost=e.kind==='boss'?30:15;if(shield&&g.stamina>=cost){g.stamina-=cost;")
s=s.replace("g.hp--;g.hurt=.25", "g.hp-=e.kind==='boss'?2:1;g.hurt=.25")
s=s.replace('g.kills+=g.enemies.filter(e=>e.hp<=0).length;',"g.coins+=g.enemies.filter(e=>e.hp<=0).reduce((sum,e)=>sum+(e.kind==='boss'?50:e.kind==='brute'?5:2),0);g.kills+=g.enemies.filter(e=>e.hp<=0).length;")
s=s.replace("else if(g.time>=60&&!g.enemies.length){g.mode='won';release();}","else if(g.remaining===0&&!g.enemies.length&&g.rest<=0){g.rest=3;g.coins+=g.wave*5;g.stamina=100;g.broken=false;if(g.wave%5===0)g.hp=Math.min(5,g.hp+1);g.notice='WAVE CLEAR · +'+g.wave*5+' COINS';g.noticeTime=3;}")
s=s.replace("ctx.font='37px system-ui';ctx.fillText('👹',e.x,e.y+12)","ctx.font=(e.kind==='boss'?'64':e.kind==='brute'?'46':'37')+'px system-ui';ctx.fillText(e.kind==='boss'?'👺':e.kind==='runner'?'👾':e.kind==='brute'?'🧌':'👹',e.x,e.y+12)")
s=s.replace('Math.max(0,e.hp)/3','Math.max(0,e.hp)/e.maxHp').replace('(1-e.wind/.8)','(1-e.wind/e.warning)')
s=s.replace('time:g.time,kills:g.kills','time:g.time,wave:g.wave,remaining:g.remaining,rest:g.rest,coins:g.coins,kills:g.kills')
s=s.replace("seconds:Math.floor(g.time)","wave:g.wave,coins:g.coins")
s=s.replace('PLAYABLE PROTOTYPE · 01','ENDLESS RUN · PHASE 03').replace('One minute to survive.','How far can you run?').replace('The first trial','The endless road')
s=s.replace('{Math.max(0,60-Math.floor(hud.time))}<small>s</small>','{hud.wave}').replace("{hud.time>=60?'CLEAR THE PATH':'SURVIVE'}","{hud.wave%5===0?'BOSS WAVE':'WAVE'}")
s=s.replace("'COMBAT TRIAL · 01'","'THE ENDLESS ROAD'").replace("'TRIAL COMPLETE'","'RUN ENDED'")
s=s.replace("hud.mode==='won'?'Path cleared.':",'')
s=s.replace('`${hud.kills} enemies defeated · ${hud.blocks} attacks blocked`','`Wave ${hud.wave} reached · ${hud.kills} defeated · ${hud.coins} coins earned`')
s=s.replace('Begin trial','Begin run').replace('Resume trial','Resume run').replace('Survive 60 seconds, then defeat the remaining enemies.','Fight endless waves. A boss awaits every fifth wave.')
s=s.replace('STAGE 01 / COMBAT TEST','{hud.rest>0?\'NEXT WAVE APPROACHING\':`${hud.remaining} INCOMING`} · {hud.coins} COINS')
p.write_text(s,encoding='utf-8')
