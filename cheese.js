// import list of cheese objects from cheeses.js
import { easyList } from '/cheese_db.js';

let cheesesUsed = [];
let incorrectCheeses = [];

// progress bar
let currentProgress = 0;
let prog = document.getElementById("progBar");
prog.value = currentProgress;
prog.max = easyList.length;

function incProg() {
    prog.value += 1;
}

// function for setting the current score
let score = 0;
function setScore(score) {
    let scoreNum = document.getElementById("scoreNum");
    scoreNum.innerText = score;
};
setScore(0);

let imgDiv = document.getElementById("cheese-container");
let answersDiv = document.getElementById("answersDiv")
let contDiv = document.getElementById("contDiv");
let contButton = document.createElement("button");
let info = document.createElement("p");
let br = document.createElement("br");
info.id = "infoPara";

// add continue button
function addContinue(pickNum) {
    info.innerHTML = easyList[pickNum]["name"] + "<br><br>" + easyList[pickNum]["milk"] + "<br>" +
                     easyList[pickNum]["origin"] + "<br>" + easyList[pickNum]["catagory"] +
                     "<br><br>" + easyList[pickNum]["blurb"];
    contButton.id = "contButton";
    contButton.innerText = "CONTINUE";
    contDiv.appendChild(info);
    contDiv.appendChild(br);
    contDiv.appendChild(contButton);
    contButton.addEventListener("click", function() {
        console.log("cheesesUsed when continue button was pressed: " + cheesesUsed)
        contButton.remove();
        info.remove();
        if (!gameEndCheck()) {
            getCheese();
        }
    })
};

// when all cheeses are present in cheeses-used, display final score page
function gameEndCheck() {
    if (cheesesUsed.length == easyList.length) {
        let percent = (score / easyList.length) * 100;
        percent = Math.round(percent);
        answersDiv.innerHTML = "";
        imgDiv.innerHTML = "";
        imgDiv.innerHTML = "Final Score: <br>" + percent + "%<br>" + score + " out of " + easyList.length + "<br><br>You are:<br>";
        imgDiv.style.border = "2px solid black";
        imgDiv.style.marginTop = "20px";
        if (score == 22) {
            imgDiv.innerHTML += "Cheese God";
        }
        else if (score < 22 && score > 16) {
            imgDiv.innerHTML += "Whey Better Than Most";
        }
        else if (score <= 16 && score > 11) {
            imgDiv.innerHTML += "A Cultured Curdslinger";
        }
        else if (score <= 11 && score > 5) {
            imgDiv.innerHTML += "A Brie-ginner";
        }
        else if (score <= 5 && score > 0) {
            imgDiv.innerHTML += "Curd Curious";
        }
        else if (score == 0) {
            imgDiv.innerHTML += "Lost in the Dairy Aisle";
        }
        if (incorrectCheeses.length > 0) {
            imgDiv.innerHTML += "<br><br>Cheeses you missed:<br>";
            for (let i = 0; i < incorrectCheeses.length; i++) {
                let wrongGuess = document.createElement("span");
                wrongGuess.innerHTML = incorrectCheeses[i] + "<br>";
                wrongGuess.className = "wrongGuess"
                imgDiv.appendChild(wrongGuess);
            }
        }
        let retry = document.createElement("button");
        retry.innerText = "Try again?"
        imgDiv.appendChild(retry);
        retry.addEventListener("click", function() {
            location.reload();
        });

        return true;
    }
    return false;
}

// get cheese function
function getCheese() {

    answersDiv.innerHTML = "";
    imgDiv.innerHTML = "";

    // select a cheese, if it's in cheeses-used, picked again
    let pickNum;
    do {
        pickNum = Math.floor(Math.random() * easyList.length);
    } while (cheesesUsed.includes(easyList[pickNum]["name"]));

    // add the cheese img-url to cheese-image div
    let img = document.createElement("img")
    img.src = easyList[pickNum]["url"];
    img.alt = easyList[pickNum]["name"];
    img.width = 400;
    imgDiv.appendChild(img);

    // distribute the name and the wrong ans to the answer buttons
    let answers = easyList[pickNum]["wrongNames"];
    if (!answers.includes(easyList[pickNum]["name"])) {
        answers.push(easyList[pickNum]["name"]);
    }
    answers.sort(() => Math.random() - 0.5);
    for (let i = 0; i < answers.length; i++) {
        let button = document.createElement("button")
        button.id = "ans" + i;
        button.innerText = answers[i]
        if (answers[i] == easyList[pickNum]["name"]) {
            button.className = "correct"
        }
        else {
            button.className = "wrong";
        }
        answersDiv.appendChild(button);
    }

    // add event listener to check if user clicked on correct or incorrect button
    // if user clicked on correct button, highlight the button in green and increase the score by 1
    // if user clicked on incorrect button, highlight that button in red, and highlight the correct button in green
    let correctButton = document.getElementsByClassName("correct");
    let corrButtonHandler = function() {
        // add that cheese name to cheeses-used
        cheesesUsed.push(easyList[pickNum]["name"]);

        correctButton[0].style.backgroundColor = "#9eec1d";
        score += 1;
        setScore(score);
        incProg();
        addContinue(pickNum);
    }
    correctButton[0].addEventListener("click", corrButtonHandler);

    let wrongButtons = document.getElementsByClassName("wrong");
    for (let i = 0; i < wrongButtons.length; i++) {
        let wrongButtonHandler = function() {
            // add that cheese name to cheeses-used
            cheesesUsed.push(easyList[pickNum]["name"]);
            incorrectCheeses.push(easyList[pickNum]["name"]);

            wrongButtons[i].style.backgroundColor = "#fe4343";
            correctButton[0].style.backgroundColor = "#9eec1d";
            incProg()
            addContinue(pickNum);
        }
        wrongButtons[i].addEventListener("click", wrongButtonHandler)
    };
};

getCheese();
