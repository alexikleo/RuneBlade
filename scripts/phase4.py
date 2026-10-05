from pathlib import Path
p=Path('app/page.tsx');s=p.read_text(encoding='utf-8-sig');pos=s.index('export default')
s=s[:pos]+"type Branch = 'sword' | 'magic' | 'shield';\ntype Save = { coins:number; sword:number; magic:number; shield:number };\nconst costs=[20,50,100];\n"+s[pos:]
s=s.replace(' function release()', ''' const progress=useRef<Save>({coins:0,sword:0,magic:0,shield:0});
 const [saved,setSaved]=useState(progress.current);
 const [shop,setShop]=useState(false);
 const [saveMessage,setSaveMessage]=useState('');
 const [loaded,setLoaded]=useState(false);
 const ready=useRef(false);
 function persist(next:Save){progress.current=next;setSaved({...next});try{localStorage.setItem('runeblade-progress-v1',JSON.stringify(next));setSaveMessage('Saved on this browser');}catch{setSaveMessage('Storage unavailable — progress lasts only this session');}}
 function buy(branch:Branch){if(!ready.current||game.current.mode==='playing'||game.current.mode==='paused')return;const current=progress.current,rank=current[branch];if(rank>=3||current.coins<costs[rank])return;persist({...current,coins:current.coins-costs[rank],[branch]:rank+1});}
 useEffect(()=>{try{const raw=JSON.parse(localStorage.getItem('runeblade-progress-v1')||'null');if(raw&&typeof raw==='object'){const valid=(v:unknown,max:number)=>typeof v==='number'&&Number.isSafeInteger(v)&&v>=0&&v<=max?v:0;progress.current={coins:valid(raw.coins,1000000000),sword:valid(raw.sword,3),magic:valid(raw.magic,3),shield:valid(raw.shield,3)};setSaved({...progress.current});}setSaveMessage('Saved on this browser');}catch{setSaveMessage('Save unavailable — starting with fresh session progress');}ready.current=true;setLoaded(true);},[]);
 function release()''')
s=s.replace('function start(){release();','function start(){setShop(false);release();')
s=s.replace('e.hp-=2','e.hp-=2+progress.current.sword*.5').replace('target.hp-=.7','target.hp-=.7+progress.current.magic*.2')
s=s.replace('(shield?-24:19)','(shield?-(24-progress.current.shield*4):19)')
s=s.replace('g.time+=dt;', 'const earnedBefore=g.coins;g.time+=dt;')
s=s.replace("g.noticeTime=3;}\n   }","g.noticeTime=3;}\n    if(g.coins>earnedBefore)persist({...progress.current,coins:progress.current.coins+g.coins-earnedBefore});\n   }")
s=s.replace('ENDLESS RUN · PHASE 03','UPGRADES · PHASE 04')
s=s.replace('<div className="start-card"><span','<div className="start-card">{shop?<><span className="eyebrow">PREPARE FOR THE NEXT RUN</span><h2>Training grounds</h2><p>{saved.coins} coins available</p><div className="upgrade-list">{([\'sword\',\'magic\',\'shield\'] as Branch[]).map(branch=><div className="upgrade" key={branch}><strong>{branch===\'sword\'?\'Sword mastery\':branch===\'magic\'?\'Arcane power\':\'Shield endurance\'}</strong><span>Rank {saved[branch]} / 3 · {branch===\'sword\'?`${(2+saved.sword*.5).toFixed(1)} damage`:branch===\'magic\'?`${(.7+saved.magic*.2).toFixed(1)} bolt damage`:`${24-saved.shield*4} stamina / second`}</span><button disabled={!loaded||saved[branch]>=3||saved.coins<costs[saved[branch]]} onClick={()=>buy(branch)}>{saved[branch]>=3?\'Fully upgraded\':`Upgrade · ${costs[saved[branch]]} coins`}</button></div>)}</div><button className="primary" onClick={()=>setShop(false)}>Back to run</button></>:<><span')
s=s.replace('<button className="primary" onClick={()=>hud.mode', '<button className="primary" disabled={!loaded} onClick={()=>hud.mode')
s=s.replace('</span></div></div>}','</span>{hud.mode!==\'paused\'&&<button className="upgrade-entry" onClick={()=>setShop(true)}>Upgrades · {saved.coins} coins</button>}</>}<span className="footnote" role="status">{saveMessage}</span></div></div>}')
p.write_text(s,encoding='utf-8')
