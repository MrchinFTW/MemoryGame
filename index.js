const gameBoard = document.getElementsByClassName('container')[0];
let isMatch = false;
let firstClick = "";
let secondClick = "";
let rawClick;
let firstDiv;
let secondDiv;
for(let i=0;i<20;i++){
    const newCard = document.createElement('div');
    newCard.classList.add('memoryCard');
    newCard.setAttribute('id',i);
    const cardImg = document.createElement('img');
    cardImg.setAttribute('src', "images/1.jpg");
    newCard.appendChild(cardImg);
    gameBoard.appendChild(newCard)
}
hiddenImageSrc = ["https://static.u.gg/assets/lol/riot_static/12.22.1/img/champion/Zyra.webp",
"https://static.u.gg/assets/lol/riot_static/12.22.1/img/champion/Blitzcrank.webp",
"https://static.u.gg/assets/lol/riot_static/12.22.1/img/champion/Samira.webp",
"https://static.u.gg/assets/lol/riot_static/12.22.1/img/champion/Draven.webp",
"https://static.u.gg/assets/lol/riot_static/12.22.1/img/champion/Udyr.webp",
"https://static.u.gg/assets/lol/riot_static/12.22.1/img/champion/Mordekaiser.webp",
"https://static.u.gg/assets/lol/riot_static/12.22.1/img/champion/Darius.webp",
"https://static.u.gg/assets/lol/riot_static/12.22.1/img/champion/Aatrox.webp",
"https://static.u.gg/assets/lol/riot_static/12.22.1/img/champion/Heimerdinger.webp",
"https://static.u.gg/assets/lol/riot_static/12.22.1/img/champion/Akali.webp"];

const cards = document.querySelectorAll('.memoryCard');
let gamePattern = new Array(20)
gamePattern.fill("");
let randomNumber=0;
while(gamePattern.indexOf("")>=0){
    let positionOne = Math.floor(Math.random()*gamePattern.length);
    let positionTwo = Math.floor(Math.random()*gamePattern.length);
    if(gamePattern[positionOne]===""&&gamePattern[positionTwo]===""&&positionOne!==positionTwo){
        gamePattern[positionOne]=randomNumber;
        gamePattern[positionTwo]=randomNumber;
        randomNumber++
    }
}
console.log(gamePattern);

for(let i=0;i<cards.length;i++){
cards[i].addEventListener('click',(event)=>{
    let clickedDiv =  event;
    clicked(clickedDiv)
    // event.path[0] --- way to get to the image in the clicked div
    cards[i].classList.add('flip')    
})
}
/**
 .path[1].id - div ID number
 .path[0] - image element
 */
function clicked(clickedDiv){
    if (firstClick === ""){
        firstClick = gamePattern[clickedDiv.path[1].id];
        rawClick = clickedDiv.path[1].id;
        firstDiv = clickedDiv;
        firstDiv.path[0].getAttributeNode("src").value = hiddenImageSrc[firstClick]
    }else{
        if(clickedDiv.path[1].id !== rawClick){
            secondClick = gamePattern[clickedDiv.path[1].id];
            secondDiv = clickedDiv;
            secondDiv.path[0].getAttributeNode("src").value = hiddenImageSrc[secondClick]
            isMatch = checkForMatch(firstClick,secondClick)
            if (isMatch){
                console.log(isMatch);
                matched()
            }else{
                notAMatch(firstDiv,secondDiv)
            }
        }else{
            alert('you clicked here already')
        }
    }
}

function checkForMatch(firstClick,secondClick){
    if(firstClick !== secondClick){
        return false;
    }else{
        return true;
    }
}

function matched(){
    reset()
}

function notAMatch(firstDiv,secondDiv){
    reset()
    setTimeout(()=>{
        firstDiv.path[0].getAttributeNode("src").value = "images/1.jpg";
        secondDiv.path[0].getAttributeNode("src").value = "images/1.jpg";
    },1000)
}

function backFlip(i){
    cards[i].classList.add('reversFlip');
}

function reset(i){
    // cards[i].classList.remove('reversFlip');
    // cards[i].classList.remove('flip')
    isMatch = false;
    firstClick = "";
    secondClick = "";
}