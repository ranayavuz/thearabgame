import sys

sys.dont_write_bytecode = True

import debugapi

debugapi.log("starting game.py")
debugapi.log("VERSION: TEST-2 (0.2 or CONVIENIENCE_UPDATE). Mods might not work in later versions!")
debugapi.log("Run_type: SRC")
jsonobj = {
    "inventory":[],
    "location":"",
}
file = ""
health = 100
food = 100
thirst = 100
def load():
    pass
def choice():
    global ans
    ans = input("your choice ")

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

import json
import os
import config

import random
slow_print("done")
debugapi.log("imported time colorama.Fore sys json os config debugapi random")
if config.hasmods == True:
    debugapi.log("loading mods...")
    import modapi
    debugapi.log("loaded mods")
    import COMPILED_MODS
    try:
        
        health = COMPILED_MODS.playerhealth
        hunger = COMPILED_MODS.playerhunger
        thirst = COMPILED_MODS.playerthirst
    except:
        debugapi.log("some attributes are missing!")

if config.terminal_black == False:
    print(Fore.BLACK)
else:
    print(Fore.WHITE)
def die():
    slow_print("\n you died, the end of your journey \n")
    if config.mode == "dragon":
        slow_print("since you are playing on dragon mode, A SAVE WILL BE DELETED MUHAHAHHAAHAHHA")
        print("choose a save to delete")
        inc = 1
        for i in savesfolder:
            print(f"{inc}. {i}")
            inc += 1
        choice()
        try:
            os.remove(config.game_directory + "/saves/" + savesfolder[int(ans) - 1])
            debugapi.log(f"Deleted save: {savesfolder[int(ans) - 1]}")
            print("Save deleted successfully.")
        except (ValueError, IndexError, FileNotFoundError) as e:
            print("Invalid selection or error deleting save.")
            debugapi.err(f"Error deleting save: {e}")
    quit()
try:
    debugapi.log(f"Loading save folder {config.game_directory+"/saves"}")
    savesfolder = os.listdir(config.game_directory+"/saves/")
except Exception as exception:
    debugapi.err(f"Directory not found! {config.game_directory+'/saves'} \n {exception}")

def ensure_file_initialized():
    """Ensure the `file` variable is initialized with a valid path."""
    global file
    if not file:
        file = config.game_directory + "/saves/default_save.json"
        debugapi.log(f"Ensuring file is initialized: {file}")
        if not os.path.exists(file):  # Create the default save file if it doesn't exist
            with open(file, "w") as f:
                f.write(json.dumps(jsonobj))
                debugapi.log(f"Default save file created at {file}")

def save(thing, tosave):
    global file
    ensure_file_initialized()  # Ensure `file` is initialized before saving
    if saveon:
        jsonobj[thing] = tosave
        debugapi.log(f"Saving {thing} to {file}")
        with open(file, "w") as f:
            f.write(json.dumps(jsonobj))

class enemy:
    def __init__(self, name, behavior, typee):
        self.name = name
        self.behavior = behavior
        self.type = typee
        self.ehealth = random.randint(30, 50)
        match config.mode.lower().strip():
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
                ans = input("").lower().strip()
                if ans == "yes":
                    raise SystemExit("program terminated due to errors in config.py: mode")
                elif ans == "no":
                    pass
                else:
                    print("huh?")
        
    def active(self):
        pass
            
def statcheck():
    if thirst < 1 or food < 1 or health < 1: # type: ignore
        die()
    slow_print(f"your health: {health}") # type: ignore
    slow_print(f"your water level: {thirst}") # type: ignore
    slow_print(f"your hunger level: {food}") # type: ignore
def start():
    print("your name is omar, you are in the village, you want to meet your dad. What do you do? there is this trader selling caravans \n 1. buy a caravan \n 2. dont buy \n 3. punch the trader")
    choice()
    if ans == "1":
        caravanthing()

def caravanthing():
    global file
    ensure_file_initialized()  # Ensure `file` is initialized before saving
    debugapi.log(f"Current save file: {file}")
    save("location", "caravanthing")
    print("you buy a caravan, what do you do? \n 1. ride around the village \n 2. go out to the desert")
    choice()
    if ans == "1":
        print("you squished someone and you are in jail now")
    if ans == "2":
        desert()
def desert():
    print("you went out into the desert, but your caravan broke, now you are stranded with only a small water pouch, a dagger, and an old map with some sus markings \n 1. go left \n 2. go right \n 3. forward \n 4. read the map")

    choice()
    if ans == "4":
        print("the map is of an unfamiliar place, and it has weird symbols, but it has smth that catches your eyes. The oasis of light")
        read_map = True
    if ans == "2":
        worm()

#after worm
def survivemount():
    global health
    print("\nyou survived, with bad injuries")
    health -= 60
    statcheck()
    print("you see a mountain ahead \n 1. go for it \n 2. go backward")
    choice()
    if ans == "1":
        slow_print("you have remembered legends of the mountains... those legends say that those mountains house dangerous spirits but also have the remains of an ancient city with a trove of gold")
def worm():
    global food
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
            survivemount()

            

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
def load():
    try:
        global filecontent, file  # Ensure file is updated globally
        debugapi.log(f"Attempting to load save file: {savesfolder[int(ans) - 1]}")
        name = savesfolder[int(ans) - 1]
        file = config.game_directory + "/saves/" + name  # Initialize the file variable globally
        with open(file, "r") as f:
            load = f.read()
        
        filecontent = json.loads(load)
        debugapi.log(f"Loaded file content: {filecontent}")
        if filecontent["location"] == "caravanthing":
            caravanthing()
        else:
            print("you are at an unknown location")
        
    except (ValueError, IndexError, FileNotFoundError) as e:  # Handle invalid input or index
        debugapi.err(f"Error loading save file: {e}")
        saveon = False
        ensure_file_initialized()  # Fallback to default save file

# Ensure the `file` variable is retained globally after loading
def retain_file_after_load():
    global file
    if not file:
        debugapi.log("File variable is not set after load. Initializing to default save.")
        ensure_file_initialized()

print("choose a save. Type NEW to make a new one. Type DELETE to delete a save")
inc = 1
saveon = True
for i in savesfolder:
    print(f"{inc}. {i}")
    inc += 1
choice()
name = ""
if ans.strip() == "DELETE":
    print("choose a save to delete")
    inc = 1
    for i in savesfolder:
        print(f"{inc}. {i}")
        inc += 1
    choice()
    try:
        os.remove(config.game_directory+"/saves/" + savesfolder[int(ans) - 1])
        debugapi.log(f"deleted {savesfolder[int(ans) - 1]}")
    except (ValueError) as e:
        print("NOT VALID ANSWER!")
        debugapi.err(f"{ans} was not a valid answer, playing without save. \n {e}")
        saveon = False
elif ans.strip() == "NEW":
    print("name?")
    choice()
    name = ans + ".json"
    file = config.game_directory + "/saves/" + name  # Initialize the file variable
    f = open(file, "w")
    debugapi.log(json.dumps(jsonobj))
    f.write(json.dumps(jsonobj))
    f.close()
else:
    load()
    retain_file_after_load()  # Ensure `file` is retained globally after loading

ensure_file_initialized()  # Ensure `file` is initialized as a final fallback

debugapi.log(f"Starting game with save file: {file}")
start()
