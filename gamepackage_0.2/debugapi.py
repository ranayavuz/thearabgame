import sys
from colorama import Fore
sys.dont_write_bytecode = True
import config
def log(thing):
    if config.debug == True:
        print(Fore.YELLOW)
        print(f"[DEBUG]: {thing}")
        if config.terminal_black == True:
            print(Fore.WHITE)
        else:
            print(Fore.BLACK)
def err(thing):
    if config.debug == True:
        print(Fore.RED)
        print(f"[DEBUG]: NOT_FATAL_ERROR {thing}")
        if config.terminal_black == True:
            print(Fore.WHITE)
        else:
            print(Fore.BLACK)
