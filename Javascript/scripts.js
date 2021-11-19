
const basicInfo = document.querySelector('.basic-info');
const quizzQuestions = document.querySelector('.quizz-questions');
const quizzLevels = document.querySelector('.level-page');
const mainScreen = document.querySelector(".main-screen");
const createdQuizzes = document.querySelector(".created-quizzes");

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
    promise.then(
        function success (result){
            console.log(result)
        }
    )
    promise.catch(function error(){
            console.log()
        }
    )
}
function getQuizz(quizzId){
    const obtainingAQuiz= axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${quizzId}`)
    promise.then(
        function success (result){
            console.log(result)
        }
    )
    promise.catch(function error(){
        console.log()
    }
)

}


function startquizz(id){
    document.querySelector(".main-screen").classList.add("minimize");
    document.querySelector(".quizz-screen").classList.remove("minimize");

    let number_question = [0, 1, 2, 3];
    number_question.sort(()=> (Math.random() - 0.5));
    console.log(number_question);
    const quizz = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${2}`);

    quizz.then((answer)=>{
        console.log(answer.data.questions[0].answers);
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
    });
}
function cardselected(button, correct){
    if(!(button.parentNode.classList.contains("check"))){
        button.classList.add("selected");
        button.parentNode.classList.add("check");
    }
    setTimeout(()=>{
        const options = document.querySelectorAll(".options");
        for(let i = 0; i < options.length; i++){
            if(!(options[i].classList.contains("check"))){
                options[i].parentNode.scrollIntoView();
            }
        }
    }, 2000);

}