const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),ts=require('typescript');
const storage=new Map();
const refs=[],effects=[],listeners={};let callback,now=0;
const jsx=(type,props)=>({type,props});
const moduleObject={exports:{}};
const sandbox={localStorage:{getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,v)},exports:moduleObject.exports,module:moduleObject,require:(name)=>name==='react'?{useRef:v=>{const r={current:v};refs.push(r);return r;},useState:v=>[v,()=>{}],useEffect:f=>effects.push(f)}:name==='react/jsx-runtime'?{jsx,jsxs:jsx}:new Proxy({},{get:()=>()=>null}),performance:{now:()=>now},requestAnimationFrame:f=>{callback=f;return 1;},cancelAnimationFrame:()=>{},window:{addEventListener:(n,f)=>listeners[n]=f,removeEventListener:()=>{}},document:{addEventListener:()=>{},removeEventListener:()=>{}},console,Set,Map,Math};
vm.runInNewContext(ts.transpileModule(fs.readFileSync('app/page.tsx','utf8').replace(' return <main>', ' globalThis.testApi={buy,progress,equipWeapon}; return <main>'),{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.ReactJSX}}).outputText,sandbox);
const tree=moduleObject.exports.default();effects.forEach(f=>f());
function find(node,predicate){if(!node)return; if(Array.isArray(node)){for(const n of node){const r=find(n,predicate);if(r)return r;}}else if(typeof node==='object'){if(predicate(node))return node;return find(node.props?.children,predicate);}}
const begin=find(tree,n=>n.props?.className==='primary');const g=refs[1].current,inputs=refs[2].current;
function advance(seconds){for(let i=0;i<seconds*100;i++){now+=10;callback(now);}}
function reset(){begin.props.onClick();}
for(const upgraded of [false,true])for(const strategy of ['magic','mixed']){const results=[];for(let seed=1;seed<=5;seed++){let rng=seed;const seeded=Object.create(Math);seeded.random=()=>{rng=(rng*1664525+1013904223)>>>0;return rng/4294967296;};sandbox.Math=seeded;reset();sandbox.testApi.progress.current={coins:0,sword:upgraded?3:0,magic:upgraded?3:0,shield:upgraded?3:0,equipped:upgraded?2:0};let tapAt=-1;
for(let frame=0;frame<600*100&&g.mode==='playing';frame++){if(strategy==='magic')inputs.right.set(-1,0);else{const danger=g.enemies.some(e=>e.y>=470&&e.wind>=0&&e.wind<.22)||g.hostile.some(p=>p.y>450);inputs.left.clear();if(danger){inputs.left.add(-2);inputs.right.clear();tapAt=-1;}else if(g.enemies.some(e=>e.y>435)){if(tapAt<0){inputs.right.clear();listeners.keydown({code:'Space',preventDefault(){},repeat:false});tapAt=frame;}else if(frame-tapAt>=5){listeners.keyup({code:'Space'});tapAt=-1;}}else{inputs.right.set(-1,0);tapAt=-1;}}advance(.01);}
results.push({wave:g.wave,coins:g.coins,seconds:Math.round(g.time)});}console.log(JSON.stringify({upgraded,strategy,results}));}
