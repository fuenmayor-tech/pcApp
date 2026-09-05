let arScene=null, arCameraStream=null;

function buildArScene(){
  const container=document.getElementById("arContainer");
  container.innerHTML=`
    <a-scene
      embedded
      vr-mode-ui="enabled: false"
      renderer="logarithmicDepthBuffer: true; colorManagement: true"
      arjs="sourceType: webcam; debugUIEnabled: false; trackingMethod: best;"
      id="arScene">
      <a-marker preset="hiro" id="hiroMarker">
        <a-entity id="arObject" position="0 0.25 0">
          <a-box position="0 0.7 0" width="1.7" height="1" depth=".12" color="#6c5ce7"
                 animation="property: rotation; to: 0 360 0; loop: true; dur: 8000"></a-box>
          <a-box position="0 .12 0" width=".12" height=".5" depth=".12" color="#343c62"></a-box>
          <a-box position="0 -.14 0" width=".8" height=".08" depth=".35" color="#343c62"></a-box>
          <a-text value="MONITOR" align="center" color="#ffffff" width="3" position="0 .72 .08"></a-text>
        </a-entity>
      </a-marker>
      <a-entity camera></a-entity>
    </a-scene>`;
  arScene=document.getElementById("arScene");
  return arScene;
}

async function startAR(){
  const btn=document.getElementById("startArBtn");
  const stop=document.getElementById("stopArBtn");
  const placeholder=document.getElementById("arPlaceholder");
  const container=document.getElementById("arContainer");
  btn.disabled=true;
  btn.textContent="⏳ Iniciando cámara...";
  try{
    if(!window.isSecureContext && location.hostname!=="localhost"){
      throw new Error("La realidad aumentada necesita HTTPS (por ejemplo, GitHub Pages).");
    }
    // Solicitar permiso explícitamente primero. AR.js tomará la cámara después.
    arCameraStream=await navigator.mediaDevices.getUserMedia({
      video:{facingMode:{ideal:"environment"},width:{ideal:1280},height:{ideal:720}},
      audio:false
    });
    // Liberamos este stream: AR.js crea/gestiona su propio video para el tracking.
    arCameraStream.getTracks().forEach(t=>t.stop());
    buildArScene();
    placeholder.classList.add("hidden");
    container.classList.remove("hidden");
    stop.classList.remove("hidden");
    btn.classList.add("hidden");
    const sceneLoaded=()=>{
      if(arScene && arScene.systems && arScene.systems.arjs){
        // AR.js comienza su pipeline al cargar la escena.
      }
    };
    if(arScene.hasLoaded) sceneLoaded(); else arScene.addEventListener("loaded",sceneLoaded,{once:true});
  }catch(err){
    btn.disabled=false;btn.textContent="📷 Activar cámara";
    const message=err.name==="NotAllowedError"?"Permiso de cámara denegado. Activa el permiso en la configuración del navegador y vuelve a intentarlo.":err.message;
    showToast(message);
  }
}

function stopAR(){
  const container=document.getElementById("arContainer");
  const placeholder=document.getElementById("arPlaceholder");
  const btn=document.getElementById("startArBtn");
  const stop=document.getElementById("stopArBtn");
  const scene=document.getElementById("arScene");
  if(scene){
    try{
      const video=scene.querySelector("video");
      if(video && video.srcObject)video.srcObject.getTracks().forEach(t=>t.stop());
    }catch(e){}
    scene.remove();
  }
  arScene=null;
  if(arCameraStream)arCameraStream.getTracks().forEach(t=>t.stop());
  arCameraStream=null;
  container.classList.add("hidden");
  placeholder.classList.remove("hidden");
  stop.classList.add("hidden");
  btn.classList.remove("hidden");
  btn.disabled=false;
  btn.textContent="📷 Activar cámara";
}
