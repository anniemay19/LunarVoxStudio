
document.addEventListener('DOMContentLoaded', ()=>{
  document.querySelectorAll('.nav').forEach(b=> b.addEventListener('click', ()=>{
    document.querySelectorAll('.view').forEach(v=> v.classList.add('hidden'));
    const id = b.dataset.view;
    const el = document.getElementById(id);
    if(el) el.classList.remove('hidden');
  }));

  const bpm = document.getElementById('bpm');
  const bpmVal = document.getElementById('bpmVal');
  bpmVal.textContent = bpm?.value||90;
  bpm?.addEventListener('input', ()=>{ bpmVal.textContent = bpm.value; });

  const play = document.getElementById('playBeat');
  const stop = document.getElementById('stopBeat');
  if(play && stop) {
    const kick = new Tone.MembraneSynth().toDestination();
    const snare = new Tone.NoiseSynth({ volume:-10 }).toDestination();
    let loop=null;
    play.addEventListener('click', async ()=>{
      await Tone.start();
      if(loop) { loop.stop(); loop.dispose(); loop=null; }
      let idx=0;
      const seq = ['K','-','S','-','K','-','S','-'];
      loop = new Tone.Loop((time)=>{ const step=seq[idx%seq.length]; if(step==='K') kick.triggerAttackRelease('C2','8n',time); if(step==='S') snare.triggerAttackRelease('16n',time); idx++; }, '8n').start(0);
      Tone.Transport.bpm.value = parseInt(bpm.value||90);
      Tone.Transport.start();
    });
    stop.addEventListener('click', ()=>{ if(loop){ loop.stop(); loop.dispose(); loop=null; } Tone.Transport.stop(); });
  }
});