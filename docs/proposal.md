Chonnikan - Spaceman

## Project Choice (Tell us which project you're doing!)

- [ ] Flash Cards
- [ ] Trivia (Self-scoring)
- [x] Spaceman
- [ ] Tower of Hanoi
- [ ] Simon

## Project Description 
> A short description of your game.
An alternative game of Hangman, using spaceship as a hangman

## Wire Frames
> Copy and paste or drag and drop your images here.
first page
![1](https://media.git.generalassemb.ly/user/46043/files/c477c732-0971-4a9c-b37b-f39e979e93fb)

game page: when player click play button from first page
![2](https://media.git.generalassemb.ly/user/46043/files/c9e27a2e-54dd-45c8-848d-c2d47c40db89)

when player click back icon (<-) from game page
![modal-for-2-back](https://media.git.generalassemb.ly/user/46043/files/4a0cdab6-b04c-48dc-9a79-15e5df92b209)

when player finish game or time up
![modal-for-2-ask-name](https://media.git.generalassemb.ly/user/46043/files/ee75b1bb-8344-484a-9329-a231688deae5)

scoreboard page: when player click trophy icon from first page
![scoreboard](https://media.git.generalassemb.ly/user/46043/files/d3bbe087-4de4-4afa-ab02-9a8c0f662ec9)

## User Stories
> Add user stories following the _As a [type of user], I want [what the user wants], so that [what it helps accomplish]_ format.

- as a player, guess the word before spaceship completely drawn.
- have 8 spaceship part = 8 guesses (body, head, window, wing 1, wing 2, wing 3, nozzle, fire)
- alphabet button cannot click when already guessed

### MVP Goals

- have initial time (5 minutes)
- in single mode, program will random word from vocabulary (maybe manual vocab or oxford dic api)
- have scoreboard for single mode, player can type their name
- score will calculate from (time left(second) + length of word that guess correct)


### Stretch Goals

first prior
- have background sound
- have sound when click or spaceship draw
- can mute bg sound and animate sound

second prior
- have single mode and multiplayer mode
- in multiplayer mode, first player will think of a word and type in program then player two will guess the word by select an alphabet from button in UI
- in multiplayer mode will ask player's name before play the game
- have scoreboard for multiplayer mode, only show who wins (e.g, A wins B)

third prior
- player 1 can choose punishment if player 2 guess wrong alphabet 2 times in a row (deduct time * 2, draw spaceship * 2) 
- if player 2 guess right alphabet 2 times in a row, player 2 can disable one player 1's punishment option 

fourth prior
- can change to other img instead of spaceship, such as snowman

last prior
- improve graphic, such as better img