from pathlib import Path
p=Path('app/page.tsx');s=p.read_text(encoding='utf-8-sig')
s=s.replace("import { drawRunner }", "import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';\nimport { drawRunner }")
s=s.replace('equipped?:number;', 'equipped?:number; bestWave?:number;')
s=s.replace('combo:0,guardAge:', 'chargedFx:0,parryFx:0,combo:0,guardAge:')
s=s.replace('coins:valid(raw.coins,1000000000),','coins:valid(raw.coins,1000000000),bestWave:valid(raw.bestWave,1000000),')
s=s.replace("if(charged){g.notice=", "if(charged){g.chargedFx=.4;g.notice=")
s=s.replace("g.notice='PERFECT GUARD';", "g.parryFx=.6;g.notice='PERFECT GUARD';")
s=s.replace('g.time+=dt;', 'g.time+=dt;g.chargedFx=Math.max(0,g.chargedFx-dt);g.parryFx=Math.max(0,g.parryFx-dt);')
s=s.replace("if(g.coins>earnedBefore)persist({...progress.current,coins:progress.current.coins+g.coins-earnedBefore});", "if(g.coins>earnedBefore||g.wave>(progress.current.bestWave??0))persist({...progress.current,coins:progress.current.coins+g.coins-earnedBefore,bestWave:Math.max(g.wave,progress.current.bestWave??0)});")
s=s.replace('    drawEffects(ctx',"""    if(g.chargedFx>0){ctx.save();ctx.globalAlpha=g.chargedFx/.4;ctx.strokeStyle='#fff0b1';ctx.lineWidth=8;ctx.beginPath();ctx.arc(200,535,95+(1-g.chargedFx/.4)*35,Math.PI,Math.PI*2);ctx.stroke();ctx.restore();}
    if(g.parryFx>0){ctx.save();ctx.globalAlpha=g.parryFx/.6;ctx.strokeStyle='#a5f4ff';ctx.lineWidth=5;ctx.beginPath();ctx.arc(200,535,48+(1-g.parryFx/.6)*70,0,Math.PI*2);ctx.stroke();ctx.restore();}
    if(boss&&boss.wind>=0&&(boss.stun??0)<=0){const ranged=boss.y<400;ctx.save();ctx.fillStyle=ranged?'#f4b06a22':'#ff716922';ctx.fillRect(150,boss.y+35,100,Math.max(0,510-boss.y-35));ctx.fillStyle='#ffe0ac';ctx.font='bold 15px system-ui';ctx.fillText(ranged?'VOLLEY — RAISE SHIELD':'HEAVY STRIKE — BLOCK',200,79);ctx.restore();}
    drawEffects(ctx""")
s=s.replace('<h2>Training grounds</h2><p>{saved.coins} coins available</p><div className="upgrade-list">', '<h2>Prepare for battle</h2><p>{saved.coins} coins available</p><button className="upgrade-entry back-run" onClick={()=>setShop(false)}>Back to run</button><Tabs defaultValue="skills" className="shop-tabs"><TabsList aria-label="Upgrade category"><TabsTrigger value="skills">Skills</TabsTrigger><TabsTrigger value="weapons">Weapons</TabsTrigger></TabsList><TabsContent value="skills"><div className="upgrade-list">')
s=s.replace('</div><h3>Armoury</h3>', '</div></TabsContent><TabsContent value="weapons"><h3>Armoury</h3>')
s=s.replace('</div><button className="primary" onClick={()=>setShop(false)}>Back to run</button>', '</div></TabsContent></Tabs>')
s=s.replace("{hud.mode==='ready'&&<div className=\"instructions\">", """{hud.mode==='lost'&&<><div className="run-summary"><div><b>{hud.wave}</b><span>Wave reached</span></div><div><b>{saved.bestWave??hud.wave}</b><span>Best wave</span></div><div><b>+{hud.coins}</b><span>Coins earned</span></div><div><b>{hud.blocks}</b><span>Blocks</span></div></div><div className="affordable"><strong>Next purchase</strong><p>{nextPurchase?`${nextPurchase.name} · ${nextPurchase.cost} coins${saved.coins>=nextPurchase.cost?' — affordable now':` — ${nextPurchase.cost-saved.coins} more needed`}`:'All skills and weapons unlocked.'}</p></div></>}{hud.mode==='ready'&&<div className="instructions">""")
s=s.replace(' return <main>',""" const candidates=([
 ...(['sword','magic','shield'] as Branch[]).flatMap(branch=>saved[branch]<3?[{name:`${branch} rank ${saved[branch]+1}`,cost:costs[saved[branch]]}]:!saved[advanced[branch].key]?[{name:advanced[branch].name,cost:200}]:[]),
 ...((saved.unlocked??0)<2?[{name:weapons[(saved.unlocked??0)+1].name,cost:weapons[(saved.unlocked??0)+1].cost}]:[])
 ]).sort((a,b)=>a.cost-b.cost);const nextPurchase=candidates[0];
 return <main>""")
p.write_text(s,encoding='utf-8')
