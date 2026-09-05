const VR_INFO={
  monitor:["Monitor","Dispositivo de salida que muestra información visual."],
  keyboard:["Teclado","Dispositivo de entrada para introducir texto, números y comandos."],
  mouse:["Mouse","Dispositivo de entrada para controlar el puntero."],
  tower:["CPU / Gabinete","El gabinete aloja y protege componentes internos del computador."]
};
function initVR(){
  const keyRows=document.getElementById("keyRows");
  const positions=[];
  for(let row=0;row<3;row++){
    for(let col=0;col<10;col++)positions.push({x:-1.45+col*.32,y:.1,z:-.38+row*.28});
  }
  positions.forEach(p=>{
    const el=document.createElement("a-box");
    el.setAttribute("position",`${p.x} ${p.y} ${p.z}`);
    el.setAttribute("width",".24");el.setAttribute("height",".04");el.setAttribute("depth",".20");el.setAttribute("color","#aeb5cb");
    keyRows.appendChild(el);
  });
  document.querySelectorAll(".component-control").forEach(btn=>btn.addEventListener("click",()=>{
    document.querySelectorAll(".component-control").forEach(b=>b.classList.remove("active"));btn.classList.add("active");
    const [title,desc]=VR_INFO[btn.dataset.component];
    document.getElementById("vrInfo").innerHTML=`<strong>${title}</strong><span>${desc}</span>`;
    const targets={monitor:"vrMonitor",keyboard:"vrKeyboard",mouse:"vrMouse",tower:"vrTower"};
    Object.entries(targets).forEach(([key,id])=>{
      const el=document.getElementById(id);
      el.setAttribute("scale",key===btn.dataset.component?"1.12 1.12 1.12":"1 1 1");
    });
  }));
}
