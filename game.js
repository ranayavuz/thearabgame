var read_map = false;
var health = 100;
var food = 100;
var thirst = 100;

function out(text, log) {
    document.write(text);  // Shows a pop-up instead of document.write()
    if log === undefined {
      log = "nolog";
    }
    console.log(log);  // Logs to console for debugging
}

function die() {
    out("You died, the end of your journey.");
    window.location.href = "https://ranayavuz.github.io/thearabgame/index.html";
}

function statcheck() {
    if (thirst < 1 || food < 1 || health < 1) {
        die();
    } else {
        out(`Your health: ${health}\nYour water level: ${thirst}\nYour hunger level: ${food}`);
    }
}

// Start of the game
out("Your name is Omar, you are in the village, you want to meet your dad. What do you do? There is this trader selling caravans.\n1. Buy a caravan\n2. Don't buy\n3. Punch the trader");

function choice() {
    return prompt("Your choice:", "");
}

var ans = choice();

// Buying the Caravan
if (ans === "1") {
    out("You buy a caravan. What do you do next?\n1. Ride around the village\n2. Go out to the desert");
    ans = choice();

    if (ans === "1") {
        out("You squished someone and are now in jail.");
    } else if (ans === "2") {
        out("You went out into the desert, but your caravan broke down. Now you are stranded with only a small water pouch, a dagger, and an old map with some strange markings.\n1. Go left\n2. Go right\n3. Move forward\n4. Read the map");
        ans = choice();

        if (ans === "4") {
            out("The map is of an unfamiliar place, and it has weird symbols, but something catches your eye: 'The Oasis of Light'.");
            read_map = true;
        }

        if (ans === "2") {
            out("There is a worm in the sand.\n1. Eat it\n2. Keep it as a pet\n3. Run");
            ans = choice();

            if (ans === "1") {
                out("You ate it and feel a stomach ache.");
                food -= 20;
                statcheck();

                out("THERE IS A MAN WITH A ROCK—AND IT WAS HIS WORM!!! He attacks you!");

                // Quiz challenge
                const quiz = {
                    q1: ["What should you say to calm him down?", "thank you"],
                    q2: ["How many legs does a camel have?", "4"],
                    q3: ["How many humps does a dromedary camel have?", "1"],
                    q4: ["What do you do when hungry?", "i eat"],
                    q5: ["What is the sound a sheep makes?", "ba"]
                };

                var score = 0;
                for (const [question, correctAnswer] of Object.entries(quiz)) {
                    var answer = prompt(question, "").trim().toLowerCase();
                    if (answer === correctAnswer.toLowerCase()) {
                        out("Correct!");
                        score++;
                    } else {
                        out(`Wrong! The correct answer is: ${correctAnswer}`);
                    }
                }

                out(`You got ${score} out of ${Object.keys(quiz).length} questions right.`);

                if (score <= 3) {
                    die();
                } else {
                    out("You survived, but with bad injuries.");
                    health -= 60;
                    statcheck();
                }
            }
        }

        out("You see a mountain ahead.\n1. Go for it\n2. Go backward");
        ans = choice();

        if (ans === "1") {
            out("You remember legends of these mountains… They say dangerous spirits lurk there, but also an ancient city with a treasure trove of gold.");
        }
    }
}

// Choosing Not to Buy
if (ans === "2") {
    out("You go home and do boring things. The end.");
}

// Punching the Trader
if (ans === "3") {
    out("TURNS OUT THE TRADER HAD A SWORD!!!\n1. Run\n2. Fight");
    ans = choice();

    if (ans === "1") {
        out("You ran, but now you're wanted!");
    } else if (ans === "2") {
        out("You fight, and lose.");
        die();
    }
}
