import os
import sys
import importlib
sys.dont_write_bytecode = True
# this is the modapi, it handles all the mods and loads them
# supported formats: .py and .json
import debugapi
import json
class inject:
    def __init__(self):
        self.playerhealth = 0
        self.playerhunger = 0
        self.playerthirst = 0
modslist = {}
sys.dont_write_bytecode = True

debugapi.log(os.listdir(os.path.dirname(__file__) + "/mods/"))
debugapi.log("initialized modapi requirements")

inc = 1
for i in os.listdir(os.path.dirname(__file__) + "/mods/"):
    if i.endswith(".py") and i != "modapi.py":
        # Dynamically import the module and store it in modslist
        module = importlib.import_module(f"mods.{i[:-3]}")
        modslist["mod" + str(inc)] = module
    elif i.endswith(".json") and i != "modapi.py":
        # Load JSON data and store it in modslist
        with open(os.path.join(os.path.dirname(__file__), "mods", i), "r") as f:
            modslist["modJSON" + str(inc)] = json.load(f)
    else:
        debugapi.log(f"skipping {i} because it is not a .py file or is using one of the illegal names: modapi.py")
    inc += 1

debugapi.log(modslist)
debugapi.log("imported mods")

# Access the playerhealth attribute from the imported module
compileready = inject()
try:
    compileready.playerhealth = modslist["mod1"].playerhealth
    debugapi.log(compileready.playerhealth)
except AttributeError:
    debugapi.log("mod1 does not have an attribute. Okay!")
debugapi.log(f"compiling mods to {os.path.dirname(__file__) + "/COMPILED_MODS.py"}")
f = open(os.path.dirname(__file__) + "/COMPILED_MODS.py", "a+")
f.write(f"\nplayerhealth = {compileready.playerhealth}")
f.write(f"\nplayerhunger = {compileready.playerhunger}")
f.write(f"\nplayerthirst = {compileready.playerthirst}")
f.close()
debugapi.log("compiled mods")
