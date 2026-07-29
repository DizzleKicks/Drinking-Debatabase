let levels = [];
let currentLevel = 0;
let currentQuestion = "";

fetch("Drink Debatabase.txt")
.then(response => response.text())
.then(text => {

    parseFile(text);

    showQuestion();

});

function parseFile(text){

    const lines = text.split(/\r?\n/);

    let current = null;

    lines.forEach(line=>{

        line = line.trim();

        if(line==="") return;

        if(line.startsWith("===")){

            current = {

                title:line.replace(/=/g,"").trim(),

                questions:[]

            };

            levels.push(current);

        }

        else{

            current.questions.push(line);

        }

    });

}

function showQuestion(){

    const level = levels[currentLevel];

    document.getElementById("levelTitle").innerText = level.title;

    let question;

    do{

        question = level.questions[Math.floor(Math.random()*level.questions.length)];

    }

    while(level.questions.length>1 && question===currentQuestion);

    currentQuestion = question;

    const match = question.match(/^(.*?)\s*\(Category:\s*(.*?),\s*(.*?)\)$/);

    if(match){

        document.getElementById("question").innerText = match[1];

        document.getElementById("category").innerText = "Category: " + match[2];

        document.getElementById("type").innerText = "Type: " + match[3];

    }

    else{

        document.getElementById("question").innerText = question;

        document.getElementById("category").innerText = "";

        document.getElementById("type").innerText = "";

    }

}

function newQuestion(){

    showQuestion();

}

function levelUp(){

    if(currentLevel < levels.length-1){

        currentLevel++;

        currentQuestion="";

        showQuestion();

    }

}

function levelDown(){

    if(currentLevel > 0){

        currentLevel--;

        currentQuestion="";

        showQuestion();

    }

}
