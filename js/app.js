var questions = [
    'Which of the following animal is the fastest?',
    'Which is the largest living land carnivore?',
    'How far can a Snow Leopard jump?',
    'How many teeth does a Whale Shark have?',
    'What is the world\'s favorite animal?'
];

var choices = [
    ['Rhino', 'Elephant', 'Buffalo', 'Hippo'],
    ['Tiger', 'Lion', 'Polar Bear', 'Grizzly Bear'],
    ['25ft', '50ft', '75ft', '100ft'],
    ['300', '500', '700', '900'],
    ['Kakapo', 'Tiger', 'African Elephant', 'Grey Wolf']
];

function Question(question, choices, answer) {
    this.question = question;
    this.choices = choices;
    this.answer = answer;
};

var question1 = new Question(questions[0], choices[0], 2);
var question2 = new Question(questions[1], choices[1], 2);
var question3 = new Question(questions[2], choices[2], 1);
var question4 = new Question(questions[3], choices[3], 0);
var question5 = new Question(questions[4], choices[4], 0);

var questionArr = [question1, question2, question3, question4, question5];
var currentQuestion = 0;

$('document').ready(function () {
    var userAnswer;

    loadQuestion(question1);
    loadChoices(question1);

    $('.btn').click(function() {
        // clears feedback if any
        $('.feedback').text('');

        // get answer
        userAnswer = $('input[name=answer]:checked').parent().text();

        // if no answer prompt user
        if(userAnswer == '') {
            $('.feedback').text('Please select an answer');
            return;
        }

        // check answer
        if(checkAnswer(userAnswer, questionArr[currentQuestion])) {
            updateScore();
            updateCount();
        }
        else {
            updateCount();
        }

        // prevent button from being clicked after the last question
        // display button to reload page
        if(currentQuestion == questionArr.length - 1) {
            $('.btn').prop('disabled', true);
            console.log('disabled button');
            
            $('.feedback').append('<button class="btn btn-again">Try again</button>');
            $('.btn-again').click(function() {
                location.reload();
            });

            return;
        }

        // update progress bar
        updateProgressBar();

        // load next question set
        currentQuestion++;

        // change text of button to done if it is the last question
        if(currentQuestion == questionArr.length - 1) {
            $('.btn').text('Done');
        }

        loadQuestion(questionArr[currentQuestion]);
        loadChoices(questionArr[currentQuestion]);

    });

});

console.log("Source: http://www.arkive.org/worlds-favourite");

function loadQuestion(question) {
    $('.question h3').text(question.question);
};

function loadChoices(question) {
    var choice;
    var listItem = $('.choices ul');
    listItem.text('');

    for(var i = 0; i < question.choices.length; i++) {
        choice = question.choices[i];
        listItem.append('<li><label><input type="radio" name="answer">' + choice + '</li></label>');
    }
};

function checkAnswer(userAnswer, question) {
    if(userAnswer == question.choices[question.answer]) {
        return true;
    }
    else {
        return false;
    }
}

function updateScore() {
    var currentScore = parseInt($('.cScore').text());
    currentScore++;    

    if(currentQuestion == 5) {
        return;
    }

    $('.cScore').text(currentScore);
};

function updateCount() {
    var count = parseInt($('.count').text());
    count++;

    if(currentQuestion == 4) {
        return;
    }

    $('.count').text(count);
};

function updateProgressBar() {
    var count = parseInt($('.count').text());
    var total = 5;
    var percentComplete = (count / total * 100) + '%';

    if(count > total) {
        return;
    }
    else {
       $('.progress-bar').css('width', percentComplete); 
    }

    
};
