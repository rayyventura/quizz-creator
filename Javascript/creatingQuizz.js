const basicInfo = document.querySelector('.basic-info');
const quizzQuestions = document.querySelector('.quizz-questions');
const quizzLevels = document.querySelector('.level-page');
const mainScreen = document.querySelector('.main-screen');
const finalPage = document.querySelector('.final-page');
let idDiserial;
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
        <div class="input-questions" onclick="loadQuestions(this)"  data-identifier="expand">
        <div class="pergunta" >
        <p>Pergunta ${i+1}</p>
        <img src="assets/Vector (1).svg" alt="lápis">
            </div>
        </div>
        <div class="make-questions minimize">
            <div class="input-infos data-identifier="question"">
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
        <div class='input-questions' onclick='loadLevels(this)' data-identifier="expand">
            <div class="level">
                <p>Nivel ${i+1}</p>
                <img src="assets/Vector (1).svg" alt="lápis">
            </div>
        </div>
        <div class="make-levels minimize">
            <div class="input-infos" data-identifier="level">
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
    const promise = axios.post('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes',quizz);
    promise.then((response) => {
        id=response.data.id;
        let key = response.data.key;
       storeKey(id,key);
       let  accessMyQuizz = document.querySelector(".done-quizz");
       let buttonSubmit = document.querySelector('.finalButton');
       buttonSubmit.innerHTML=`<button class="button-submit" onclick="accessQuizz(${id})">Acessar quizz</button>`
        accessMyQuizz.innerHTML=``;
       accessMyQuizz.innerHTML+= ` <div onclick="accessQuizz(${id})" class='visualize-quizz' style='background-image: 
       linear-gradient(to top, black, transparent), url(${response.data.image})'> ;
       <p>${response.data.title}</p>
       </div>`
       if(JSON.parse(localStorage.getItem("Ids"))!==null){
           getIds = JSON.parse(localStorage.getItem("Ids"));
       }
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
    idDiserial = JSON.parse(idSerial);
    if(idDiserial!==null){
        if(idDiserial.length>0){
            const addMore = document.querySelector('.add-more');
            const ownQuizzes=document.querySelector(".upper-box");
            const noQuizzYet = document.querySelector('.first-line');
            const quizzCreateButton = document.querySelector('.create-quizz');
            noQuizzYet.classList.add('minimize');
            quizzCreateButton.classList.add('minimize');
            ownQuizzes.classList.add('distance');
            ownQuizzes.innerHTML='';
            addMore.innerHTML=`<div class="top">
            <p class="all-quizzes">Seus Quizzes</p>
            <img class="addSymbol" onclick="createQuizz()" src="assets/Frame 1.svg" alt="">
            </div>
            `
            for(let i=0; i<idDiserial.length;i++){
                const promise = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${idDiserial[i]}`);
                    promise.then((response)=>{
                    ownQuizzes.innerHTML +=` 
                    <div class="selectionarea">
                        <div onclick="accessQuizz(${idDiserial[i]})" class='visualize-quizz' style='background-image: 
                        linear-gradient(to top, black, transparent), url(${response.data.image})'> 
                        <p>${response.data.title}</p>
                        </div>
                        <div class="settings-quizz">
                            <svg width="25" height="24" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg" onclick="editQuizzes()">
                                <path d="M3.88672 14.1253L8.17537 14.1107L17.536 4.83956C17.9033 4.47221 18.1055 3.98435 18.1055 3.4654C18.1055 2.94645 17.9033 2.45859 17.536 2.09124L15.9947 0.54993C15.26 -0.184768 13.9781 -0.18088 13.2493 0.547015L3.88672 9.82015V14.1253V14.1253ZM14.6205 1.92409L16.1647 3.46248L14.6127 4.99991L13.0714 3.45957L14.6205 1.92409ZM5.83036 10.6306L11.6905 4.82595L13.2318 6.36726L7.37265 12.17L5.83036 12.1749V10.6306Z" fill="white"/>
                                <path d="M1.94365 18H15.5492C16.6211 18 17.4928 17.1283 17.4928 16.0564V7.6326L15.5492 9.57625V16.0564H5.01266C4.98739 16.0564 4.96115 16.0661 4.93589 16.0661C4.90382 16.0661 4.87175 16.0573 4.8387 16.0564H1.94365V2.45085H8.59771L10.5414 0.507202H1.94365C0.871725 0.507202 0 1.37893 0 2.45085V16.0564C0 17.1283 0.871725 18 1.94365 18Z" fill="white"/>
                            </svg>
                            <svg width="25" height="28" viewBox="0 0 19 22" fill="none" xmlns="http://www.w3.org/2000/svg" onclick="deleteQuizzes(${idDiserial[i]})">
                                <path d="M5.846 8.03845C6.03982 8.03845 6.22569 8.11544 6.36274 8.25249C6.49978 8.38954 6.57677 8.57541 6.57677 8.76922V17.5385C6.57677 17.7323 6.49978 17.9181 6.36274 18.0552C6.22569 18.1922 6.03982 18.2692 5.846 18.2692C5.65219 18.2692 5.46632 18.1922 5.32927 18.0552C5.19223 17.9181 5.11523 17.7323 5.11523 17.5385V8.76922C5.11523 8.57541 5.19223 8.38954 5.32927 8.25249C5.46632 8.11544 5.65219 8.03845 5.846 8.03845ZM9.49985 8.03845C9.69366 8.03845 9.87954 8.11544 10.0166 8.25249C10.1536 8.38954 10.2306 8.57541 10.2306 8.76922V17.5385C10.2306 17.7323 10.1536 17.9181 10.0166 18.0552C9.87954 18.1922 9.69366 18.2692 9.49985 18.2692C9.30604 18.2692 9.12016 18.1922 8.98312 18.0552C8.84607 17.9181 8.76908 17.7323 8.76908 17.5385V8.76922C8.76908 8.57541 8.84607 8.38954 8.98312 8.25249C9.12016 8.11544 9.30604 8.03845 9.49985 8.03845ZM13.8845 8.76922C13.8845 8.57541 13.8075 8.38954 13.6704 8.25249C13.5334 8.11544 13.3475 8.03845 13.1537 8.03845C12.9599 8.03845 12.774 8.11544 12.637 8.25249C12.4999 8.38954 12.4229 8.57541 12.4229 8.76922V17.5385C12.4229 17.7323 12.4999 17.9181 12.637 18.0552C12.774 18.1922 12.9599 18.2692 13.1537 18.2692C13.3475 18.2692 13.5334 18.1922 13.6704 18.0552C13.8075 17.9181 13.8845 17.7323 13.8845 17.5385V8.76922Z" fill="white"/>
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M19 4.38462C19 4.77224 18.846 5.14399 18.5719 5.41808C18.2978 5.69217 17.9261 5.84615 17.5385 5.84615H16.8077V19C16.8077 19.7752 16.4997 20.5187 15.9515 21.0669C15.4034 21.6151 14.6599 21.9231 13.8846 21.9231H5.11538C4.34014 21.9231 3.59664 21.6151 3.04846 21.0669C2.50027 20.5187 2.19231 19.7752 2.19231 19V5.84615H1.46154C1.07391 5.84615 0.702166 5.69217 0.428075 5.41808C0.153983 5.14399 0 4.77224 0 4.38462V2.92308C0 2.53545 0.153983 2.1637 0.428075 1.88961C0.702166 1.61552 1.07391 1.46154 1.46154 1.46154H6.57692C6.57692 1.07391 6.73091 0.702166 7.005 0.428075C7.27909 0.153983 7.65084 0 8.03846 0L10.9615 0C11.3492 0 11.7209 0.153983 11.995 0.428075C12.2691 0.702166 12.4231 1.07391 12.4231 1.46154H17.5385C17.9261 1.46154 18.2978 1.61552 18.5719 1.88961C18.846 2.1637 19 2.53545 19 2.92308V4.38462ZM3.82631 5.84615L3.65385 5.93238V19C3.65385 19.3876 3.80783 19.7594 4.08192 20.0335C4.35601 20.3076 4.72776 20.4615 5.11538 20.4615H13.8846C14.2722 20.4615 14.644 20.3076 14.9181 20.0335C15.1922 19.7594 15.3462 19.3876 15.3462 19V5.93238L15.1737 5.84615H3.82631ZM1.46154 4.38462V2.92308H17.5385V4.38462H1.46154Z" fill="white"/>
                            </svg>
                        </div>
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
     location.reload();
     
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
function storeKey(id, key){
    let gettingKey = localStorage.getItem('key')
    let keys;
    if(gettingKey == null){
        keys = {}
    }
    else{
        keys = JSON.parse(gettingKey)
    }
    keys[id] = key 
    const keysStr = JSON.stringify(keys)
    localStorage.setItem('key',keysStr)
}
function deleteQuizzes(id){
    let answer = window.confirm("Deseja excluir este quizz?");
    if(answer){
        const gettingKey= localStorage.getItem('key')
        const keyStorage = JSON.parse(gettingKey)
        const promise = axios.delete(
            `https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${id}`,
            {
                headers: {
                    'Secret-Key':keyStorage[id]
                }
            }
        );
        promise.then((resp)=>{location.reload();});
        promise.catch((resp)=>{alert("falhou!")});
    }
    idDiserial.forEach((element,index)=>{
        if(element===id){
            idDiserial.splice(index,1);
        }
    });
    localStorage.setItem("Ids",JSON.stringify(idDiserial));

}
function editQuizzes(){
    location.reload();
}

