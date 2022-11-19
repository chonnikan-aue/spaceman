# spaceman

> ### This is the alternative Hangman game

**You can enjoy here:** https://chonnikan-aue-spaceman.netlify.app/



## Technologies used

- **For designing wire frames:** [wireframe.cc](https://wireframe.cc/)

- **For web development:** HTML, CSS, JavaScript, Bootstrap 5.2

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

- In singleplayer mode, the game will random word from [Random Word API](https://random-word-api.herokuapp.com/home)

- Have scoreboard for singleplayer mode, player can type their name and save score to local storage (this will not save to other browsers)

- Score will calculate from:

  - Time Left (in centisecond)

  - length of word that correctly guess (+5000 for each alphabet)

  - when wrong guessed (-1000 for each alphabet)

  - Time's up (-100)
  
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

**1. First page:**

![index](https://user-images.githubusercontent.com/116629287/202626756-1e9495be-cab7-463e-a319-b05dde81709c.JPG)

**2. Modal:** when player click `Play!` button from the first page

![modal-for-ask-name](https://user-images.githubusercontent.com/116629287/202626648-49bfe725-9e28-48d9-ab9f-c05b86ffc647.JPG)

**3. Game page:** when player submit their name

![game](https://user-images.githubusercontent.com/116629287/202626713-1d446dfe-1088-4e27-be1a-d716502281bc.JPG)

**4. Modal:** when player click back icon (⬅) from the game page

![modal-for-back](https://user-images.githubusercontent.com/116629287/202626617-cbab66e6-e342-4372-93da-9652a52a446a.JPG)

**5. Scoreboard page:** when player click trophy icon (🏆) from the first page

![scoreboard](https://user-images.githubusercontent.com/116629287/202626553-f9cd705a-09ba-41bc-b117-c242544ca450.JPG)



## Screenshot of the game

**1. First page:**

![image](https://user-images.githubusercontent.com/116629287/202628619-b59a2638-9cce-467a-8ad5-83cea54d7c70.png)

**2. Game page for singleplayer mode:** 

- when player click `Play Now!` button from the first page

![image](https://user-images.githubusercontent.com/116629287/202629019-1184d99a-e972-44d8-8a76-fe8792dc7277.png)

- when player submit their name

![image](https://user-images.githubusercontent.com/116629287/202629124-94d5934e-fcd1-401a-a0a5-55592da77487.png)

- when player finished the game

![image](https://user-images.githubusercontent.com/116629287/202630106-ce0354c7-f985-4206-85ba-59e7d03136c4.png)

**3. Game page for multiplayer mode:** 

- when player click `Multiplayer Mode ▼` button and select number of players from the first page

![image](https://user-images.githubusercontent.com/116629287/202632237-c9e88dbe-6a64-41c6-8e7a-1ed0c7f93345.png)

- when players submit their name

![image](https://user-images.githubusercontent.com/116629287/202632547-a719de2d-6826-4358-beb0-0392566bc2e7.png)

- when player finished the game

![image](https://user-images.githubusercontent.com/116629287/202633972-87a5eccb-c438-4704-9895-43ab51a87137.png)

**4. Scoreboard page:** when player click trophy icon (🏆) from the first page

![image](https://user-images.githubusercontent.com/116629287/202630810-87a83ec1-012f-4fcc-a028-9385640424ec.png)

> ### Want to know more? [Finds out here!](https://chonnikan-aue-spaceman.netlify.app/)



## Unsolved Problems

Modal (Bootstrap 5.2) does not responsive in mobile devices

![image](https://user-images.githubusercontent.com/116629287/202627248-e8ae5eb8-4574-44b4-9bb8-6cd609d26d6c.png)



## Room for Improvement

[Second Priority](#stretch-goals) and [Third Priority](#stretch-goals) in the `Stretch Goals` section
