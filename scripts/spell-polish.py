from pathlib import Path
p=Path('app/page.tsx');s=p.read_text(encoding='utf-8-sig');s=s.replace("import { drawRunner }", "import { drawSpell, spellColors } from './spells';\nimport { drawRunner }")
s=s.replace("burst(target.x,target.y,'#8deaff');","burst(target.x,target.y,spellColors[progress.current.magic],progress.current.magic);")
a=s.index('    for(const b of g.bolts){ctx.shadowColor');b=s.index('\n',a)
s=s[:a]+"    for(const b of g.bolts)drawSpell(ctx,b.x,b.y,progress.current.magic,g.time,!!progress.current.piercing);"+s[b:]
p.write_text(s,encoding='utf-8')
p=Path('app/effects.ts');s=p.read_text(encoding='utf-8-sig');s=s.replace('color:string}[]','color:string;size:number}[]');a=s.index('export function burst(');b=s.index('\nexport function clearEffects',a)
s=s[:a]+"export function burst(x:number,y:number,color:string,power=0){const count=10+power*4;for(let i=0;i<count;i++){const a=i*Math.PI*2/count;sparks.push({x,y,vx:Math.cos(a)*(75+power*24),vy:Math.sin(a)*(75+power*24),life:.45,color,size:2.5+power*.45});}if(sparks.length>240)sparks.splice(0,sparks.length-240);}"+s[b:]
s=s.replace('ctx.arc(p.x,p.y,2.5,0,7)','ctx.arc(p.x,p.y,p.size*p.life/.45,0,7)');p.write_text(s,encoding='utf-8')
