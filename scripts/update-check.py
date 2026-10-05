from pathlib import Path
p=Path('scripts/combat-check.cjs');s=p.read_text();s=s.replace('flash:0}',"flash:0,kind:'grunt',maxHp:3,speed:65,warning:.8}")
a=s.index("reset();listeners.keydown({code:'Space'",s.index("Release recovers"));b=s.index('reset();advance(2)',a)
s=s[:a]+'''reset();g.time=90;advance(.01);assert.equal(g.mode,'playing','No time limit');
reset();const kinds=new Set();let cleared=0;
for(let i=0;i<30000&&g.wave<7;i++){for(const e of g.enemies){kinds.add(e.kind);e.hp=0;}advance(.01);cleared=Math.max(cleared,g.wave-1);}
assert.equal(g.wave,7,'Waves continue beyond first boss');assert.equal(g.mode,'playing');assert.equal(kinds.size,4,'All four enemy types spawned');assert.ok(g.coins>100,'Kills and wave rewards credited');
reset();g.wave=5;g.remaining=1;g.spawn=0;advance(.01);assert.equal(g.enemies[0].kind,'boss');assert.ok(g.enemies[0].hp>28);
g.enemies[0].y=471;g.enemies[0].wind=.01;advance(.02);assert.equal(g.hp,3,'Boss hits for two health');g.enemies[0].hp=0;advance(.01);assert.equal(g.hp,4,'Boss clear heals one');assert.ok(g.rest>0);const coins=g.coins;advance(1);assert.equal(g.coins,coins,'Wave reward only awarded once');
reset();assert.equal(g.wave,1);assert.equal(g.coins,0);assert.equal(g.remaining,4);
''' +s[b:];s=s.replace('complete trial, pause.','endless waves, enemy variety, boss damage/rewards, reset, pause.')
p.write_text(s)
