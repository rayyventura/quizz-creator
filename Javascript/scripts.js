
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
