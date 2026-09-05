const CLASS_ITEMS = [
  {name:"Teclado",icon:"⌨️",answer:"entrada"},
  {name:"Mouse",icon:"🖱️",answer:"entrada"},
  {name:"Micrófono",icon:"🎙️",answer:"entrada"},
  {name:"Monitor",icon:"🖥️",answer:"salida"},
  {name:"Parlantes",icon:"🔊",answer:"salida"},
  {name:"Procesador",icon:"⚙️",answer:"procesamiento"},
  {name:"Memoria RAM",icon:"🧠",answer:"almacenamiento"},
  {name:"SSD / Disco",icon:"💾",answer:"almacenamiento"}
];
const CATEGORY_LABELS={entrada:"Entrada",salida:"Salida",procesamiento:"Procesamiento",almacenamiento:"Almacenamiento"};
let classIndex=0,classScore=0,classAnswered=false;

function renderClassification(){
  const item=CLASS_ITEMS[classIndex];
  document.getElementById("classProgressText").textContent=`Reto ${classIndex+1} de ${CLASS_ITEMS.length}`;
  document.getElementById("classProgress").style.width=`${(classIndex/CLASS_ITEMS.length)*100}%`;
  document.getElementById("classificationQuestion").innerHTML=`<div class="big-icon">${item.icon}</div><h3>${item.name}</h3><p>¿A qué categoría pertenece?</p>`;
  document.getElementById("classificationOptions").innerHTML=Object.entries(CATEGORY_LABELS).map(([key,label])=>`<button class="class-option" data-answer="${key}">${label}</button>`).join("");
  document.getElementById("classificationFeedback").textContent="";
  document.getElementById("nextClassBtn").classList.add("hidden");
  classAnswered=false;
  document.querySelectorAll(".class-option").forEach(btn=>btn.addEventListener("click",()=>answerClassification(btn)));
}
function answerClassification(btn){
  if(classAnswered)return;
  classAnswered=true;
  const item=CLASS_ITEMS[classIndex],correct=btn.dataset.answer===item.answer;
  document.querySelectorAll(".class-option").forEach(b=>b.disabled=true);
  if(correct){btn.classList.add("correct");classScore++;document.getElementById("classificationFeedback").textContent="✅ ¡Correcto! Muy bien clasificado."}
  else{
    btn.classList.add("wrong");
    document.querySelector(`[data-answer="${item.answer}"]`).classList.add("correct");
    document.getElementById("classificationFeedback").textContent=`💡 La respuesta correcta es ${CATEGORY_LABELS[item.answer]}.`;
  }
  document.getElementById("nextClassBtn").classList.remove("hidden");
}
function nextClassification(){
  classIndex++;
  if(classIndex>=CLASS_ITEMS.length){
    classIndex=0;
    document.getElementById("classificationQuestion").innerHTML=`<div class="big-icon">🏆</div><h3>¡Reto completado!</h3><p>Obtuviste ${classScore} de ${CLASS_ITEMS.length} respuestas correctas.</p>`;
    document.getElementById("classificationOptions").innerHTML="";
    document.getElementById("classificationFeedback").textContent=classScore>=6?"¡Excelente trabajo! Ya dominas las categorías.":"Buen intento. Revisa los conceptos y vuelve a probar.";
    document.getElementById("nextClassBtn").textContent="Repetir reto";
    document.getElementById("classProgress").style.width="100%";
    document.getElementById("nextClassBtn").onclick=()=>{classScore=0;classIndex=0;document.getElementById("nextClassBtn").textContent="Siguiente →";renderClassification()};
    return;
  }
  renderClassification();
}
