const basicInfo = document.querySelector('.basic-info');
const quizzQuestions = document.querySelector('.quizz-questions');
const quizzLevels = document.querySelector('.level-page');
const mainScreen = document.querySelector('.main-screen');
const finalPage = document.querySelector('.final-page');
let quizz = {};
let id;
let questions=[];
let levels=[];
let quizztitle='';
let quizzimage='';
let getIds=[];
let numberInfos={leastPercentage: false, questionNumber : 0, levelNumber : 0,numQuestions : 0,numLevels : 0}


const createQuizz=()=>{
    basicInfo.classList.remove('minimize');
    mainScreen.classList.add('minimize');
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
        numberInfos.numQuestions=pickQuestionsNº;
        numberInfos.numLevels=pickLevelsNº;

        quizztitle=pickTitle;
        quizzimage=pickImage;
    }
}
const createQuestions = (numberQuestions) =>{
    let defineQuestions = document.querySelector('.Perguntas');
    
    for(let i=0; i<numberQuestions;i++){
        defineQuestions.innerHTML +=`
        <div class="input-questions" onclick="loadQuestions(this)">
        <div class="pergunta" >
        <p>Pergunta ${i+1}</p>
        <img src="assets/Vector (1).svg" alt="lápis">
            </div>
        </div>
        <div class="make-questions minimize">
            <div class="input-infos ">
                <div class="questions-title">Pergunta ${i+1}</div>
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
            </div>
         </div>  `
    }
  }
        
  const loadQuestions = (question) => {
      question.classList.add('minimize');
      const makeQuestions = document.querySelectorAll(".make-questions");
      makeQuestions[ numberInfos.questionNumber].classList.remove('minimize');
      numberInfos.questionNumber++;
}


 

const  validateQuestions = () =>{
    for(let i=0; i<numberInfos.numQuestions;i++){
        const questionColor = document.querySelectorAll(".question-color")[i];
        const questionText = document.querySelectorAll(".question-text")[i];
        const correctAnswer = document.querySelectorAll(".correct-answer")[i];
        const imageCorrectAnswer = document.querySelectorAll(".image-correct-answer")[i];
        const imageAnswer1 = document.querySelectorAll(".image-answer1")[i];
        const wrongAnswer1 = document.querySelectorAll(".wrong-answer1")[i];  
        const imageAnswer2 = document.querySelectorAll(".image-answer2")[i];
        const wrongAnswer2 = document.querySelectorAll(".wrong-answer2")[i];
        const imageAnswer3 = document.querySelectorAll(".image-answer3")[i];
        const wrongAnswer3 = document.querySelectorAll(".wrong-answer3")[i];
        
                if(wrongAnswer2 !== ''  || wrongAnswer3 !== ''){
                    if(wrongAnswer2.value !== '' ){
                        if(!isValidHttpUrl(imageAnswer2.value)){
                            alert(`A resposta 2 da Pergunta ${i+1} não tem uma URL de Imagem válida`);
                            return;
                        }
                    }
                    if(wrongAnswer3.value !== '' ){
                        if(!isValidHttpUrl(imageAnswer3.value)){
                            alert(`A resposta 3 da Pergunta ${i+1} não tem uma URL de Imagem válida`);
                            return;
                        }
                        
                    }
                } 
                if(!isValidHttpUrl(imageCorrectAnswer.value) || !isValidHttpUrl(imageAnswer1.value)){
                    alert(`A pergunta ${i+1} não tem uma URL de Imagem válida`);
                    return;
                } 
                if( questionText.value.length<20){
                    alert(`A pergunta ${i+1} tem que ter no mínimo 20 caracteres`);
                    return;
                }
             
                if(wrongAnswer1.value===''  || correctAnswer.value==='' ){
                    alert(`Sua pergunta ${i+1} tem que ter no mínimo 1 Resposta Errada e 1 Correta`);
                    return;
                }
                if(!isHexColor(questionColor.value)){
                    alert(`A cor de fundo da pergunta ${i+1} deve ser em hexadecimal. 
                    Deve começar com "#", seguida de 6 caracteres 
                    formados por números ou letras de A a F`);
                    return;
                }

                questions[i]={
                    title: questionText.value,
                    color: questionColor.value,
                    answers: [
                        {
                            text:correctAnswer.value,
                            image:imageCorrectAnswer.value,
                            isCorrectAnswer:true
                        },
                        {
                            text:wrongAnswer1.value,
                            image:imageAnswer1.value,
                            isCorrectAnswer:false
                        }
                    ]
                }
                
                 if(wrongAnswer2.value!==''){
                     questions[i].answers.push({
                             text:wrongAnswer2.value,
                             image:imageAnswer2.value,
                             isCorrectAnswer:false
                     });
                 }
                 if(wrongAnswer3.value!==''){
                     questions[i].answers.push({
                             text:wrongAnswer3.value,
                             image:imageAnswer3.value,
                             isCorrectAnswer:false
                     });
                 }
        }
       
        quizzQuestions.classList.add("minimize");
        quizzLevels.classList.remove("minimize");
          createLevels();
    }


const createLevels = ()=>{
    let levels = document.querySelector('.Levels');
    for(let i=0; i<numberInfos.numLevels;i++){
        levels.innerHTML+=`
        <div class='input-questions' onclick='loadLevels(this)'>
            <div class="level">
                <p>Nivel ${i+1}</p>
                <img src="assets/Vector (1).svg" alt="lápis">
            </div>
        </div>
        <div class="make-levels minimize">
            <div class="input-infos">
                <div class="questions-title">Nível ${i+1}</div>
                <input class='level-title' type="text" placeholder="Título do nível">
                <input class='level-percentage'type="text" placeholder="% de acerto mínima">
                <input class='level-image'type="text" placeholder="URL da imagem do nível">
                <input class='level-description' type="text" placeholder="Descrição do nível">
            </div>
        </div>`
    }
}

