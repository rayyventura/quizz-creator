
function showingQuizzLayout (quizz){
    const quizzCard = document.createElement("div")
    const colors = `<div class ="color-changes"> </div>`
    const image = `<img class="img-layout" src ="${quizz.image}">`
    quizzCard.setAttribute("data-identifier","quizz-card");
    quizzCard.classList.add("quizz")
    const quizzTitle = `<p class ="quizzes-names typography">${quizz.title}</p>`
    let quizzSpace = document.querySelector(".quizzes")
    quizzCard.innerHTML= `${colors} ${image} ${quizzTitle}`
    quizzCard.onclick = function (){
        startquizz(quizz.id)
    }
    quizzSpace.appendChild(quizzCard);

    setTimeout(()=>{
        document.querySelector(".loading-screen").classList.add("minimize");
        document.querySelector(".main-screen").classList.remove("minimize");
    }, 1500);

    
}
function getQuizzes(){
    const promise= axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes")
    promise.then(
        function success (result){
        for(let i= 0; i < result.data.length;i++){
            showingQuizzLayout(result.data[i])
        }
            console.log(result)
        }
    )
    promise.catch(function error(fault){
            console.log(fault)
        }
    )


}
function getQuizz(quizzId){
    const obtainingAQuiz= axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${quizzId}`)
    obtainingAQuiz.then(
        function success (result){
            console.log(result)
        }
    )
    obtainingAQuiz.catch(function error(){
        console.log()
    }
)

}


let countquizz = [0,0];
let levelinfo, idquizz;
function startquizz(id){
    
    document.querySelector(".main-screen").classList.add("minimize");
    document.querySelector(".loading-screen").classList.remove("minimize");

    idquizz = id;
    countquizz = [0,0];
    let number_question = [];
    //number_question.sort(()=> (Math.random() - 0.5));
   
    const quizz = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${id}`);

    quizz.then((answer)=>{
        
        const screen = document.querySelector(".quizz-screen");

        let header = screen.querySelector(".title-quizz");
        header.innerHTML = `
            <img src="${answer.data.image}"/>
            <div class="shadow"></div>
            <p>${answer.data.title}</p>
        `;

        let questions = answer.data.questions;
        let areaquestion = document.querySelector(".container-quizz");

        areaquestion.innerHTML = "";
        let answerresult = [];
        countquizz[1] = questions.length;

        for(let i = 0; i< questions.length; i++){
            number_question=[];

            areaquestion.innerHTML += `
                <div class="box-quizz">
                    <div class="question" style="background-color: ${questions[i].color}; ">${questions[i].title}</div>
                    <div class="options">                        
                    </div>
                </div>
            `;
            
            for(let j=0; j< questions[i].answers.length; j++){
                number_question.push(j);  
            }
            number_question.sort(()=> (Math.random() - 0.5));

            for(let j=0; j< questions[i].answers.length; j++){
                if(questions[i].answers[number_question[j]].isCorrectAnswer){
                    answerresult[j] = "right";
                }else{
                    answerresult[j] = "wrong";
                }  
            }

            const localanswers = document.querySelectorAll(".options");
            for(let j=0; j< questions[i].answers.length; j++){
                localanswers[i].innerHTML +=`
                    <div class="answer ${answerresult[j]}" onclick="cardselected(this,${questions[i].answers[number_question[j]].isCorrectAnswer})">
                        <img src="${questions[i].answers[number_question[j]].image}"/>
                        <p>${questions[i].answers[number_question[j]].text}</p>
                    </div>
                `;
            } 
        }
        levelinfo = answer.data.levels;
    });
    quizz.catch((erro)=>{
        //console.log(erro.response);
    });
    
    setTimeout(()=>{
        document.querySelector(".loading-screen").classList.add("minimize");
        document.querySelector(".quizz-screen").classList.remove("minimize");
    }, 1500);
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
    console.log(levelinfo);
    setTimeout(()=>{
        const resultarea = document.querySelector(".container-quizz");
        let result = Math.round((countquizz[0]/countquizz[1])*100);
        let level = 0;
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

function restartquizz(){
    startquizz(idquizz);
    document.querySelector(".title-quizz").scrollIntoView();
    
}
function backhome(){
    document.querySelector(".main-screen").classList.remove("minimize");
    document.querySelector(".quizz-screen").classList.add("minimize");
}

getQuizzes();
