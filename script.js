

let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userscore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount;
let scoreCount = 0;
let count = 11;
let countdown;

//Questions and Options array 

const quizArray = [
    { 
        id: "0",
    
        question:"Where would you be if you were standing on the Spanish Steps?",
   
        options:["Rome, Italy", "Barcelona, Spain", "Lisbon, Portugal", 
    
        "Paris, France"],
    
        correct:"Rome, Italy",
    },
    { 
        id: "1",
   
        question:"Where is the ruined city of Babylon located?",
    
        options:["Sakaka, Saudi Arabia", "Doğankavak, Türkiye", 
        "Mesopotamia, Iraq", "Central Macedonia, Greece"],
        
        correct:"Mesopotamia, Iraq", 
    },

    { 
        id: "2",
    
        question:"Which planet has the most moons?",
    
        options:["Mars", "Neptune", "Venus", "Saturn"],
    
        correct:"Saturn", 
    },

    { 
        id: "3",
    
        question:"In what country is the Chernobyl nuclear plant located?",
    
        options:["Russia", "Estonia", "Ukraine", "Belarus",],
    
        correct:"Ukraine",
    },

    { 
        id: "4",
    
        question:"What is a group of pandas called?",
    
        options:["A Sluth", "A Sloth", "A Maul", "A Bamboo"],
    
        correct:"A Bamboo", 
    },

    { 
        id: "5",
    
        question:"What era was the Library of Alexandria destroyed?",
    
        options:["536 AD", "2020", "48 B.C", "1518"],
    
        correct:"48 B.C",
    }
];

//Restart Game
restart.addEventListener("click", () => {
    initial();
    displayContainer.classList.remove("hide");
    scoreContainer.classList.add("hide");
})

//Next Button
nextBtn.addEventListener("click", (displayNext = () => 
{
    //increment questionCount
    questionCount += 1;
    //if last question
    if(questionCount == quizArray.length) {
        //hide question container and display score
        displayContainer.classList.add("hide");
        scoreContainer.classList.remove("hide")
        //user score
        userscore.innerHTML = "Your score is " + scoreCount + " out of " + questionCount;
    }
    else{
        //display questionCount
        countOfQuestion.innerHTML = questionCount + 1 + " of " + quizArray.length + " Question";
        //display quiz
        quizDisplay(questionCount);
        count = 11;
        clearInterval(countdown);
        timerDisplay();
    }
}));

//Timer
const timerDisplay = () => {
    countdown = setInterval(() => {
      count--;
      timeLeft.innerHTML = `${count}s`;
      if(count == 0){
        clearInterval(countdown);
        displayNext();
      }
    }, 1000);
};

//Display quiz
const quizDisplay = (questionCount) => {
    let quizCards = document.querySelectorAll(".container-mid");
    //Hide other cards
    quizCards.forEach((card) => {
        card.classList.add("hide");
    });
    // display current question card
    quizCards[questionCount].classList.remove("hide");
};

//Quiz Creation
function quizCreator(){
    //Randomly sort questions
    quizArray.sort(()=>Math.random() - 0.5);
    //generate quiz
    for(let i of quizArray) {
        //randomly sort questions
        i.options.sort(() => Math.random() - 0.5);
        //quiz card creation
        let div = document.createElement("div");
        div.classList.add("container-mid", "hide");
        //question number
        countOfQuestion.innerHTML = 1 + " of " +
        quizArray.length + " Question";
        //question
        let question_DIV = document.createElement("p");
        question_DIV.classList.add("question");
        question_DIV.innerHTML = i.question;
        div.appendChild(question_DIV);
        //options
        div.innerHTML += `
        <button class="option-div" onclick="checker(this)
        ">${i.options[0]}</button>
         <button class="option-div" onclick="checker(this)
         ">${i.options[1]}</button>
          <button class="option-div" onclick="checker(this)
          ">${i.options[2]}</button>
           <button class="option-div" onclick="checker
           (this)">${i.options[3]}</button>
        `;
        quizContainer.appendChild(div);
    }
}

//Checker Function to check if option is correct or not
function checker(userOption){
    let userSolution = userOption.innerText;
    let question = 
    document.getElementsByClassName("container-mid")
    [questionCount];
    let options = question.querySelectorAll(".option-div");

    //if user clicked answer == correct option stored in object
    if (userSolution === quizArray[questionCount].
    correct) {
        userOption.classList.add("correct");
        scoreCount++;
    } else {
        userOption.classList.add("incorrect");
        //For marking the correct option
        options.forEach((element) => {
            if (element.innerText == quizArray[questionCount].correct) {
                    element.classList.add("correct");
                }
        })
    }

    //clear interval(stop timer)
    clearInterval(countdown);
    //disable all options
    options.forEach((element) => {
        element.disabled = true;
    })
}

//initial setup
function initial() {
    quizContainer.innerHTML = "";
    questionCount = 0;
    scoreCount = 0;
    count = 11;
    clearInterval(countdown);
    timerDisplay();
    quizCreator();
    quizDisplay(questionCount);
}

//when user click on start button
startButton.addEventListener("click", () => {
    startScreen.classList.add("hide");
    displayContainer.classList.remove("hide");
    initial();
});

//hide quiz and  start screen
window.onload = () => {
    startScreen.classList.remove("hide");
    displayContainer.classList.add("hide");
};