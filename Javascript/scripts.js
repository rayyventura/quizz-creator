const basicInfo = document.querySelector('.basic-info');
const quizzQuestions = document.querySelector('.quizz-questions');
const quizzLevels = document.querySelector('.level-page');
const mainScreen = document.querySelector('.main-screen');
const finalPage = document.querySelector('.final-page')
let verifyQuestionFields, verifyWrongAnswer, verifyColor,verifyCorrectAnswer
let verifyImageURL = true;
let questionCounter = 0;
let levelCounter = 0;
let numQuestions = 0;
let numLevels = 0;
let counter =0;

const createQuizz=()=>{
    basicInfo.classList.remove('minimize');
    mainScreen.classList.add('minimize');
}
const createQuestions = (numberQuestions) =>{
    let defineQuestions = document.querySelector('.Perguntas');
  
    for(let i=0; i<numberQuestions;i++){
        defineQuestions.innerHTML +=`
        <div class="input-questions " onclick="loadQuestions(this)">
            <div class="pergunta">
                <p>Pergunta ${i+1}</p>
                <img src="assets/Vector (1).svg" alt="lápis">
            </div>
        </div>
                `
            }
  }
        
  const loadQuestions = (question) => {
      question.classList.add('minimize');
      questionCounter++;
     const makeQuestions = document.querySelector('.make-questions');
     makeQuestions.innerHTML+=`
    <div class="input-infos ">
        <div class="questions-title">Pergunta ${questionCounter}</div>
        <input class='question-text' type="text" placeholder="Texto da pergunta">
        <div class="questions-title">Escolha a cor de fundo da pergunta</div>
        <input type="color" class="question-color" placeholder="Cor de fundo da pergunta">
        <div class="questions-title">Resposta Correta</div>
        <input class='correct-answer' type="text" placeholder="Resposta correta">
        <input class='image-correct-answer'type="text" placeholder="URL da imagem">
        <div class="questions-title">Respostas Incorretas</div>
        <input class='wrong-answer1' type="text" placeholder="Resposta incorreta 1">
        <input class='image-answer1' type="text" placeholder="URL da imagem 1">
        <div class="uncorrect-answer"></div>
        <input class='wrong-answer2' type="text" placeholder="Resposta incorreta 2">
        <input class='image-answer2' type="text" placeholder="URL da imagem 2">
        <div class="uncorrect-answer">  </div>
        <input class='wrong-answer3' type="text" placeholder="Resposta incorreta 3">
        <input class='image-answer3' type="text" placeholder="URL da imagem 3">
    </div>`
}

const  startInformation =()=>{
    const pickTitle = document.querySelector('.pick-title').value;
    const pickImage= document.querySelector('.pick-image').value;
    let pickQuestionsNº= document.querySelector('.pick-questionsNº').value;
    let pickLevelsNº= document.querySelector('.pick-levelsNº').value;
    pickQuestionsNº=Number(pickQuestionsNº);
    pickLevelsNº=Number(pickLevelsNº);
    
    if(pickTitle.length<20 || pickTitle.length>65 ){
        alert('O título do seu quizz deve ter no mínimo 20 e no máximo 65 caracteres');
    }else if(!isValidHttpUrl(pickImage)){
        alert('URL da Imagem: deve ter formato de URL');
    }else if(pickQuestionsNº <3 ){
        alert('Quantidade de perguntas: no mínimo 3 perguntas');
    }else if(isNaN(pickQuestionsNº)){
        alert('Quantidade de perguntas deve ser um NÚMERO');
    }else if(pickLevelsNº<2){
        alert('Quantidade de perguntas: no mínimo 2 Níveis');
    }else if(isNaN(pickLevelsNº)){
        alert('Quantidade de níveis deve ser um NÚMERO');
    }else{
        basicInfo.classList.add('minimize');
        quizzQuestions.classList.remove('minimize');

        createQuestions(pickQuestionsNº);
        numQuestions=pickQuestionsNº;
        numLevels=pickLevelsNº;
    }
}

 

