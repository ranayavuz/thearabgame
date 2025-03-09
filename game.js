var read_map = false;
var health = 100;
var food = 100;
var thirst = 100;

function out(text, callback) {
    alert(text);  // Show text as an alert
    console.log(text);  // Debugging in console
    if (callback) callback();  // Move to the next function
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
                                                        q1: ["What should you say to calm him down?", "thank you"],
                                                        q2: ["How many legs does a camel have?", "4"],
                                                        q3: ["How many humps does a dromedary camel have?", "1"],
                                                        q4: ["What do you do when hungry?", "i eat"],
                                                        q5: ["What is the sound a sheep makes?", "ba"]
                                                    };

                                                    var score = 0;
                                                    function askQuizQuestion(questions, index) {
                                                        if (index >= questions.length) {
                                                            out(`You got ${score} out of ${questions.length} correct.`, function () {
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

                                                        const question = questions[index][1][0];  
                                                       
