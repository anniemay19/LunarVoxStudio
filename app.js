
document.addEventListener('DOMContentLoaded', ()=>{
  document.getElementById('launchBtn')?.addEventListener('click', ()=>{
    fetch('/app.html').then(r=>r.text()).then(t=>{ document.getElementById('app').innerHTML = t; document.getElementById('app').classList.remove('hidden'); document.getElementById('splash').style.display='none'; });
  });
});