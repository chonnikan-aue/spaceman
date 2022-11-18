# spaceman

> ### this is the alternative Hangman game

**You can enjoy here:** https://chonnikan-aue-spaceman.netlify.app/



## Technologies used

- **For designing wire frames:** [wireframe.cc](https://wireframe.cc/)

- **For game web:** HTML, CSS, JavaScript, Bootstrap 5.2

- **For API:** [Random Word API](https://random-word-api.herokuapp.com/home)

- **For connect API:** Axios

- **For deployment:** Netlify  



## Installation instructions

I recommend lastest version of Chrome browser in desktop to play the game



## Planning

> ### User Stories

- As a player, guess the word before spaceship completely drawn.

- Have 8 spaceship part = 8 wrong guesses (body, head, window, first wing, second wing, third wing, nozzle, fire)

- Have alphabet button as a keyboard in UI to select guessed alphabet.

- Alphabet button cannot click when already guessed

> ### MVP Goals

- Timer-based scoring, have initial time (5 minutes)

- In singleplayer mode, game web will random word from Random Word API

- Have scoreboard for singleplayer mode, player can type their name and save score to local storage (this will not save to other browsers)

- Score will calculate from:

  - Time Left (in centisecond)

  - length of word that correctly guess (+5000 for each alphabet)

  - when wrong guessed (-1000 for each alphabet)

  - Time's up (-1000)
  
> ### Stretch Goals

**First Priority**

- Have singleplayer mode and multiplayer mode

- In multiplayer mode, each player have different word (random from API) and separated game window but in the same timer

- Have scoreboard for multiplayer mode 

**Second Priority**

- Have background sound and SFX sound effects

- Can mute background sound and SFX sound effects

**Third Priority**

- Can change theme to other images instead of spaceship, such as snowman



## Design Process

> ### Wire Frames

**1. First page**

![1](https://media.git.generalassemb.ly/user/46043/files/c477c732-0971-4a9c-b37b-f39e979e93fb)

**2. Modal:** when player click Play button to start game

![modal-for-2-ask-name](https://media.git.generalassemb.ly/user/46043/files/ee75b1bb-8344-484a-9329-a231688deae5)

**3. Game page:** when player click play button from the first page

![2](https://media.git.generalassemb.ly/user/46043/files/c9e27a2e-54dd-45c8-848d-c2d47c40db89)

**4. Modal:** when player click back icon (⬅) from the game page

![modal-for-2-back](https://media.git.generalassemb.ly/user/46043/files/4a0cdab6-b04c-48dc-9a79-15e5df92b209)

**5. Scoreboard page:** when player click trophy icon from the first page

![scoreboard](https://media.git.generalassemb.ly/user/46043/files/d3bbe087-4de4-4afa-ab02-9a8c0f662ec9)



## Unsolved Problems



## Room for Improvement

[Second Priority](**second-priority**) and Third Priority in the Planning section
