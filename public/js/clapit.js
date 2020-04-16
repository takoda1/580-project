window.addEventListener("load",app);

function app() {
	var action = function(id, text) {
			this.id = id || 0;
			this.text = text;
		},
		rand = function(min, max) {
			return Math.floor(Math.random() * ((max + 1) - min)) + min;
		},
		taskLine = document.querySelector(".task"),
		game = function() {
			this.points = 0;
			this.maxPoints = 100;

			this.actions = [
				new action(0,"Miss"),
				new action(1,"Up It!"),
				new action(2,"Left It!"),
				new action(3,"Right It!"),
        new action(4,"Down It!")
			];
			this.task = null;
			this.taskDelay = 1500;
			this.taskTime = 1500;
			this.gameOver = true;
			this.nextTask = function(){
				this.task = this.actions[rand(1,4)];
				document.querySelector(".task").innerHTML = this.task.text;
				window.speechSynthesis.speak(new SpeechSynthesisUtterance(this.task.text));
			};
			this.check = function(input, task) {
				let valid = false;
        console.log(input.id);
        console.log(task.id);
				if (input.id == task.id) {
					valid = true;
				}
				if (valid && this.points < this.maxPoints - 1) {
					++this.points;
					this.taskDelay -= 10;
					if (this.taskDelay < 0) {
						this.taskDelay = 1;
					}
					this.taskTime -= 10;
					if (this.taskTime < 0) {
						this.taskTime = 1;
					}
					taskLine.innerHTML = "";
					return true;
				} else {
					this.gameOver = true;
					
					if (valid) {
						++this.points;
						taskLine.innerHTML = "You win!";
					} else {
						taskLine.innerHTML = "OH NO!!!";
						window.speechSynthesis.speak(new SpeechSynthesisUtterance("game over"));
					}
					
					let bi = document.querySelector(".clap-it"),
						pts = String(this.points).split("").reverse(),
						symbols = ["I","V","X"],
						symbolStr = "";
					
					bi.disabled = true;
					
					if (this.points > 0) {
						for (let p in pts) {
							for (let d = 0; d < pts[p]; ++d) {
								symbolStr += symbols[p] + " ";
							}
						}
						symbolStr = symbolStr.split(" ").reverse();
						symbolStr.shift();
					}
					
					let symbolCt =
							this.points == 1 ||
							this.points == 10 ||
							this.points == 100 ?
							1 : symbolStr.length,
						symbolIt = 0,
						symbolInt = 500,
						showScore = function() {
							if (symbolCt > 0) {
								taskLine.innerHTML += symbolCt == 1 ? symbolStr : symbolStr[symbolIt];
								++symbolIt;
							} else {
								taskLine.innerHTML += "nothing";
							}
							if (symbolIt < symbolCt) {
								setTimeout(showScore,symbolInt);
							} else {
								bi.disabled = false;
							}
						};
					
					setTimeout(function() {
						taskLine.innerHTML = "Score: " + g.points*100;
						window.speechSynthesis.speak(new SpeechSynthesisUtterance("Score: " + g.points*100));
						window.speechSynthesis.speak(new SpeechSynthesisUtterance("press the spacebar to start again"));

					},1500);
					
					return false;
				}
			};
		},
		g = new game(),
		miss = function() {
			g.check(g.actions[0],g.task);
		},
		missTimer,
		next = function() {
			g.nextTask();
			missTimer = setTimeout(miss,g.taskTime);
		},
		beforeNext = function() {
			clearTimeout(missTimer);
			setTimeout(next,g.taskDelay);
		};

		
		function makeSound(){
		 let audio = new Audio('../sounds/sthswng1.mp3')
		 audio.volume = .3;
		 audio.play();
		}
		

		

		
		window.speechSynthesis.speak(new SpeechSynthesisUtterance(

				"welcome to clap it. play by using the arrow keys. when the game gives you the command to left it, press the left arrow key, and so on. Start a new game by pressing the space bar. Press control when the game is over to go back to the game selection screen."

			));
		 let audio = new Audio('../sounds/clapit-music.mp3')
		 audio.play();

    document.body.onkeyup = function(e){

     makeSound();
      
      if(e.keyCode == 32){

		
      		
	      
        if (g.gameOver || g.task === null) {
	        document.querySelector(".cta").style.display = "none";
	        g = new game();
	        g.gameOver = false;
	        taskLine.innerHTML = "Begin!";
					window.speechSynthesis.speak(new SpeechSynthesisUtterance("Begin"));

	        setTimeout(next,g.taskDelay);
        }

				

	  } else if (e.keyCode == 17) {  //exit button
			//Read out: "Are you sure you want to quit the game? Press again to exit."
			window.speechSynthesis.cancel();
        	location.href = '/chooseGame';
    	}
	  
	  switch (e.keyCode)
          {

            case 37: //Left

              if (!g.gameOver && g.task !== null) {
						    if (g.check(g.actions[2],g.task)) {
								//playSound();
							    beforeNext();
						    } else {
							  //clearTimeout(missTimer);
							 
						    }
					    }
              break;

            case 38: //Up

             if (!g.gameOver && g.task !== null) {
						    if (g.check(g.actions[1],g.task)) {
								//playSound();
							    beforeNext();
						    } else {
							  //clearTimeout(missTimer);
							   
						    }
					    }
              break;

            case 39: //Right

             if (!g.gameOver && g.task !== null) {
						    if (g.check(g.actions[3],g.task)) {
								//playSound();
							    beforeNext();
						    } else {
							  //clearTimeout(missTimer);
							    
						    }
					    }
              break;

            case 40: //Down

              if (!g.gameOver && g.task !== null) {
						    if (g.check(g.actions[4],g.task)) {
								//playSound();
							    beforeNext();
						    } else {
							  //clearTimeout(missTimer);
							    
						    }
					    }
              break;



          }
	}
}
