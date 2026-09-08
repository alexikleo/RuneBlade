const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),ts=require('typescript');
const refs=[],effects=[],listeners={};let callback,now=0;
const jsx=(type,props)=>({type,props});
const moduleObject={exports:{}};
const sandbox={exports:moduleObject.exports,module:moduleObject,require:(name)=>name==='react'?{useRef:v=>{const r={current:v};refs.push(r);return r;},useState:v=>[v,()=>{}],useEffect:f=>effects.push(f)}:name==='react/jsx-runtime'?{jsx,jsxs:jsx}:new Proxy({},{get:()=>()=>null}),performance:{now:()=>now},requestAnimationFrame:f=>{callback=f;return 1;},cancelAnimationFrame:()=>{},window:{addEventListener:(n,f)=>listeners[n]=f,removeEventListener:()=>{}},document:{addEventListener:()=>{},removeEventListener:()=>{}},console,Set,Map,Math};
vm.runInNewContext(ts.transpileModule(fs.readFileSync('app/page.tsx','utf8'),{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.ReactJSX}}).outputText,sandbox);
const tree=moduleObject.exports.default();effects.forEach(f=>f());
function find(node,predicate){if(!node)return; if(Array.isArray(node)){for(const n of node){const r=find(n,predicate);if(r)return r;}}else if(typeof node==='object'){if(predicate(node))return node;return find(node.props?.children,predicate);}}
const begin=find(tree,n=>n.props?.className==='primary');const g=refs[1].current,inputs=refs[2].current;
function advance(seconds){for(let i=0;i<seconds*100;i++){now+=10;callback(now);}}
function reset(){begin.props.onClick();}
reset();advance(18);assert.equal(g.mode,'lost','Doing nothing eventually loses');assert.equal(g.hp,0);
reset();assert.equal(g.hp,5);assert.equal(g.enemies.length,0);assert.equal(g.time,0);
g.enemies.push({x:200,y:465,hp:3,wind:-1,flash:0});listeners.keydown({code:'Space',preventDefault(){},repeat:false});advance(.08);listeners.keyup({code:'Space'});assert.equal(g.enemies[0].hp,1,'Tap deals sword damage');assert.equal(g.bolts.length,0,'Tap does not cast');
reset();listeners.keydown({code:'Space',preventDefault(){},repeat:false});advance(.3);assert.ok(g.bolts.length>0,'Hold shoots');assert.equal(g.slash,0,'Hold does not swing');listeners.keyup({code:'Space'});
reset();g.enemies.push({x:200,y:471,hp:3,wind:.05,flash:0});inputs.left.add(1);advance(.1);assert.equal(g.hp,5);assert.equal(g.blocks,1,'Shield blocks');advance(5);assert.equal(g.broken,true);inputs.left.clear();advance(2);assert.equal(g.broken,false,'Release recovers exhausted shield');
reset();listeners.keydown({code:'Space',preventDefault(){},repeat:false});advance(65);assert.equal(g.mode,'won','Magic can complete introductory trial');assert.ok(g.kills>0);
reset();advance(2);listeners.blur();const pausedTime=g.time;advance(2);assert.equal(g.mode,'paused');assert.equal(g.time,pausedTime,'Pause freezes simulation');assert.equal(inputs.right.size,0);
console.log('PASS: idle defeat, restart, sword tap, magic hold, blocking, exhaustion/recovery, complete trial, pause.');


