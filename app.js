const hitButton = document.querySelector("#hit");
const standButton = document.querySelector("#stand");
const dealtButton = document.querySelector("#dealt");
const result = document.querySelector(".result")
let num = 0;
let drawScore = 0;

let suit = {
    1: "heart",
    2: "diamond",
    3: "spade",
    4: "club"
}
function reset(){
    user.sum = 0;
    machine.sum = 0;
}
function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function () {
    this.sound.play();
    };
    this.stop = function () {
    this.sound.pause();
    };
}

let drawSound = new sound("sounds/draw.m4a");
let loseSound = new sound("sounds/lose.mp3");
let winSound = new sound("sounds/cash.mp3");


function compare(){
    result.style.display = "inline";
    document.querySelector(".board").style.opacity = "0.3";
    if (user.sum == "busts"){
        result.textContent = "LOST";
        return false;
    }
    else if (user.sum != "busts" && machine.sum == "busts"){
        result.textContent = "WON";
        return true;
    }
    if (user.sum > machine.sum){
        result.textContent = "WON";
    }
    else if (user.sum < machine.sum){
        result.textContent = "LOST";
        return false;
    }
    else{
        result.textContent = "DRAWN";
        return;
    }
}

function randomCard(){
    num = Math.floor(Math.random()*13) + 1;
    let numSuit = Math.floor(Math.random()*4) + 1;
    return "img/" + suit[numSuit] + num + ".png";
}

function Player(sum, score , classBoard, idSum){
    this.score = score;
    this.sum = sum;
    this.drawCard = function(){
        drawSound.play();
        let image = document.createElement("img");
        image.src = randomCard();
        document.querySelector(classBoard).appendChild(image);
        console.log(num);
        if (num > 10){
            this.sum += 10;
        } 
        else{
            this.sum += num;
        }
        if (this.sum > 21){
            this.sum = "busts"
            return document.querySelector(idSum).textContent = this.sum;
        }
        document.querySelector(idSum).textContent = this.sum;
    }

}        

result.style.display = "none";
let user = new Player(0, 0, ".user-board", "#user-sum");
let machine = new Player(0 ,0, ".machine-board", "#machine-sum");
    hitButton.addEventListener("click", function(){
        user.drawCard();
    });
    standButton.addEventListener("click", function(){
        hitButton.removeEventListener("click", user.drawCard)
        while(machine.sum < 17){
            machine.drawCard()
        }
        if(compare()){
            user.score ++;
            document.querySelector("#user-score").textContent = "Score: " + user.score;
            winSound.play();
        }
        else if(compare() == false){
            machine.score ++;
            document.querySelector("#machine-score").textContent = "Score: " + machine.score;
            loseSound.play();
        }
    })

dealtButton.addEventListener("click", function(){
    document.querySelector(".board").style.opacity = "1";
    let imageTag = document.querySelector(".board").querySelectorAll("img");
    for (let i = 0; i < imageTag.length; i++){
        imageTag[i].remove();
    }  
    user.sum = 0;
    machine.sum = 0;
    result.style.display = "none";
    document.querySelector("#user-sum").textContent = "Sum"
    document.querySelector("#machine-sum").textContent = "Sum"
} )