const state = {
    view:{
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score:document.querySelector("#score"),
        playerLife: document.querySelector("#life"),
        resultScore:document.querySelector("#maxScore"),
        gameOver: document.querySelector(".hidden"),
    },

    values:{
        
        gameVelocity:500,
        hitPosition:0,
        result:0,
        currentTime:30,
        life:3,
        maxScore:0,
        
    },

    actions:{
        timerId:setInterval(randomSquare,500),
        countDownTimerId:setInterval(countDown,500),
        
    }

}

function randomSquare(){
    state.view.squares.forEach((square)=>{
        square.classList.remove("enemy");
    })

    let randomNumber = Math.floor(Math.random()*9);
    let randomSquare = state.view.squares[randomNumber];
    
    if(state.values.life>0){
        randomSquare.classList.add("enemy");
        state.values.hitPosition = randomSquare.id;
    } else{
            clearInterval(state.actions.countDownTimerId);
            clearInterval(state.actions.currentTime);
           
            state.view.resultScore.textContent = "Pontuação máxima: "+ finalScore();
            state.view.gameOver.classList.add("gameOver");
            state.values.currentTime = 0;
            state.view.timeLeft.textContent= state.values.currentTime;
            state.values.hitPosition = null;
    }
    
}


function addListenerHitBox(){
    state.view.squares.forEach((square)=>{
        square.addEventListener("mousedown",()=>{
            if(square.id === state.values.hitPosition && state.values.life>0){
                state.values.result++;
                playSound();
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
            }
        })
    })
}

function playSound(){
    let audio = new Audio("./src/audio/hit.m4a");
    audio.volume=0.2;
    audio.play();
}

function countDown(){
    if(state.values.life>0){
    state.values.currentTime--;
    state.view.timeLeft.textContent= state.values.currentTime;
    state.view.playerLife.textContent =" x"+ state.values.life;
    }

    if (state.values.currentTime <= 0){
        
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.currentTime);
        
        finalScore()
        lifes()

        
    }
    
}
function lifes(){
    if(state.values.life >= 1){
        setInterval(countDown,500)
        state.values.currentTime = 30;
        state.values.life--;
        state.view.playerLife.textContent =" x"+ state.values.life;
        state.values.result = 0;
        state.view.score.textContent = state.values.result;
        
        
    }
}

function finalScore(){
    if(state.values.result > state.values.maxScore){
        state.values.maxScore = state.values.result;
    }
    return state.values.maxScore
} 

function init(){
    
    addListenerHitBox()
    
}
init();