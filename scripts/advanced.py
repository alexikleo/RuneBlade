from pathlib import Path
p=Path('app/page.tsx');s=p.read_text(encoding='utf-8-sig')
s=s.replace('casts?:number;', 'casts?:number; stun?:number;')
s=s.replace('type Bolt = { x: number; y: number };','type Bolt = { x: number; y: number; hit?: Enemy[] };')
s=s.replace('equipped?:number };','equipped?:number; charged?:boolean; piercing?:boolean; parry?:boolean };')
s=s.replace('const costs=',"const advanced={sword:{key:'charged',name:'Charged strike',description:'Every fourth successful swing deals double damage.'},magic:{key:'piercing',name:'Piercing bolts',description:'Each bolt can hit two enemies.'},shield:{key:'parry',name:'Perfect guard',description:'Block within 0.25s of raising your shield to stun nearby enemies.'}} as const;\nconst costs=")
s=s.replace('spawn:1,shot:0,','combo:0,guardAge:1,guardHeld:false,spawn:1,shot:0,')
s=s.replace(' function buy(branch:'," function buyAdvanced(branch:Branch){if(!ready.current||game.current.mode==='playing'||game.current.mode==='paused')return;const current=progress.current,key=advanced[branch].key;if(current[branch]<3||current[key]||current.coins<200)return;persist({...current,coins:current.coins-200,[key]:true});}\n function buy(branch:")
s=s.replace('shield:valid(raw.shield,3),','shield:valid(raw.shield,3),charged:raw.charged===true&&valid(raw.sword,3)===3,piercing:raw.piercing===true&&valid(raw.magic,3)===3,parry:raw.parry===true&&valid(raw.shield,3)===3,')
a=s.index('g.enemies.forEach(e=>{if(e.y>430)');b=s.index('\n useEffect',a)
s=s[:a]+"""const targets=g.enemies.filter(e=>e.y>430&&e.hp>0);const charged=progress.current.charged&&g.combo===3;if(targets.length){g.combo=charged?0:Math.min(3,g.combo+1);if(charged){g.notice='CHARGED STRIKE';g.noticeTime=.8;}}targets.forEach(e=>{e.hp-=(weapons[progress.current.equipped??0].damage+progress.current.sword*.5)*(charged?2:1);e.flash=.15;burst(e.x,e.y,charged?'#ffffff':'#f8d28c');});}
 function perfectGuard(){const g=game.current;if(!progress.current.parry||g.guardAge>.25)return;g.notice='PERFECT GUARD';g.noticeTime=.8;g.enemies.forEach(e=>{if(e.y>350){e.stun=1.2;e.wind=-1;burst(e.x,e.y,'#b1eaff');}});}
"""+s[b:]
s=s.replace('music(g.time);const earnedBefore',"const held=input.current.left.size>0;if(held&&!g.guardHeld)g.guardAge=0;else g.guardAge+=dt;g.guardHeld=held;\n    music(g.time);const earnedBefore")
s=s.replace('e.hp>0&&Math.abs(e.y-b.y)', 'e.hp>0&&!b.hit?.includes(e)&&Math.abs(e.y-b.y)')
s=s.replace("burst(target.x,target.y,'#8deaff');b.y=-100;", "burst(target.x,target.y,'#8deaff');(b.hit??=[]).push(target);if(!progress.current.piercing||b.hit.length>=2)b.y=-100;")
s=s.replace('if(e.hp<=0)continue;', 'if(e.hp<=0)continue;if((e.stun??0)>0){e.stun=Math.max(0,(e.stun??0)-dt);continue;}')
s=s.replace("sound('block');burst(200,495,'#b1eaff');", "sound('block');burst(200,495,'#b1eaff');perfectGuard();")
s=s.replace("sound('block');burst(shot.x,505,'#b1eaff');", "sound('block');burst(shot.x,505,'#b1eaff');perfectGuard();")
s=s.replace("for(const e of g.enemies){drawEnemy(ctx,e,g.time);", "for(const e of g.enemies){drawEnemy(ctx,e,(e.stun??0)>0?0:g.time);if((e.stun??0)>0){ctx.fillStyle='#b1eaff';ctx.font='14px system-ui';ctx.fillText('STUNNED',e.x,e.y-46);}")
s=s.replace("</button></div>)}</div><h3>Armoury", "</button><div className=\"advanced-skill\"><strong>{advanced[branch].name}</strong><span>{advanced[branch].description}</span><button disabled={!loaded||saved[branch]<3||!!saved[advanced[branch].key]||saved.coins<200} onClick={()=>buyAdvanced(branch)}>{saved[advanced[branch].key]?'Unlocked':saved[branch]<3?'Requires rank 3':'Unlock skill · 200 coins'}</button></div></div>)}</div><h3>Armoury")
s=s.replace("<div className=\"stage-label\">{hud.rest", "<div className=\"stage-label\">{saved.charged&&<span>{game.current.combo===3?'CHARGED STRIKE READY':`CHARGE ${game.current.combo}/3`} · </span>}{hud.rest")
p.write_text(s,encoding='utf-8')
