let gameSeq=[];
let userSeq=[];

let btns=["yellow","red","purple","green"];

let started=false;
let level=0;

let h2=document.querySelector("h2");

document.addEventListener("keypress",function(){
    if(started==false) {
        started=true;
        levelUp();
    }
});

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(()=> {
        btn.classList.remove("flash");
    },300);
}
function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(()=> {
        btn.classList.remove("userflash");
    },300);
}

function levelUp() {
    userSeq=[];
    level++;
    h2.innerText=`level ${level}`;

    let randIdx=Math.floor(Math.random() * 3);
    let randColor=btns[randIdx];
    let randbtn=document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    gameFlash(randbtn);
}


function checkAns(idx) {

    if(userSeq[idx] === gameSeq[idx]) {
        if(userSeq.length === gameSeq.length) {
            setTimeout(levelUp(),1000);
        }
    } else {
        display();
        reset();
    }
}

function btnPress() {
    let btn=this;
    userFlash(btn);

    userColor=btn.getAttribute("id");
    userSeq.push(userColor);
    
    checkAns(userSeq.length-1);
}

let allBtns=document.querySelectorAll(".btn");
for(btn of allBtns) {
    btn.addEventListener("click",btnPress);
}

function reset() {
    started=false;
    gameSeq=[];
    userSeq=[];
    level=0;
}

function display() {
    h2.innerText=`Game Over! Your score was ${level}. \n Press any Key to start.`
    document.querySelector("body").style.backgroundColor="red";
    setTimeout(()=> {
        document.querySelector("body").style.backgroundColor="white";
    },150);
}