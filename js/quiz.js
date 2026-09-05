const QUIZ = [
 {q:"¿Cuál es un dispositivo de entrada?",opts:["Monitor","Teclado","Parlantes","Impresora"],a:1,why:"El teclado permite introducir información al computador."},
 {q:"¿Qué componente ejecuta instrucciones y realiza cálculos?",opts:["Monitor","Procesador","Mouse","Impresora"],a:1,why:"El procesador ejecuta instrucciones y realiza operaciones."},
 {q:"¿Cuál de estos es un dispositivo de salida?",opts:["Micrófono","Mouse","Monitor","Teclado"],a:2,why:"El monitor muestra información visual al usuario."},
 {q:"¿Para qué sirve principalmente la memoria RAM?",opts:["Imprimir documentos","Guardar datos temporalmente mientras se usan","Capturar fotografías","Emitir sonido"],a:1,why:"La RAM mantiene temporalmente datos e instrucciones de programas en ejecución."},
 {q:"¿Qué dispositivo permite escuchar el audio del computador?",opts:["Parlantes","Teclado","Cámara web","Mouse"],a:0,why:"Los parlantes convierten señales de audio en sonido."},
 {q:"¿Cuál sirve para guardar archivos de manera persistente?",opts:["RAM","SSD / Disco","Monitor","Micrófono"],a:1,why:"Las unidades de almacenamiento conservan la información después de apagar el equipo."},
 {q:"¿Por qué una cámara web es un dispositivo de entrada?",opts:["Porque muestra imágenes","Porque imprime fotos","Porque envía imágenes capturadas al computador","Porque reproduce sonidos"],a:2,why:"La cámara captura información y la envía al computador."},
 {q:"¿Qué componente suele encontrarse dentro del gabinete?",opts:["Placa base","Papel","Parlantes externos","Alfombrilla"],a:0,why:"La placa base es uno de los componentes internos del equipo."},
 {q:"¿Cuál es la función principal del mouse?",opts:["Procesar datos","Mover el cursor e interactuar con elementos","Mostrar imágenes","Almacenar archivos"],a:1,why:"El mouse permite controlar el puntero y seleccionar elementos."},
 {q:"¿Cuál afirmación es correcta?",opts:["El monitor es de entrada","El teclado es de salida","El micrófono es de entrada","La RAM imprime documentos"],a:2,why:"El micrófono captura sonido y lo introduce al computador."}
];
let quizIndex=0,quizPoints=0,quizAnswered=false;

function renderQuiz(){
  if(quizIndex>=QUIZ.length){renderQuizResult();return}
  const item=QUIZ[quizIndex];
  document.getElementById("quizCounter").textContent=`Pregunta ${quizIndex+1} de ${QUIZ.length}`;
  document.getElementById("quizScore").textContent=`⭐ ${quizPoints} puntos`;
  document.getElementById("quizProgress").style.width=`${(quizIndex/QUIZ.length)*100}%`;
  document.getElementById("quizContent").innerHTML=`
    <div class="quiz-question"><h3>${item.q}</h3></div>
    <div class="quiz-options">${item.opts.map((o,i)=>`<button class="quiz-option" data-i="${i}">${String.fromCharCode(65+i)}. ${o}</button>`).join("")}</div>
    <div id="quizFeedback" class="feedback"></div>
    <button id="quizNext" class="btn btn-primary quiz-next hidden">Siguiente →</button>`;
  quizAnswered=false;
  document.querySelectorAll(".quiz-option").forEach(b=>b.addEventListener("click",()=>answerQuiz(Number(b.dataset.i))));
}
function answerQuiz(choice){
  if(quizAnswered)return;
  quizAnswered=true;
  const item=QUIZ[quizIndex],correct=choice===item.a;
  const buttons=document.querySelectorAll(".quiz-option");
  buttons.forEach(b=>b.disabled=true);
  buttons[item.a].classList.add("correct");
  if(correct){quizPoints++;document.getElementById("quizFeedback").textContent=`✅ ¡Correcto! ${item.why}`}
  else{buttons[choice].classList.add("wrong");document.getElementById("quizFeedback").textContent=`💡 No exactamente. ${item.why}`}
  document.getElementById("quizScore").textContent=`⭐ ${quizPoints} puntos`;
  document.getElementById("quizNext").classList.remove("hidden");
}
function nextQuiz(){quizIndex++;renderQuiz()}
function renderQuizResult(){
  document.getElementById("quizCounter").textContent="Resultado final";
  document.getElementById("quizScore").textContent=`⭐ ${quizPoints}/10`;
  document.getElementById("quizProgress").style.width="100%";
  const message=quizPoints>=9?"🏆 ¡Eres un experto!":quizPoints>=7?"🌟 ¡Muy buen trabajo!":quizPoints>=5?"👍 ¡Vas por buen camino!":"🚀 ¡Repasa los conceptos y vuelve a intentarlo!";
  document.getElementById("quizContent").innerHTML=`<div class="result"><div class="result-score">${quizPoints}/10</div><h3>${message}</h3><p>Revisa las tarjetas de conceptos y vuelve a realizar el reto para mejorar tu puntuación.</p><button class="btn btn-primary" id="restartQuiz">🔄 Intentar de nuevo</button></div>`;
  document.getElementById("restartQuiz").onclick=()=>{quizIndex=0;quizPoints=0;renderQuiz()};
}
