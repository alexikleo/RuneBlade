from pathlib import Path
p=Path('scripts/combat-check.cjs');s=p.read_text();s=s.replace('const refs=[],',"const storage=new Map();\nconst refs=[],")
s=s.replace('const sandbox={','const sandbox={localStorage:{getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,v)},')
s=s.replace("fs.readFileSync('app/page.tsx','utf8'),","fs.readFileSync('app/page.tsx','utf8').replace(' return <main>', ' globalThis.testApi={buy,progress}; return <main>'),")
s+='''
reset();g.enemies.push({x:200,y:100,hp:0,kind:'boss',maxHp:30,speed:42,warning:1.1,wind:-1,flash:0});advance(.01);
assert.ok(JSON.parse(storage.get('runeblade-progress-v1')).coins>=50,'Earnings persist immediately');
g.mode='lost';const api=sandbox.testApi;api.progress.current={coins:200,sword:0,magic:0,shield:0};api.buy('sword');assert.equal(api.progress.current.coins,180);assert.equal(api.progress.current.sword,1);assert.equal(JSON.parse(storage.get('runeblade-progress-v1')).sword,1);
reset();g.enemies.push({x:200,y:465,hp:5,kind:'grunt',maxHp:5,speed:65,warning:.8,wind:-1,flash:0});listeners.keydown({code:'Space',preventDefault(){},repeat:false});advance(.08);listeners.keyup({code:'Space'});assert.equal(g.enemies[0].hp,2.5,'Sword upgrade affects real combat');
api.buy('magic');assert.equal(api.progress.current.magic,0,'No purchases during a run');g.mode='lost';api.progress.current={coins:0,sword:0,magic:0,shield:0};api.buy('magic');assert.equal(api.progress.current.magic,0,'Cannot overspend');api.progress.current={coins:100,sword:3,magic:0,shield:0};api.buy('sword');assert.equal(api.progress.current.coins,100,'Max rank cannot be purchased again');
console.log('PASS: immediate coin persistence, purchase cost, saved ranks, combat benefit, purchase guards.');
'''
p.write_text(s)
