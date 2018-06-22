var timeOut = 5;
var timeOutTextStart = "Time Remaining: ";
var timeOutTextEnd = " Seconds";

var startGame = document.getElementById("StartGame");

//variables for Game
var qH2 = "";
var qImg = document.createElement("img");
qImg.setAttribute("class", " questionsImage");
var optH2 = [];
var qInput = [];
var qSpan = [];
var triviaQObj;
var question_number = 0;
var answerClicked = "false";


//variables for showAnswer 
var showAnswerTimeOut = 3;
var ShowAnswerIntervalId;
var qDiv = document.getElementById("gameDiv");
var aDiv = document.getElementById("showAnswer");
var aP = document.createElement("p");

aP.setAttribute("id", "videoClip");
var aImg = document.createElement("img");
aImg.setAttribute("width", "440");
aImg.setAttribute("height", "260");
var aCommentH2 = document.createElement("h2");
aCommentH2.setAttribute("id", "comment");
var aCorrectAnswerH2 = document.createElement("h2");
aCorrectAnswerH2.setAttribute("id", "correctAnswerComment");
var answerWrong = "Nope!!";
var answerRight = "Correct!!";
var answerTimeout = "Out of Time!!";
var answerCorrect = "Correct Answer Is: ";

//Variable for Final Results
var correctAnswers = 0;
var inCorrectAnswers = 0;
var notAnswered = 0;
var rDiv = document.getElementById("resultDiv");
var rH2 = document.createElement("h2");
rH2.setAttribute("class", "allDone");
rH2.innerHTML = "All Done!!";
var rcorrctAnsSpan = document.createElement("span");
rcorrctAnsSpan.setAttribute("id", "correctAnswer");
var rincorrctAnsSpan = document.createElement("span");
rincorrctAnsSpan.setAttribute("id", "inCorrectAnswer");
var runAnsweredSpan = document.createElement("span");
runAnsweredSpan.setAttribute("id", "unAnswered");

var rcorrectAnsP = document.createElement("p");
rcorrectAnsP.setAttribute("class", "answerP");
rcorrectAnsP.innerHTML = "Correct Answer: ";
rcorrectAnsP.appendChild(rcorrctAnsSpan);

var rincorrectAnsP = document.createElement("p");
rincorrectAnsP.setAttribute("class", "answerP");
rincorrectAnsP.innerHTML = "InCorrect Answer: ";
rincorrectAnsP.appendChild(rincorrctAnsSpan);

var runAnsweredP = document.createElement("p");
runAnsweredP.setAttribute("class", "answerP");
runAnsweredP.innerHTML = "Unanswered: ";
runAnsweredP.appendChild(runAnsweredSpan);

var rstartOverButton = document.createElement("button");
rstartOverButton.setAttribute("id", "reStartGame");
rstartOverButton.setAttribute("onclick", "startClicked()");
rstartOverButton.innerHTML = "START OVER";

var rStartOverDiv = document.createElement("div");
rStartOverDiv.setAttribute("id", "startOver");
rStartOverDiv.appendChild(rstartOverButton);


var triviaQuestions = [
    {
        name: "firstQ",
        question: "The Killer",
        question_img: "./assets/images/B_TheKiller.jpg",
        option: ["Fast And Furious", "Taxi", "Collateral", "Speed"],
        answer: "Collateral",
        clicked: "false",
        answered: "false",
        vidoeClip: "./assets/images/colattler.gif"
    },

    {
        name: "secondQ",
        question: "Aabra Ka Daabra",
        question_img: "./assets/images/AabraKaDaabra.jpg",
        option: ["Lord Of The Rings", "Magic Mike", "Matilda", "H Potter And The Philo Stone"],
        answer: "H Potter And The Philo Stone",
        clicked: "false",
        answered: "false",
        vidoeClip: "./assets/images/h_harrypotter.gif"
    },

    {
        name: "thirdQ",
        question: "Teen Patti",
        question_img: "./assets/images/b_teenPatti.jpg",
        option: ["21", "A Nutty Professor", "Oceans 11", "Casino Royale"],
        answer: "21",
        clicked: "false",
        answered: "false",
        vidoeClip: "./assets/images/h_21.gif"
    },

    {
        name: "fourthQ",
        question: "Kaante",
        question_img: "./assets/images/b_Kaante.jpg",
        option: ["Dogs Day Afternoon", "Reservoir Dogs", "Heat", "Point Break"],
        answer: "Reservoir Dogs",
        clicked: "false",
        answered: "false",
        vidoeClip: "./assets/images/h_reservoir_dogs.jpg"
    }


];
//StartUp
$(".h2heading").text(timeOutTextStart + timeOut + timeOutTextEnd);
startGame.addEventListener("click", startClicked);


// Called from START and START OVER
function startClicked() {
    notAnswered = 0;
    correctAnswers = 0;
    inCorrectAnswers = 0;
    question_number = 0;
    timeOut = 5;
    showAnswerTimeOut = 3;

    answerClicked = "false";
    document.getElementById("StartGame").style.display = "none";
    document.getElementById("resultDiv").style.display = "none";
    document.getElementById("gameDiv").style.display = "block";
    document.getElementById("showTimer").style.display = "block";

    loadNextQuiz();
    manageGameTimer();
};

