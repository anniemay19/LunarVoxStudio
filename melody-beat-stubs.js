
document.addEventListener('DOMContentLoaded', ()=>{
  document.getElementById('createBeat')?.addEventListener('click', async ()=>{
    const genre = document.getElementById('beatGenre').value;
    const bpm = parseInt(document.getElementById('beatBpm').value||90);
    const res = await fetch('/api/generate_beat', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ genre, bpm }) });
    const j = await res.json();
    if(j.ok && j.beats && j.beats.length) {
      document.getElementById('beatResult').innerText = 'Generated: ' + j.beats[0].name + ' (demo)';
    } else document.getElementById('beatResult').innerText = 'No beat generated.';
  });

  document.getElementById('generateVoice')?.addEventListener('click', async ()=>{
    const text = document.getElementById('voiceText').value||'';
    if(!text) return alert('Type lyrics or text');
    const res = await fetch('/api/tts', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ text }) });
    const j = await res.json();
    document.getElementById('voiceResult').innerText = 'Voice generated (provider: '+(j.provider||'stub')+')';
  });
});