const  validateQuestions = () =>{
    for(let i=0; i<numQuestions;i++){
        const questionText = document.querySelectorAll(".question-text")[i];
        const questionColor = document.querySelectorAll(".question-color")[i];
        const correctAnswer = document.querySelectorAll(".correct-answer")[i];
        const imageCorrectAnswer = document.querySelectorAll(".image-correct-answer")[i];
        const imageAnswer1 = document.querySelectorAll(".image-answer1")[i];
        const wrongAnswer1 = document.querySelectorAll(".wrong-answer1")[i];
        const imageAnswer2 = document.querySelectorAll(".image-answer2")[i];
        const wrongAnswer2 = document.querySelectorAll(".wrong-answer2")[i];
        const imageAnswer3 = document.querySelectorAll(".image-answer3")[i];
        const wrongAnswer3 = document.querySelectorAll(".wrong-answer3")[i];
        const allOkay = questionText.value.length>20 && (wrongAnswer1.value==='' || wrongAnswer1.value===undefined || correctAnswer.value==='' || correctAnswer.value===undefined) 
        && isHexColor(questionColor.value) && (isValidHttpUrl(imageCorrectAnswer.value) || isValidHttpUrl(imageAnswer1.value))
           
          if(wrongAnswer2 !== '' || wrongAnswer2!==undefined || wrongAnswer3 !== '' || wrongAnswer3!==undefined){
                if(wrongAnswer2 !== '' || wrongAnswer2!==undefined){
                     if(!isValidHttpUrl(imageAnswer2.value)){
                         alert(`A resposta 2 da Pergunta ${i+1} não tem uma URL de Imagem válida`)
                         return false;
                     }
                 }
                 if(wrongAnswer3 !== '' || wrongAnswer3!==undefined){
                     if(!isValidHttpUrl(imageAnswer3.value)){
                         alert(`A resposta 3 da Pergunta ${i+1} não tem uma URL de Imagem válida`)
                        return false;
                     }
                 }
            }
             if( questionText.value.length<20){
                alert(`A pergunta ${i+1} tem que ter no mínimo 20 caracteres`);
                return;
            }else if(wrongAnswer1.value==='' || wrongAnswer1.value===undefined || correctAnswer.value==='' || correctAnswer.value===undefined){
                alert(`Sua pergunta ${i+1} tem que ter no mínimo 1 Resposta Errada e 1 Correta`);
                return;
            }else if(!isHexColor(questionColor.value)){
                alert(`A cor de fundo da pergunta ${i+1} deve ser em hexadecimal. 
                Deve começar com "#", seguida de 6 caracteres 
                formados por números ou letras de A a F`);
                return;
            }else if(!isValidHttpUrl(imageCorrectAnswer.value) || !isValidHttpUrl(imageAnswer1.value)){
                alert(`A pergunta ${i+1} não tem uma URL de Imagem válida`);
                return;
            }else {
                counter++;
                 quizzQuestions.classList.add("minimize");
                 quizzLevels.classList.remove("minimize");
                 if(counter===1){
                     createLevels();
                 }
            }
    }

}
const createLevels = ()=>{
    let levels = document.querySelector('.Levels');
    for(let i=0; i<numLevels;i++){
        levels.innerHTML+=`
        <div class='input-questions' onclick='loadLevels(this)'>
            <div class="level">
                <p>Nivel ${i+1}</p>
                <img src="assets/Vector (1).svg" alt="lápis">
            </div>
        </div>`
    }
}

const loadLevels = (level) =>{
    levelCounter++;
    level.classList.add('minimize');
    let makeLevels = document.querySelector('.make-levels');
    makeLevels.innerHTML+=
    `<div class="input-infos">
        <div class="questions-title">Pergunta ${levelCounter}</div>
        <input type="text" placeholder="Título do nível">
        <input type="text" placeholder="% de acerto mínima">
        <input type="text" placeholder="URL da imagem do nível">
        <input class='oi' type="text" placeholder="Descrição do nível">
    </div>`
}

const  showFinalPage = () =>{
    quizzLevels.classList.add('minimize');
    finalPage.classList.remove('minimize');
}
function isValidHttpUrl(string) {
    let url;
    
    try {
      url = new URL(string);
    } catch (_) {
      return false;  
    }
  
    return url.protocol === "http:" || url.protocol === "https:";
  }
  
const  accessQuizz = () =>{
    finalPage.classList.add('minimize');
}
const returnHome = () =>{
    finalPage.classList.add('minimize');
    mainScreen.classList.remove('minimize');
}

function getQuizzes(){
    const promise= axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes")
}
function isHexColor(color){
    if(/^#[0-9A-F]{6}$/i.test(color)){
        return true;
    }else{
        return false;
    }
}