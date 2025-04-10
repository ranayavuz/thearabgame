try {
const config = {
    terminal_black: true,
    mode: "normal",
    debug: true,
    hasmods: false
};

// Debug API
const debugapi = {
    log: (thing) => {
        if (config.debug) {
            console.log(`[DEBUG]: ${thing}`);
        }
    },
    err: (thing) => {
        if (config.debug) {
            console.error(`[DEBUG]: NOT_FATAL_ERROR ${thing}`);
        }
    }
};

// Game variables
let jsonobj = {
    inventory: [],
    location: "",
    health: 100,
    food: 100,
    thirst: 100
};
let file = "";
let health = 100;
let food = 100;
let thirst = 100;
let saveon = true;
let savesfolder = [];

// Helper functions
const slowPrint = (text, delay = 50) => {
    [...text].forEach((char, index) => {
        setTimeout(() => {
            document.body.innerHTML += char; // Append text to the webpage
        }, index * delay);
    });
};

const ensureFileInitialized = () => {
    if (!file) {
        file = "default_save";
        debugapi.log(`Ensuring file is initialized: ${file}`);
        if (!localStorage.getItem(file)) {
            localStorage.setItem(file, JSON.stringify(jsonobj));
            debugapi.log(`Default save file created: ${file}`);
        }
    }
};

const save = (thing, tosave) => {
    ensureFileInitialized();
    if (saveon) {
        jsonobj[thing] = tosave;
        jsonobj.health = health;
        jsonobj.food = food;
        jsonobj.thirst = thirst;
        debugapi.log(`Saving ${thing} to ${file}`);
        localStorage.setItem(file, JSON.stringify(jsonobj));
    }
};

const die = () => {
    slowPrint("\n you died, the end of your journey \n");
    if (config.mode === "dragon") {
        slowPrint("since you are playing on dragon mode, A SAVE WILL BE DELETED MUHAHAHHAAHAHHA");
        alert("choose a save to delete");
        savesfolder.forEach((save, index) => console.log(`${index + 1}. ${save}`));
        const ans = prompt("Your choice:");
        try {
            const saveToDelete = savesfolder[parseInt(ans) - 1];
            localStorage.removeItem(saveToDelete);
            debugapi.log(`Deleted save: ${saveToDelete}`);
            alert("Save deleted successfully.");
        } catch (e) {
            alert("Invalid selection or error deleting save.");
            debugapi.err(`Error deleting save: ${e}`);
        }
    } else {
        alert("Game Over!");
    }
};

// Game logic
const start = () => {
    const ans = prompt("your name is omar, you are in the village, you want to meet your dad. What do you do? there is this trader selling caravans \n 1. buy a caravan \n 2. dont buy \n 3. punch the trader");
    if (ans === "1") {
        caravanthing();
    } else if (ans === "2") {
        alert("you go home, and do boring things, the end");
    } else if (ans === "3") {
        const ans2 = prompt("TURNS OUT THE TRADER HAD A SWORD!!! \n 1. run \n 2. fight");
        if (ans2 === "1") {
            alert("you ran, but you are wanted");
        } else if (ans2 === "2") {
            alert("you fight, and lost");
            die();
        }
    } else {
        alert("Invalid choice.");
    }
};

const caravanthing = () => {
    ensureFileInitialized();
    debugapi.log(`Current save file: ${file}`);
    save("location", "caravanthing");
    const ans = prompt("you buy a caravan, what do you do? \n 1. ride around the village \n 2. go out to the desert");
    if (ans === "1") {
        alert("you squished someone and you are in jail now");
    } else if (ans === "2") {
        desert();
    } else {
        alert("Invalid choice.");
    }
};

const desert = () => {
    ensureFileInitialized();
    debugapi.log(`Current save file: ${file}`);
    save("location", "desert");
    save("inventory", ["small water pouch", "dagger", "foreign map"]);
    const ans = prompt("you went out into the desert, but your caravan broke, now you are stranded with only a small water pouch, a dagger, and an old map with some sus markings \n 1. go left \n 2. go right \n 3. forward \n 4. read the map");
    if (ans === "4") {
        alert("the map is of an unfamiliar place, and it has weird symbols, but it has smth that catches your eyes. The oasis of light");
    } else if (ans === "2") {
        worm();
    } else {
        alert("Invalid choice.");
    }
};

const worm = () => {
    ensureFileInitialized();
    debugapi.log(`Current save file: ${file}`);
    save("location", "worm");
    const ans = prompt("there is a worm in the sand \n 1. eat it \n 2. keep it as a pet \n 3. run");
    if (ans === "1") {
        alert("you ate it and feel a tummy ache");
        food -= 20;
        statcheck();
        alert("THERE IS A MAN WITH A ROCK AND TURNS OUT IT WAS HIS WORM!!! you get beaten up");
        quiz();
    } else {
        alert("Invalid choice.");
    }
};

const quiz = () => {
    const questions = {
        "What does شكرًا mean": "thank you",
        "What is ٢ + ٢?": "4",
        "what number is ٤": "4",
        "what does أكُل mean": "i eat",
        "what sound is ب": "ba"
    };
    let score = 0;
    const keys = Object.keys(questions);

    keys.forEach((question) => {
        const answer = prompt(`${question}`);
        if (answer.trim().toLowerCase() === questions[question].toLowerCase()) {
            alert("Correct!");
            score++;
        } else {
            alert(`Wrong! The correct answer is: ${questions[question]}`);
        }
    });

    alert(`\nYou got ${score} out of ${keys.length} questions right`);
    if (score <= 3) {
        die();
    } else {
        health -= 60;
        survivemount();
    }
};

const statcheck = () => {
    if (thirst < 1 || food < 1 || health < 1) {
        die();
    }
    slowPrint(`your health: ${health}`);
    slowPrint(`your water level: ${thirst}`);
    slowPrint(`your hunger level: ${food}`);
};

// Initialize game
try {
    savesfolder = Object.keys(localStorage);
} catch (e) {
    debugapi.err(`Error accessing localStorage: ${e}`);
}

const ans = prompt("choose a save. Type NEW to make a new one. Type DELETE to delete a save");
if (ans.trim().toUpperCase() === "DELETE") {
    const saveToDelete = prompt("choose a save to delete");
    try {
        localStorage.removeItem(saveToDelete);
        debugapi.log(`Deleted save: ${saveToDelete}`);
    } catch (e) {
        alert("Invalid selection or error deleting save.");
        debugapi.err(`Error deleting save: ${e}`);
        saveon = false;
    }
} else if (ans.trim().toUpperCase() === "NEW") {
    const name = prompt("Name?");
    file = name;
    localStorage.setItem(file, JSON.stringify(jsonobj));
    debugapi.log(`New save created: ${file}`);
    start();
} else {
    try {
        file = ans;
        const fileContent = JSON.parse(localStorage.getItem(file));
        health = fileContent.health;
        food = fileContent.food;
        thirst = fileContent.thirst;
        debugapi.log(`Loaded save: ${file}`);
        start();
    } catch (e) {
        debugapi.err(`Error loading save: ${e}`);
        saveon = false;
        ensureFileInitialized();
        start();
    }
}


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

