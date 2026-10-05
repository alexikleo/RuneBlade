from pathlib import Path
p=Path('app/page.tsx');s=p.read_text(encoding='utf-8-sig')
s=s.replace('cost:80,damage:3','cost:140,damage:3').replace('cost:200,damage:4.5','cost:360,damage:4.5').replace('const costs=[20,50,100]','const costs=[20,90,180]')
s=s.replace("e.preventDefault();if(e.repeat||game.current.mode!=='playing')return;", "if(game.current.mode!=='playing')return;e.preventDefault();if(e.repeat)return;")
s=s.replace("else{g.hp-=e.kind==='boss'?2:1;g.hurt=.25;", "else if(g.hurt<=0){g.hp-=e.kind==='boss'?2:1;g.hurt=.4;")
s=s.replace("else{g.hp--;g.hurt=.25;", "else if(g.hurt<=0){g.hp--;g.hurt=.4;")
s=s.replace('    if(g.hurt>0){ctx.fillStyle=`rgba(230,70,50,${g.hurt})`;', '    if(g.hurt>0){ctx.fillStyle=`rgba(230,70,50,${g.hurt*.6})`;')
s=s.replace('NEW THREATS · PHASE 06','DESKTOP BALANCE · PHASE 06')
p.write_text(s,encoding='utf-8')
p=Path('scripts/combat-check.cjs');s=p.read_text(encoding='utf-8-sig');s=s.replace('coins:300,sword:1','coins:600,sword:1').replace("coins,300,'Cannot skip", "coins,600,'Cannot skip").replace('current.coins,220','current.coins,460').replace('current.coins,20);assert.equal(JSON.parse','current.coins,100);assert.equal(JSON.parse')
s+='''
reset();g.remaining=0;g.hostile=[0,1,2].map(()=>({x:200,y:500,vx:0,vy:200}));advance(.04);assert.equal(g.hp,4,'Simultaneous volley counts as one hit');advance(.45);g.hostile=[{x:200,y:500,vx:0,vy:200}];advance(.04);assert.equal(g.hp,3,'Later attacks hurt after recovery');
const loadSave=effects.find(f=>f.toString().includes("getItem('runeblade-progress-v1')"));assert.ok(loadSave);
storage.set('runeblade-progress-v1',JSON.stringify({coins:123,sword:2,magic:1,shield:3,unlocked:2,equipped:1}));loadSave();assert.equal(api.progress.current.coins,123);assert.equal(api.progress.current.equipped,1);assert.equal(api.progress.current.shield,3,'Reload restores upgrades');
storage.set('runeblade-progress-v1',JSON.stringify({coins:42,sword:1,magic:0,shield:0}));loadSave();assert.equal(api.progress.current.coins,42);assert.equal(api.progress.current.equipped,0,'Old saves migrate');
storage.set('runeblade-progress-v1',JSON.stringify({coins:-5,sword:99,unlocked:0,equipped:2}));loadSave();assert.equal(api.progress.current.coins,0);assert.equal(api.progress.current.sword,0);assert.equal(api.progress.current.equipped,0,'Invalid values cannot unlock weapons');
const previous=api.progress.current;storage.set('runeblade-progress-v1','broken');loadSave();assert.equal(api.progress.current,previous,'Corrupt save does not crash or overwrite session progress');
console.log('PASS: damage recovery, saved reload, legacy save migration, invalid and corrupt saves.');
''';p.write_text(s,encoding='utf-8')