// Called from OPTIONS selected by user
function optionsClicked(obj) {
    answerClicked = "true";
    var answerSelected = obj.innerHTML;
    var answerIs = triviaQObj.answer;
    aCommentH2.innerHTML = answerWrong;
    aCorrectAnswerH2.innerHTML = answerCorrect + " " + triviaQObj.answer + "!!";
    aImg.setAttribute("src", triviaQObj.vidoeClip);

    if (answerSelected === triviaQObj.answer) {
        correctAnswers += 1;
        aCommentH2.innerHTML = answerRight;

    } else {
        inCorrectAnswers += 1;
    }
    document.getElementById("gameDiv").style.display = "none";
    document.getElementById("showAnswer").style.display = "block";
    loadAnswerDiv();
    showAnswerTimer();
};

function showTimeOutAnswer() {
    notAnswered += 1;
    aCommentH2.innerHTML = answerTimeout;
    aCorrectAnswerH2.innerHTML = answerCorrect + " " + triviaQObj.answer + "!!";
    aImg.setAttribute("src", triviaQObj.vidoeClip);
    loadAnswerDiv();
    showAnswerTimer();
    document.getElementById("gameDiv").style.display = "none";
    document.getElementById("showAnswer").style.display = "block";
}

//Load next quiz called at START START OVER and get next quiz
function loadNextQuiz() {
    $("#gameDiv").empty();
    triviaQObj = triviaQuestions[question_number];
    qImg.setAttribute("src", triviaQObj.question_img);
    qH2 = document.createElement("h2");
    qH2.setAttribute("class", "questions");
    qH2.innerHTML = triviaQObj.question;
    qDiv.appendChild(qH2);
    qDiv.appendChild(qImg);

    for (var j = 0; j < 4; j++) {
        optH2[j] = document.createElement("h2");
        optH2[j].setAttribute("class", "answers");
        optH2[j].setAttribute("onclick", "optionsClicked(this)");
        optH2[j].setAttribute("onmouseover", "mOver(this)");
        optH2[j].setAttribute("onmouseout", "mOut(this)");
        optH2[j].innerHTML = triviaQObj.option[j];
        qDiv.appendChild(optH2[j]);
    }
    question_number += 1;
}

//Called from optionsClicked
function loadAnswerDiv() {
    $("#showAnswer").empty();
    aDiv.appendChild(aCommentH2);
    aDiv.appendChild(aCorrectAnswerH2);
    aDiv.appendChild(aImg);
}

//Called from get Next Quiz, if all questions are answered
function loadResultDiv() {
    $("#resultDiv").empty();
    rDiv.appendChild(rH2);
    rDiv.appendChild(rcorrectAnsP);
    rDiv.appendChild(rincorrectAnsP);
    rDiv.appendChild(runAnsweredP);
    rDiv.appendChild(rStartOverDiv);
}

//  Game Timer Functions  //
//  Manage Game Timer //
function manageGameTimer() {
    var gameIntervalId = setInterval(decrementGameTimer, 1000);
    //Manage Game timer decrement
    function decrementGameTimer() {
        if (timeOut != 0) {
            timeOut--;
            console.log("timeout :" + timeOut);

            $(".h2heading").text(timeOutTextStart + timeOut + timeOutTextEnd);
        }
        else {
            clearInterval(gameIntervalId);

            if (answerClicked === "false") {

                showTimeOutAnswer();


                timeOut = 1;
            }
        }
    }
};

////  Show Answers Timer Functions  ////
//Manage Show Answer Timer//
function showAnswerTimer() {
    var ShowAnswerIntervalId = setInterval(decrementShowAnswerd, 1000);
    //Manage Show Answer Timer decrement
    function decrementShowAnswerd() {
        if (showAnswerTimeOut != 0) {
            showAnswerTimeOut--;
            //  console.log("showAnswerTimeOut :" + showAnswerTimeOut);
        }
        else {
            clearInterval(ShowAnswerIntervalId);
            getNextQuiz();
        }
    }
};

// Called from decrementShowAnswerd .. call next quiz or go to results
function getNextQuiz() {
    document.getElementById("showAnswer").style.display = "none";
    answerClicked = "false";
    if (question_number < triviaQuestions.length) {
        loadNextQuiz();
        showAnswerTimeOut = 3;
        timeOut = 5;
        document.getElementById("gameDiv").style.display = "block";
        manageGameTimer();
    }
    else {
        rcorrctAnsSpan.innerHTML = correctAnswers;
        rincorrctAnsSpan.innerHTML = inCorrectAnswers;
        runAnsweredSpan.innerHTML = notAnswered;
        document.getElementById("showTimer").style.display = "none";
        document.getElementById("resultDiv").style.display = "block";
        answerClicked = "true";
        loadResultDiv();
    }
}

// Attached to Options
function mOver(obj) {
    obj.style.backgroundColor = "#1ec5e5";
}

//Attachd to options
function mOut(obj) {
    obj.style.backgroundColor = "rgb(20, 177, 240)";
}