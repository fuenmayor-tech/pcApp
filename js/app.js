document.addEventListener("DOMContentLoaded",()=>{
  renderConcepts();
  renderClassification();
  renderQuiz();
  initVR();

  document.querySelectorAll(".filter").forEach(btn=>btn.addEventListener("click",()=>{
    document.querySelectorAll(".filter").forEach(b=>b.classList.remove("active"));
    btn.classList.add("active");renderConcepts(btn.dataset.filter);
  }));

  document.getElementById("modalClose").addEventListener("click",closeModal);
  document.getElementById("conceptModal").addEventListener("click",e=>{if(e.target.id==="conceptModal")closeModal()});
  document.addEventListener("keydown",e=>{if(e.key==="Escape")closeModal()});
  document.getElementById("speakBtn").addEventListener("click",()=>{
    if(!("speechSynthesis" in window))return showToast("Tu navegador no permite lectura de voz.");
    speechSynthesis.cancel();
    const u=new SpeechSynthesisUtterance(window.currentSpeechText||"");
    u.lang="es-CO";u.rate=.95;speechSynthesis.speak(u);
  });

  document.getElementById("nextClassBtn").addEventListener("click",nextClassification);
  const arStart=document.getElementById("startArBtn");
  if(arStart) arStart.addEventListener("click", async ()=>{
    if(!window.isSecureContext || !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia){
      showToast("La cámara requiere HTTPS o localhost.");
      return;
    }
    arStart.disabled=true;
    arStart.textContent="📷 Solicitando permiso…";
    try{
      const stream=await navigator.mediaDevices.getUserMedia({
        video:{facingMode:{ideal:"environment"}},
        audio:false
      });
      stream.getTracks().forEach(track=>track.stop());
      window.location.href="ar.html?camera=ready";
    }catch(err){
      arStart.disabled=false;
      arStart.textContent="📷 Abrir cámara AR";
      if(err && err.name==="NotAllowedError") showToast("Debes permitir el acceso a la cámara para usar la realidad aumentada.");
      else showToast("No se pudo activar la cámara. Revisa el permiso del navegador.");
    }
  });

  document.querySelectorAll(".experience-tab").forEach(tab=>tab.addEventListener("click",()=>{
    document.querySelectorAll(".experience-tab").forEach(t=>t.classList.remove("active"));
    document.querySelectorAll(".experience-panel").forEach(p=>p.classList.remove("active"));
    tab.classList.add("active");document.getElementById(tab.dataset.panel).classList.add("active");
  }));

  const menuBtn=document.getElementById("menuBtn"),mobile=document.getElementById("mobileMenu");
  menuBtn.addEventListener("click",()=>mobile.classList.toggle("show"));
  mobile.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>mobile.classList.remove("show")));

  document.getElementById("conceptGrid").addEventListener("click",()=>{});
});

function closeModal(){
  document.getElementById("conceptModal").classList.add("hidden");
  document.body.style.overflow="";
  if("speechSynthesis" in window)speechSynthesis.cancel();
}
function showToast(message){
  const t=document.getElementById("toast");t.textContent=message;t.classList.add("show");
  clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>t.classList.remove("show"),3500);
}
