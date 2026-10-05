let audio: AudioContext | undefined;
let enabled = true;
export function unlockAudio(){try {audio ??= new AudioContext();void audio.resume().catch(()=>{});}catch{}}
export function setSound(value:boolean){enabled=value;if(!value&&audio)void audio.suspend().catch(()=>{});else if(value)unlockAudio();}
export function closeAudio(){if(audio)void audio.close().catch(()=>{});audio=undefined;}
export function sound(kind:'slash'|'bolt'|'block'|'hurt'|'clear'|'boss'|'coin'){
 if(!enabled||!audio||audio.state!=='running')return;
 const notes={coin:[1200,1800,.09],slash:[260,70,.12],bolt:[680,240,.1],block:[1100,800,.16],hurt:[100,40,.2],clear:[440,880,.4],boss:[90,45,.6]}[kind];
 const osc=audio.createOscillator(),gain=audio.createGain(),at=audio.currentTime;
 osc.type=kind==='bolt'||kind==='clear'?'sine':'triangle';osc.frequency.setValueAtTime(notes[0],at);osc.frequency.exponentialRampToValueAtTime(notes[1],at+notes[2]);gain.gain.setValueAtTime(.0001,at);gain.gain.exponentialRampToValueAtTime(.065,at+.008);gain.gain.exponentialRampToValueAtTime(.0001,at+notes[2]);osc.connect(gain);gain.connect(audio.destination);osc.start(at);osc.stop(at+notes[2]+.02);osc.onended=()=>{osc.disconnect();gain.disconnect();};
}
let lastBeat=-1;
export function music(time:number){
 const beat=Math.floor(time*2);if(beat===lastBeat)return;lastBeat=beat;
 if(!enabled||!audio||audio.state!=='running')return;
 const melody=[220,0,261.63,329.63,196,0,246.94,293.66,174.61,220,261.63,0,196,246.94,220,0];const frequency=melody[beat%melody.length];if(!frequency)return;
 const osc=audio.createOscillator(),gain=audio.createGain(),at=audio.currentTime;osc.type='sine';osc.frequency.value=frequency;gain.gain.setValueAtTime(.0001,at);gain.gain.exponentialRampToValueAtTime(.023,at+.04);gain.gain.exponentialRampToValueAtTime(.0001,at+.42);osc.connect(gain);gain.connect(audio.destination);osc.start();osc.stop(at+.45);osc.onended=()=>{osc.disconnect();gain.disconnect();};
}
