


import time
read_map = False
def slow_print(text, delay=0.05):
    """Prints text slowly for a dramatic effect."""
    for char in text:
        print(char, end='', flush=True)
        time.sleep(delay)
    print()

from colorama import Fore
slow_print(Fore.YELLOW + "importing...")
import config
import random
slow_print("done")

if config.terminal_black == False:
    print(Fore.BLACK)
else:
    print(Fore.WHITE)
def die():
    print("\n you died, the end of your journey \n")
    quit()

class enemy:
    def __init__(self, name, behavior, type):
        self.name = name
        self.behavior = behavior
        self.type = type
        self.ehealth = random.randint(30, 50)
        match config.mode:
            case "baby":
                self.ehealth += random.randint(30, 50)
            case "easy":
                self.ehealth += random.randint(10, 30)
            case "hard":
                self.ehealth += random.randint(20, 40)
            case "dragon":
                self.ehealth += random.randint(80, 100)
            case _:
                print(f"warning, i dont recognize this maddness ({config.mode}), so i am assuming its normal mode.")
                slow_print("terminate the program...?", 0.1)
                ans = input("").lower()
                if ans == "yes":
                    raise SystemExit("program terminated due to errors in config.py: mode")
                elif ans == "no":
                    pass
                else:
                    print("huh?")
        
    def active(self):
        pass
            
def statcheck():
    if thirst < 1 or food < 1 or health < 1:
        die()
    slow_print(f"your health: {health}")
    slow_print(f"your water level: {thirst}")
    slow_print(f"your hunger level: {food}")

print("your name is omar, you are in the village, you want to meet your dad. What do you do? there is this trader selling caravans \n 1. buy a caravan \n 2. dont buy \n 3. punch the trader")
def choice():
    global ans
    ans = input("your choice ")
choice()

if ans == "1":
    print("you buy a caravan, what do you do? \n 1. ride around the village \n 2. go out to the desert")
    choice()
    if ans == "1":
        print("you squished someone and you are in jail now")
    if ans == "2":
        print("you went out into the desert, but your caravan broke, now you are stranded with only a small water pouch, a dagger, and an old map with some sus markings \n 1. go left \n 2. go right \n 3. forward \n 4. read the map")
        health = 100
        food = 100
        thirst = 100
        choice()
        if ans == "4":
            print("the map is of an unfamiliar place, and it has weird symbols, but it has smth that catches your eyes. The oasis of light")
            read_map = True
        if ans == "2":
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
        print("you see a mountain ahead \n 1. go for it \n 2. go backward")
        choice()
        if ans == "1":
            slow_print("you have remembered legends of the mountains... those legends say that those mountains house dangerous spirits but also have the remains of an ancient city with a trove of gold")
            
            

#choice 2
if ans == "2":
    print("you go home, and do boring things, the end")

#choice 3
if ans == "3":
    print("TURNS OUT THE TRADER HAD A SWORD!!! \n 1. run \n 2. fight")
    choice()
    if ans == "1":
        print("you ran, but you are wanted")
    if ans == "2":
        print("you fight, and lost")
        die()
