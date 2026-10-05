from pathlib import Path
p=Path('app/runner.ts');s=p.read_text(encoding='utf-8-sig');s="import {shape,oval,armor} from './cartoon';\n"+s
s=s.replace("ctx.fillStyle='#9eabb5';ctx.fillRect(side*10-5,12+step,10,10);","shape(ctx,side*10-6,12+step,12,12,'#596f86',4);oval(ctx,side*10-2,15+step,3,2,'#adccdc');")
a=s.index(" ctx.fillStyle='#9e4543';");b=s.index(' // Left arm',a)
s=s[:a]+""" ctx.fillStyle='#b33e56';ctx.strokeStyle='#502d42';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(-13,-10);ctx.quadraticCurveTo(-22,8,-17+stride*4,24);ctx.quadraticCurveTo(0,34,17+stride*4,24);ctx.quadraticCurveTo(22,8,13,-10);ctx.closePath();ctx.fill();ctx.stroke();
 armor(ctx,-14,-16,28,29,'#87b4cc');armor(ctx,-22,-15,13,15,'#accfe0');armor(ctx,9,-15,13,15,'#accfe0');shape(ctx,-13,6,26,6,'#785044',2);shape(ctx,-4,4,8,9,'#f5cf80',2);
"""+s[b:]
s=s.replace("ctx.fillStyle='#d4a77e';ctx.fillRect(-5,-2,10,10);","oval(ctx,0,3,6,7,'#f0bd96');")
a=s.index(" ctx.fillStyle='#526b7a';");b=s.index(' ctx.restore();',a)
s=s[:a]+""" armor(ctx,-13,-36,26,25,'#95bcd4');ctx.strokeStyle='#52758c';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(0,-34);ctx.lineTo(0,-14);ctx.stroke();
 ctx.fillStyle='#df6472';ctx.strokeStyle='#7b3149';ctx.beginPath();ctx.moveTo(-3,-32);ctx.bezierCurveTo(-13,-44,-5,-53,7,-50);ctx.bezierCurveTo(2,-44,12,-41,3,-31);ctx.closePath();ctx.fill();ctx.stroke();oval(ctx,-7,-29,3,5,'#e5f6fb');
"""+s[b:];p.write_text(s,encoding='utf-8')
p=Path('app/effects.ts');s=p.read_text(encoding='utf-8-sig');s="import {shape,oval,armor} from './cartoon';\n"+s
a=s.index(" ctx.fillStyle='#253039';");b=s.index(' if(boss)',a)
s=s[:a]+""" shape(ctx,-14,10+lift,12,16,'#38414a',5);shape(ctx,2,10-lift,12,16,'#38414a',5);
 ctx.translate(0,Math.abs(lift)*.4);const skin=e.flash?'#ffffff':boss?'#cd7779':brute?'#a3bb83':runner?'#b4a2da':'#8fbe8d';
 shape(ctx,-18,-14,36,33,boss?'#8e415c':brute?'#638578':archer?'#a48558':runner?'#73649e':'#507d79',11);
 shape(ctx,-26,-9+lift,11,24,skin,5);shape(ctx,15,-9-lift,11,24,skin,5);
 armor(ctx,-23,-17,16,11,boss?'#e6b45e':'#89aab5');armor(ctx,7,-17,16,11,boss?'#e6b45e':'#89aab5');shape(ctx,-16,9,32,6,'#755241',2);
 // Oversized faces, pointed ears and readable expressions at game scale.
 oval(ctx,-14,-19,7,5,skin);oval(ctx,14,-19,7,5,skin);shape(ctx,-14,-32,28,27,skin,10);
 oval(ctx,-6,-20,5,6,'#fff4de');oval(ctx,6,-20,5,6,'#fff4de');oval(ctx,-5,-18,2.5,3.5,'#252b39');oval(ctx,5,-18,2.5,3.5,'#252b39');
 ctx.strokeStyle='#3c3746';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(-11,-27);ctx.lineTo(-2,-24);ctx.moveTo(2,-24);ctx.lineTo(11,-27);ctx.stroke();ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(-6,-10);ctx.quadraticCurveTo(0,-6,6,-10);ctx.stroke();
"""+s[b:]
s=s.replace("ctx.fillRect(18,e.wind>=0?-38:20,brute||boss?16:8,12);", "shape(ctx,18,e.wind>=0?-38:20,brute||boss?20:10,15,boss?'#f0ba76':'#b6d1db',4);")
s=s.replace('ctx.fillRect(p.x,p.y,4,4);','ctx.beginPath();ctx.arc(p.x,p.y,2.5,0,7);ctx.fill();')
s=s.replace('time:number){\n for(let row', 'time:number,region=0){\n for(let row')
s=s.replace(" ctx.fillStyle='#253d43';ctx.fillRect", " if(region===1){shape(ctx,x-5,y+6,10,42,'#795347',4);oval(ctx,x,y,28,33,'#284c43');oval(ctx,x-8,y-8,20,25,'#467954');oval(ctx,x+8,y-15,14,18,'#629464');continue;}\n if(region===2){shape(ctx,x-18,y,36,48,'#59404a',9);ctx.strokeStyle='#eaa069';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(x-5,y+5);ctx.lineTo(x+6,y+20);ctx.lineTo(x-3,y+38);ctx.stroke();oval(ctx,x+15,y+65,3,3,'#f1b273');continue;}\n ctx.fillStyle='#253d43';ctx.fillRect")
p.write_text(s,encoding='utf-8')
p=Path('app/page.tsx');s=p.read_text(encoding='utf-8-sig').replace('drawRoadside(ctx,g.distance/125)','drawRoadside(ctx,g.distance/125,Math.floor((g.wave-1)/5)%3)');p.write_text(s,encoding='utf-8')
