const CONCEPTS = [
  {id:"monitor",name:"Monitor",icon:"🖥️",category:"salida",categoryName:"Salida",description:"Pantalla que permite visualizar textos, imágenes, videos y otros resultados del computador.",function:"Mostrar información visual para que el usuario pueda verla e interpretarla.",tip:"El monitor recibe información procesada y la presenta de forma visual."},
  {id:"keyboard",name:"Teclado",icon:"⌨️",category:"entrada",categoryName:"Entrada",description:"Dispositivo formado por teclas que permite introducir letras, números, símbolos y comandos.",function:"Introducir información y órdenes al computador mediante sus teclas.",tip:"Es un dispositivo de entrada porque envía información desde el usuario hacia el computador."},
  {id:"mouse",name:"Mouse",icon:"🖱️",category:"entrada",categoryName:"Entrada",description:"Dispositivo apuntador que permite mover el cursor, seleccionar elementos y realizar acciones.",function:"Controlar el puntero e interactuar con los elementos que aparecen en pantalla.",tip:"El clic, doble clic, clic derecho y rueda son acciones típicas del mouse."},
  {id:"tower",name:"CPU / Gabinete",icon:"🖥️",category:"procesamiento",categoryName:"Procesamiento",description:"El gabinete contiene componentes internos esenciales. En lenguaje cotidiano suele llamarse CPU al equipo completo, aunque la CPU realmente es el procesador.",function:"Proteger y alojar componentes como la placa base, procesador, memoria y unidades de almacenamiento.",tip:"La CPU propiamente dicha es el procesador, encargado de ejecutar instrucciones."},
  {id:"processor",name:"Procesador",icon:"⚙️",category:"procesamiento",categoryName:"Procesamiento",description:"Componente que ejecuta instrucciones y realiza operaciones necesarias para que los programas funcionen.",function:"Procesar instrucciones, realizar cálculos y coordinar operaciones del sistema.",tip:"Puedes imaginarlo como uno de los principales centros de procesamiento del computador."},
  {id:"ram",name:"Memoria RAM",icon:"🧠",category:"almacenamiento",categoryName:"Almacenamiento",description:"Memoria rápida y temporal utilizada para mantener datos e instrucciones que están siendo usados.",function:"Guardar temporalmente información de los programas que están en ejecución.",tip:"Su contenido es volátil: normalmente se pierde al apagar el computador."},
  {id:"storage",name:"SSD / Disco",icon:"💾",category:"almacenamiento",categoryName:"Almacenamiento",description:"Unidad donde se guardan archivos, programas y el sistema operativo de manera persistente.",function:"Almacenar información para conservarla incluso después de apagar el equipo.",tip:"Los SSD no tienen las mismas partes mecánicas que los discos duros tradicionales."},
  {id:"speakers",name:"Parlantes",icon:"🔊",category:"salida",categoryName:"Salida",description:"Dispositivos que convierten señales de audio en sonido que puede escuchar el usuario.",function:"Reproducir sonidos, música, voces y alertas del computador.",tip:"Son de salida porque presentan información en forma de sonido."},
  {id:"webcam",name:"Cámara web",icon:"📷",category:"entrada",categoryName:"Entrada",description:"Cámara que captura imágenes y video para enviarlos al computador.",function:"Capturar imágenes y video, por ejemplo durante una videollamada.",tip:"La cámara aporta información al computador, por eso se clasifica como entrada."},
  {id:"microphone",name:"Micrófono",icon:"🎙️",category:"entrada",categoryName:"Entrada",description:"Dispositivo que capta ondas sonoras y las convierte en señales que el computador puede procesar.",function:"Introducir voz y otros sonidos al computador.",tip:"También es un dispositivo de entrada, aunque la información que captura sea audio."},
  {id:"printer",name:"Impresora",icon:"🖨️",category:"salida",categoryName:"Salida",description:"Equipo que produce una copia física de documentos, imágenes u otros contenidos digitales.",function:"Representar información digital sobre papel u otros materiales.",tip:"Aunque algunos modelos también pueden escanear, la función de impresión es de salida."},
  {id:"headphones",name:"Audífonos",icon:"🎧",category:"salida",categoryName:"Salida",description:"Dispositivo de audio que permite escuchar sonidos de manera individual.",function:"Reproducir audio para el usuario.",tip:"Al igual que los parlantes, son dispositivos de salida."}
];

function renderConcepts(filter="all"){
  const grid=document.getElementById("conceptGrid");
  const list=filter==="all"?CONCEPTS:CONCEPTS.filter(c=>c.category===filter);
  grid.innerHTML=list.map(c=>`
    <article class="concept-card" data-id="${c.id}" tabindex="0" role="button" aria-label="Ver información de ${c.name}">
      <div class="concept-icon">${c.icon}</div>
      <h3>${c.name}</h3>
      <p>${c.description}</p>
      <span class="category-label">${c.categoryName}</span>
    </article>`).join("");
  grid.querySelectorAll(".concept-card").forEach(card=>{
    const open=()=>openConcept(card.dataset.id);
    card.addEventListener("click",open);
    card.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();open()}});
  });
}

function openConcept(id){
  const c=CONCEPTS.find(x=>x.id===id);
  if(!c)return;
  document.getElementById("modalIcon").textContent=c.icon;
  document.getElementById("modalCategory").textContent=c.categoryName.toUpperCase();
  document.getElementById("modalTitle").textContent=c.name;
  document.getElementById("modalDescription").textContent=c.description;
  document.getElementById("modalFunction").textContent=c.function;
  document.getElementById("modalTip").textContent=c.tip;
  document.getElementById("conceptModal").classList.remove("hidden");
  document.body.style.overflow="hidden";
  window.currentSpeechText=`${c.name}. ${c.description} ¿Para qué sirve? ${c.function}`;
}
