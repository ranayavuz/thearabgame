var read_map

function out(text) {
  document.write(text);
}

var ans = "none"
function die() {
    out("you died, the end of your journey")
    window.location.href = "https://ranayavuz.github.io/thearabgame/index.html"
}

function statcheck() {
    if thirst < 1 or food < 1 or health < 1:
        die()
    out("your health: {health}")
    out("your water level: {thirst}")
    out("your hunger level: {food}")
}

out("your name is omar, you are in the village, you want to meet your dad. What do you do? there is this trader selling caravans 1. buy a caravan  2. dont buy 3. punch the trader")
function choice() {
    
    ans = prompt("your choice", "")
}
choice()

if ans == "1" {
    print("you buy a caravan, what do you do? \n 1. ride around the village \n 2. go out to the desert")
    choice()
    if ans == "1" {
        print("you squished someone and you are in jail now")
    }
    if ans == "2" {
        print("you went out into the desert, but your caravan broke, now you are stranded with only a small water pouch, a dagger, and an old map with some sus markings \n 1. go left \n 2. go right \n 3. forward \n 4. read the map")
        var health = 100
        var food = 100
        var thirst = 100
        choice()
        if ans == "4" {
            print("the map is of an unfamiliar place, and it has weird symbols, but it has smth that catches your eyes. The oasis of light")
            read_map = true
        }
        if ans == "2" {
            print("there is a worm in the sand \n 1. eat it \n 2. keep it as a pet \n 3. run")
            choice()
            if ans == "1":
                print("you ate it and feel a tummy ache")
                food -= 20
                statcheck()
                print("THERE IS A MAN WITH A ROCK AND TURNS OUT IT WAS HIS WORM!!! you get beaten up")
                # Dictionary containing questions and their correct answers
                quiz = {
                    "What does شكرًا mean": "thank you",
                    "What is ٢ + ٢?": "4",
                    "what number is ٤": "4",
                    "what does أكُل mean": "i eat",
                    "what sound is ب": "ba"
                }

                score = 0  # To keep track of the score

                # Loop through the dictionary
                for question, correct_answer in quiz.items():
                    answer = input(question + " ")  # Ask the user for input
                    if answer.strip().lower() == correct_answer.lower():  # Check if the answer is correct
                        print("Correct!")
                        score += 1
                    else:
                        print("Wrong! The correct answer is:", correct_answer)

                print(f"\nYou got {score} out of {len(quiz)} questions right")

                if score <= 3:
                    die()
                else:
                    print("\nyou survived, with bad injuries")
                    health -= 60
                    statcheck()
        }
        out("you see a mountain ahead \n 1. go for it \n 2. go backward")
        choice()
        if ans == "1" {
            out("you have remembered legends of the mountains... those legends say that those mountains house dangerous spirits but also have the remains of an ancient city with a trove of gold")
        }
    }
}
            
            

//choice 2
if ans == "2":
    print("you go home, and do boring things, the end")

//choice 3
if ans == "3":
    print("TURNS OUT THE TRADER HAD A SWORD!!! \n 1. run \n 2. fight")
    choice()
    if ans == "1":
        print("you ran, but you are wanted")
    if ans == "2":
        print("you fight, and lost")
        die()
