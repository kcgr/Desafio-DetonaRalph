const state ={
    view:{
        squares: document.querySelectorAll('.square'),
        enemy: document.querySelector('.enemy'),
        timeLeft: document.querySelector('#time-left'),
        score: document.querySelector('#score'),
    },
    values:{
        timerId: null,
        gameVelocity: 1000,
        countDownTimerId: setInterval(countDown,1000),
        //gameVelocity: Math.floor(Math.random()*1000),
        hitPosition: 0,
        result: 0,
        currentTime: 60,
        

    }
}

function countDown(){
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;
    if(state.values.currentTime === 0){
        clearInterval(countDownTimerId);
        clearInterval(state.values.timerId);
        alert('GAME OVER! Sua pontuação final ' + state.values.result);
    }
}
//função para o jogo ficar mais dificil
function increaseGameVelocity(){
//verifica se a pontuação é 5, 10, 15, 20, 25, 30, 35, 40, 45, 50
    if(state.values.result % 5 === 0 && state.values.result !== 0){
        state.values.gameVelocity -= 100;
        clearInterval(state.values.timerId); // Limpa o timer atual
        moveEnemy();
    }
    
    
}
function playSound(audioname){
    let audio = new Audio(`./src/audios/${audioname}.m4a`)
    audio.volume = 0.2;
    audio.play();

}
function ramdomSquare(){
    state.view.squares.forEach((square)=>{
        square.classList.remove('enemy');
    })
    let randomSquare = Math.floor(Math.random()*9);
    let square = state.view.squares[randomSquare];
    square.classList.add('enemy');
    state.values.hitPosition = square.id;
}

function moveEnemy(){
    state.values.timerId = setInterval(ramdomSquare,state.values.gameVelocity);
}

function addListenerHitBox(){
    state.view.squares.forEach((square)=>{
        square.addEventListener('mousedown',()=>{
            if(square.id === state.values.hitPosition){
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound('hit');
            }
        })
    });
}

function init(){
    moveEnemy();
    addListenerHitBox();
    countDown();
    setInterval(increaseGameVelocity,1000);
}
init();