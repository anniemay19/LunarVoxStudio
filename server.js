
/*
LunarVox Studio v2 - Deploy-ready server with AI stubs.
Set environment variables on Render if using real APIs:
  OPENAI_API_KEY, ELEVENLABS_API_KEY
*/
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json({limit: '50mb'}));
app.use('/assets', express.static(path.join(__dirname, 'public','assets')));
app.use(express.static(path.join(__dirname, 'public')));

// Placeholder AI helpers (replace with real API calls when ready)
async function callElevenLabs(text){ const key=process.env.ELEVENLABS_API_KEY; if(!key) throw new Error('No ElevenLabs key'); return {ok:true, provider:'elevenlabs', message:'stub'}; }
async function callOpenAITTS(text){ const key=process.env.OPENAI_API_KEY; if(!key) throw new Error('No OpenAI key'); return {ok:true, provider:'openai', message:'stub'}; }

app.post('/api/tts', async (req,res)=>{
  const { text='' } = req.body || {};
  if(!text) return res.status(400).json({ ok:false, error:'no text provided' });
  try {
    try { const r = await callElevenLabs(text); return res.json({ok:true, provider:'elevenlabs', result:r}); } catch(e){}
    const r2 = await callOpenAITTS(text);
    return res.json({ok:true, provider:'openai', result:r2});
  } catch(err) {
    return res.json({ ok:true, provider:'stub', result:{ message:'no API keys - stub', textReceived: text } });
  }
});

app.post('/api/generate_beat', (req,res)=>{
  const { genre='cinematic', bpm=90 } = req.body || {};
  return res.json({ ok:true, beats: [{ id:'beat-demo-1', name: `${genre} Demo (${bpm}bpm)`, url:'/assets/audio/beat_cinematic.mp3' }] });
});

app.get('*', (req,res)=>{
  res.sendFile(path.join(__dirname, 'public','index.html'));
});

app.listen(PORT, ()=>console.log(`LunarVox Studio v2 running on port ${PORT}`));
