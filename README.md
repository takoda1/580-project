# COMP 580 Project: ARCADIA

> Three fun and accessible arcade games designed to be playable by people with visual impairments.
> Link to Github Pages: [https://takoda1.github.io/580-project/](https://takoda1.github.io/580-project/)

---
## Table of Contents

- [Overview](#overview)
- [Intended Audience](#intended-audience)
- [Frameworks and Libraries](#frameworks-and-libraries)
- [Building and Deploying](#building-and-deploying)
- [Problems Encountered and Future Plans](#problems-encountered-and-future-plans)
- [Setup](#setup)
- [Clone](#clone)
- [Team](#team)
- [Resources](#resources)

---
## Overview

The game is available online at [http://comp580.herokuapp.com/](http://comp580.herokuapp.com/) . This is the easiest way to access the game, especially for those without a background in computer science. 

The game runs in a browser and is designed to mimic the capability of online arcade to play various games in one place. Arcadia contains three games, `The Forbidden Forest`, `Clap It`, and `King of the Maze`. Our idea for this game stemmed from the need for more inclusive technology for people with disabilities. As we learned during various lectures this semester, many of the current games for people with disabilities are extremely outdated, too simple, do not contain proper accessibility features, or simply do not exist at all. 
We wanted our game to be accessible from anywhere. Therefore, we are hosting it on Heroku. The way the users play the game is by providing intuitive sound-based cues and instructions.


`The Forbidden Forest`

> The Forbidden Forest is a sound-based math game. Players will be stuck in an enchanted, forbidden forest with a monster chasing after them. They will have to 'dodge' obstacles in the forest by correctly answering basic math questions (addition, subtraction, multiplication, and division). The answers to the questions will be given in multiple choice style, with each answer corresponding to an arrow key, helping them dodge the monster. Each time they answer a question incorrectly, the monster will get closer, indicated by a louder monster sound in the background. With every correct answer, the player will get closer to successfully exiting the forest and winning the game. Sound effect credits from [Zapsplat](https://www.zapsplat.com/).

`Clap It`
> Clap It is a sound-based reaction time game. Players will be given commands as a beat plays and must react to those commands in time. The beats per minute of the beat will steadily increase as the player successfully fulfills commands, until the player messes up a command. This is an arcade style game where there is no end, only high scores. Sound effect credits from [Zapsplat](https://www.zapsplat.com/). (based off bop-it)

`King of the Maze`
> King of the maze is a sound based maze game. Players will be repelled by monsters and obstacles sound cues as they navigate through the maze.


---
## Intended Audience

The primary audience is for people who are blind or visually impared. It is targeted toward children and young adolescents, but can be enjoyed by people of all ages. `Clap-It` and `King of the Maze` are our most 'age-friendly' games, as they can both be played by young children or adults. `The Forbidden Forest` requires knowledge of basic math operations including addition subtraction, multiplication, and division. The games are also playable by people who can see.

---
## Frameworks and Libraries

Frameworks: A `nodejs` app using express as the server/routing framework. Using typical javascript to provide interactivity. We are also using `heroku` to build/deploy our app to `comp580.herokuapp.com`. The most useful libraries are `SpeechSynthesisUtterance`, `PATH`, `dotenv`, and other utility `nodejs` modules.  `SpeechSynthesisUtterance` allows us to acheive the text-to-speech used in our project.

---
## Building and Deploying

By committing to the master branch at [https://github.com/takoda1/580-project](https://github.com/takoda1/580-project), the project automatically builds and deploys using heroku.

---
## Problems Encountered and Future Plans

When trying to make a multiplayer game, we ran into difficulties implementing the functionality and deciding how to incorporate sound, so we had to modify our projects slightly. Additionally, the transition from static to express was a little rocky, but nothing we could not solve. The project is setup such that other arcade games can be added modularly. A future goal is to continue adding games.

---
## Setup

For more advanced users who may want to play the game locally, the entire `580-project` folder may be downloaded or cloned. Once `Git Bash` has been properly installed on your computer, you may open a `Git Bash` window in the `580-project` folder and type `node server.js`. The game can then be played by going to a browser of your choice and going to the domain `localhost:8080`. 

> Command in Git Bash to play the game locally
```shell
$ node server.js
```
---
### Clone

- Clone this repo to your local machine using `https://github.com/takoda1/580-project.git`

---

## Team

| <a href="https://github.com/carly20" target="_blank">**Carly Richardson**</a> | <a href="http://github.com/takoda1" target="_blank">**Takoda Ren**</a> | <a href="http://github.com/quincygodwin" target="_blank">**Quincy Godwin**</a> |
| :---: |:---:| :---:|
| [![Carly](https://avatars1.githubusercontent.com/u/52942423?s=400&u=03a64281c7277aa27688eb93bfc7315690e23038&v=4?s=200)](http://github.com/carly20)  | [![Takoda](https://avatars2.githubusercontent.com/u/31773273?s=400&v=4?s=200)](http://github.com/takoda1) | [![Quincy](https://avatars2.githubusercontent.com/u/27874702?s=460&u=cbef7006ff74ff80443b1bb7778f519a6d65eb61&v=4?s=200)](http://github.com/quincygodwin)  |
| <a href="https://github.com/carly20" target="_blank">`github.com/carly20`</a> | <a href="https://github.com/takoda1" target="_blank">`github.com/takoda1`</a> | <a href="https://github.com/quincygodwin" target="_blank">`https://github.com/quincygodwin`</a> |

---

## Resources

- Formatting help and inspiration from <a href="https://gist.github.com/fvcproductions/1bfc2d4aecb01a834b46" target="_blank">FVCproductions</a>.
