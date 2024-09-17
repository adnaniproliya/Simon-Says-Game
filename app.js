let gameSeq = [];
let userSeq = [];
let btns = ["yellow", "red", "green", "purple"];
let started = false;
let level = 0;
let highScore = localStorage.getItem("highScore") || 0;

const h2 = document.querySelector("h2");
const highScoreDisplay = document.getElementById("high-score");

// Display initial high score
highScoreDisplay.innerText = highScore;

document.addEventListener("keypress", function () {
    if (!started) {
        h2.innerText = "Level 1";
        started = true;
        levelUp();
    }
});

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(() => {
        btn.classList.remove("flash");
    }, 150);
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(() => {
        btn.classList.remove("userflash");
    }, 150);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    // Corrected random index range to select from all 4 buttons
    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    let randBtn = document.getElementById(randColor);

    gameSeq.push(randColor);
    gameFlash(randBtn);
    console.log(gameSeq);
}

function checkAnswer(currentLevel) {
    if (userSeq[currentLevel] === gameSeq[currentLevel]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        updateHighScore();
        h2.innerHTML = `Game Over! Your Score was <b>${level}</b><br>Press any key to restart`;
        document.body.style.backgroundColor = "red";
        setTimeout(() => {
            document.body.style.backgroundColor = "#f4f4f4";
        }, 200);
        resetGame();
    }
}

function btnPress() {
    let btn = this;
    let userColor = btn.id;
    userSeq.push(userColor);
    userFlash(btn);
    checkAnswer(userSeq.length - 1);
}

document.querySelectorAll(".btn").forEach(btn => {
    btn.addEventListener("click", btnPress);
});

function resetGame() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}

function updateHighScore() {
    if (level > highScore) {
        highScore = level;
        localStorage.setItem("highScore", highScore);
        highScoreDisplay.innerText = highScore;
    }
}
