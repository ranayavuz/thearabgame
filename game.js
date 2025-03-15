try {
var read_map = false;
var health = 100;
var food = 100;
var thirst = 100;

function out(text, callback) {
    alert(text);  
    console.log(text);
    if (callback) callback();  
}

function die() {
    out("You died, the end of your journey.", function () {
        window.location.href = "https://ranayavuz.github.io/thearabgame/index.html";
    });
}

function statcheck() {
    if (thirst < 1 || food < 1 || health < 1) {
        die();
    } else {
        out(`Your health: ${health}\nYour water level: ${thirst}\nYour hunger level: ${food}`);
    }
}

function choice(options, callback) {
    var ans = prompt(options);
    if (callback) callback(ans);
}

// Start the game
out("Your name is Omar. You are in the village, wanting to meet your dad. What do you do? There is a trader selling caravans.\n1. Buy a caravan\n2. Don't buy\n3. Punch the trader", function () {
    choice("Your choice:", function (ans) {
        if (ans === "1") {
            out("You buy a caravan. What do you do next?\n1. Ride around the village\n2. Go out to the desert", function () {
                choice("Your choice:", function (ans) {
                    if (ans === "1") {
                        out("You squished someone and are now in jail.");
                    } else if (ans === "2") {
                        out("You went out into the desert, but your caravan broke down. You are stranded with only a small water pouch, a dagger, and an old map.\n1. Go left\n2. Go right\n3. Move forward\n4. Read the map", function () {
                            choice("Your choice:", function (ans) {
                                if (ans === "4") {
                                    out("The map is of an unfamiliar place, and it has weird symbols. One marking stands out: 'The Oasis of Light'.");
                                    read_map = true;
                                }

                                if (ans === "2") {
                                    out("There is a worm in the sand.\n1. Eat it\n2. Keep it as a pet\n3. Run", function () {
                                        choice("Your choice:", function (ans) {
                                            if (ans === "1") {
                                                out("You ate it and feel a stomach ache.");
                                                food -= 20;
                                                statcheck();

                                                out("A man appears, furious that you ate his pet worm!", function () {
                                                    const quiz = {
                                                        q1: ["what does شكرًا لك mean", "thank you"],
                                                        q2: ["what is ٢ + ٢", "4"],
                                                        q3: ["what is wahad in english", "1"],
                                                        q4: ["what does أنا آكل mean", "i eat"],
                                                        q5: ["What is ب pronounced", "ba"]
                                                    };

                                                    var score = 0;
                                                    const quizEntries = Object.entries(quiz);

                                                    function askQuizQuestion(index) {
                                                        if (index >= quizEntries.length) {
                                                            out(`You got ${score} out of ${quizEntries.length} correct.`, function () {
                                                                if (score <= 3) {
                                                                    die();
                                                                } else {
                                                                    out("You survived, but with bad injuries.");
                                                                    health -= 60;
                                                                    statcheck();
                                                                }
                                                            });
                                                            return;
                                                        }

                                                        const question = quizEntries[index][1][0];  
                                                        const correctAnswer = quizEntries[index][1][1];

                                                        choice(question, function (answer) {
                                                            if (answer.trim().toLowerCase() === correctAnswer.toLowerCase()) {
                                                                out("Correct!", function () {
                                                                    score++;
                                                                    askQuizQuestion(index + 1);
                                                                });
                                                            } else {
                                                                out(`Wrong! The correct answer was: ${correctAnswer}`, function () {
                                                                    askQuizQuestion(index + 1);
                                                                });
                                                            }
                                                        });
                                                    }

                                                    askQuizQuestion(0);
                                                });
                                            }
                                        });
                                    });
                                }

                                out("You see a mountain ahead.\n1. Go for it\n2. Go backward", function () {
                                    choice("Your choice:", function (ans) {
                                        if (ans === "1") {
                                            out("You remember legends about these mountains… They say dangerous spirits lurk there, but also an ancient city with a treasure trove of gold.");
                                        }
                                    });
                                });
                            });
                        });
                    }
                });
            });
        } else if (ans === "2") {
            out("You go home and do boring things. The end.");
        } else if (ans === "3") {
            out("TURNS OUT THE TRADER HAD A SWORD!!!\n1. Run\n2. Fight", function () {
                choice("Your choice:", function (ans) {
                    if (ans === "1") {
                        out("You ran, but now you're wanted!");
                    } else if (ans === "2") {
                        out("You fight, and lose.");
                        die();
                    }
                });
            });
        }
    });
});
}
catch(err) {
    var funnymessage = Math.floor(Math.random() * 4) + 1;
    switch (funnymessage) {
        case 1:
            console.log("a pat on the back?");
            break;
        case 2:
            console.log(":(");
            break;
        case 3:
            console.log("what happened, js? >:(");
            break;
        case 4:
            console.log("blame chatgpt!");
            break;  // Now case 4 works properly!
        default:
            console.log("uh, what is happening?");
    }
    console.log(err.message);
}

