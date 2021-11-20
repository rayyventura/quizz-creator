
const basicInfo = document.querySelector('.basic-info');
const quizzQuestions = document.querySelector('.quizz-questions');
const quizzLevels = document.querySelector('.level-page');
const mainScreen = document.querySelector(".main-screen");
function criarQuizz(){
    basicInfo.classList.remove('minimize');
    mainScreen.classList.add('minimize');
}
const finalPage = document.querySelector('.final-page');
function tirarPag(){
    basicInfo.classList.add('minimize');
    quizzQuestions.classList.remove('minimize');
}
function tirarPag2(){
    quizzQuestions.classList.add('minimize');
    quizzLevels.classList.remove('minimize');
}
function tirarPag3(){
    quizzLevels.classList.add('minimize');
    finalPage.classList.remove('minimize');
}
function tirarPag4(){
    finalPage.classList.add('minimize')
}
function getQuizzes(){
    const promise= axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes")
}



let countquizz = [0,0];
let levelinfo;

function startquizz(id){
    document.querySelector(".main-screen").classList.add("minimize");
    document.querySelector(".quizz-screen").classList.remove("minimize");

    let number_question = [0, 1, 2, 3];
    number_question.sort(()=> (Math.random() - 0.5));
   
    const quizz = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${1}`);

    quizz.then((answer)=>{
        const screen = document.querySelector(".quizz-screen");
        let header = screen.querySelector(".title-quizz");
        header.innerHTML = `
            <img src="${answer.data.image}"/>
            <div class="shadow"></div>
            <p>${answer.data.title}</p>
        `;
        questions = answer.data.questions;
        let areaquestion = document.querySelector(".container-quizz");
        areaquestion.innerHTML = "";
        let answerresult = [];
        countquizz[1] = questions.length;
        for(let i = 0; i< questions.length; i++){
            number_question.sort(()=> (Math.random() - 0.5));
            for(let j=0; j< 4; j++){
                if(questions[i].answers[number_question[j]].isCorrectAnswer){
                    answerresult[j] = "right";
                }else{
                    answerresult[j] = "wrong";
                }
            }
            console.log(questions[i].answers[number_question[0]].image);
            areaquestion.innerHTML += `
                <div class="box-quizz">
                    <div class="question">${questions[i].title}</div>
                    <div class="options">

                        <div class="answer ${answerresult[0]}" onclick="cardselected(this,${questions[i].answers[number_question[0]].isCorrectAnswer})">
                            <img src="${questions[i].answers[number_question[0]].image}"/>
                            <p>${questions[i].answers[number_question[0]].text}</p>
                        </div>
                        <div class="answer ${answerresult[1]}" onclick="cardselected(this,${questions[i].answers[number_question[1]].isCorrectAnswer})">
                            <img src="${questions[i].answers[number_question[1]].image}"/>
                            <p>${questions[i].answers[number_question[1]].text}</p>
                        </div>
                        <div class="answer ${answerresult[2]}" onclick="cardselected(this,${questions[i].answers[number_question[2]].isCorrectAnswer})">
                            <img src="${questions[i].answers[number_question[2]].image}"/>
                            <p>${questions[i].answers[number_question[2]].text}</p>
                        </div>
                        <div class="answer ${answerresult[3]}" onclick="cardselected(this,${questions[i].answers[number_question[3]].isCorrectAnswer})">
                            <img src="${questions[i].answers[number_question[3]].image}"/>
                            <p>${questions[i].answers[number_question[3]].text}</p>
                        </div>
                        
                    </div>
                </div>
            `; 
        }
        levelinfo = answer.data.levels;
    });
    quizz.catch((erro)=>{
        //console.log(erro.response);
    });
}
function cardselected(button, correct){

    if(correct){
        countquizz[0] += 1;
    }

    if(!(button.parentNode.classList.contains("check"))){
        button.classList.add("selected");
        button.parentNode.classList.add("check");
    }

    setTimeout(()=>{
        const options = document.querySelectorAll(".options");
        for(let i = 0; i < options.length; i++){
            if(!(options[i].classList.contains("check"))){
                options[i].parentNode.scrollIntoView();
                break;
            }
        }
    }, 2000);
    if(document.querySelectorAll(".check").length === countquizz[1]){
        resultcalc();
    }
}

function resultcalc(){
    
    setTimeout(()=>{
        const resultarea = document.querySelector(".container-quizz");
        let result = Math.round((countquizz[0]/countquizz[1])*100);
        let level;
        for(let i = 0; i <levelinfo.length; i++ ){
            if(result > levelinfo[i].minValue){
                level = i;
            }
        }
        resultarea.innerHTML+= `
            <div class="box-result">
                <div class="result">${result}% de acerto: ${levelinfo[level].title}</div>
                <div class="result-details">
                    <img src="${levelinfo[level].image}"/>
                    <div>${levelinfo[level].text}</div>
                </div>
            </div>
        `;

        document.querySelector(".box-result").scrollIntoView();
        
    }, 2000);
}