const loadLevels = (level) =>{   
    level.classList.add('minimize');
    let makeLevels = document.querySelectorAll('.make-levels');
    makeLevels[numberInfos.levelNumber].classList.remove("minimize");
    numberInfos.levelNumber++;
}
const validateLevels = () =>{
    for(let i=0; i<numberInfos.numLevels;i++){
        const levelTitle = document.querySelectorAll(".level-title")[i];
        let levelPercentage = document.querySelectorAll(".level-percentage")[i];
        const levelImage = document.querySelectorAll(".level-image")[i];
        const levelDescription = document.querySelectorAll(".level-description")[i];
        levelPercentage.value=parseInt(levelPercentage.value);
        for( let i=0; i<numberInfos.numLevels;i++){
            levelPercentage = document.querySelectorAll(".level-percentage")[i];
            levelPercentage.value=parseInt(levelPercentage.value);
            if(levelPercentage.value==0){
                numberInfos.leastPercentage = true;    
            }
        }
        if(levelTitle.value.length<10){
            alert(`Título do Nível ${i+1} deve ter pelo menos 10 caracteres`);
            return;
        }else if(levelPercentage.value<0 || levelPercentage.value>100 || isNaN(levelPercentage.value)){
            alert(` A porcentagem deve ser um número entre 0 e 100, incluindo-os`);
            return;
        }else if(!isValidHttpUrl(levelImage.value)){
            alert(`A URL da questão ${i+1} não é válida`);
            return;
        }else if(levelDescription.value.length<30){
            alert(`A pergunta ${i+1} precisa ter uma Descrição do Nível 
            com pelo menos 30 Caracteres `);
            return;
        }
        if(!numberInfos.leastPercentage){
            alert(`É obrigatório existir pelo menos 1 nível cuja % de acerto mínima seja 0%`);
            return;
        }
        levels[i]={
            title: levelTitle.value,
            image: levelImage.value,
            text: levelDescription.value,
            minValue:levelPercentage.value
        }

    }
        formulateQuizz();
        console.log('Eu sou o quizz');
        console.log(quizz);
        sendQuizz();
        quizzLevels.classList.add('minimize');
        finalPage.classList.remove('minimize');
}

function formulateQuizz(){
    quizz={
        title:quizztitle,
        image:quizzimage,
        questions,
        levels
    }
}


function sendQuizz(){
    console.log(quizz);
    const promise = axios.post('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes',quizz);
    promise.then((response) => {
        id=response.data.id;
       let  accessMyQuizz = document.querySelector(".done-quizz");
       let buttonSubmit = document.querySelector('.finalButton');
       buttonSubmit.innerHTML=`<button class="button-submit" onclick="accessQuizz(${id})">Acessar quizz</button>`
        accessMyQuizz.innerHTML=``;
       accessMyQuizz.innerHTML+= ` <div onclick="accessQuizz(${id})" class='visualize-quizz' style='background-image: 
       linear-gradient(to top, black, transparent), url(${response.data.image})'> ;
       <p>${response.data.title}</p>
       </div>`
        getIds = JSON.parse(localStorage.getItem("Ids"));
        getIds.push(response.data.id);
        const temporaryId = JSON.stringify(getIds);
        localStorage.setItem("Ids",temporaryId);
        atualizeQuizzes();
    });
    promise.catch((response) => {
        console.log(response);
    });
}
function atualizeQuizzes(){
    const idSerial = localStorage.getItem("Ids");
    const idDiserial = JSON.parse(idSerial);
    console.log(idDiserial);
    if(idDiserial!==null){
        if(idDiserial.length>0){
            const addMore = document.querySelector('.add-more');
            const ownQuizzes=document.querySelector(".upper-box");
            const noQuizzYet = document.querySelector('.first-line');
            const quizzCreateButton = document.querySelector('.create-quizz');
            noQuizzYet.classList.add('minimize');
            quizzCreateButton.classList.add('minimize');
            ownQuizzes.classList.add('distance');
           
            addMore.innerHTML=`<div class="top">
            <p class="all-quizzes">Seus Quizzes</p>
            <img class="addSymbol" onclick="createQuizz()" src="assets/Frame 1.svg" alt="">
            </div>
            `
            for(let i=0; i<idDiserial.length;i++){
                const promise = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${idDiserial[i]}`);
                    promise.then((response)=>{
                    ownQuizzes.innerHTML +=` <div onclick="accessQuizz(${idDiserial[i]})" class='visualize-quizz' style='background-image: 
                    linear-gradient(to top, black, transparent), url(${response.data.image})'> 
                    <p>${response.data.title}</p>
                    </div>`  
                     });
                     promise.catch((response)=>{
                         console.log("erro-meu quizz");
                     });   
            }
        }
    }

}
atualizeQuizzes();

const  accessQuizz = (id) =>{
    finalPage.classList.add('minimize');
    startquizz(id);
}
const returnHome = () =>{
    const makeQuestions = document.querySelectorAll('.make-questions');
    const makeLevels = document.querySelectorAll('.make-levels');
    for(let i=0; i<makeQuestions.length;i++){
        makeQuestions[i].remove();
    }
    for(let i=0; i<makeLevels.length;i++){
        makeLevels[i].remove();
    }
     basicInfo.innerHTML=basicInfo.innerHTML;
     numberInfos.questionNumber=0;
     numberInfos.levelNumber=0;
     finalPage.classList.add('minimize');
     mainScreen.classList.remove('minimize');
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
  

function isHexColor(color){
    if(/^#[0-9A-F]{6}$/i.test(color)){
        return true;
    }else{
        return false;
    }
}