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
			this.taskDelay = 1000;
			this.taskTime = 1500;
			this.gameOver = true;
			this.nextTask = function(){
				this.task = this.actions[rand(1,4)];
				document.querySelector(".task").innerHTML = this.task.text;
			};
			this.check = function(input, task) {
				let valid = false;
				if (input.id == task.id) {
					valid = true;
				}
				if (valid && this.points < this.maxPoints - 1) {
					++this.points;
					// reduce task delay and time to gradually increase difficulty
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
						taskLine.innerHTML = "DOOOOOH!";
					}
					
					let bi = document.querySelector(".clap-it"),
						pts = String(this.points).split("").reverse(),
						symbols = ["🥁","🔩","😗"],
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
						taskLine.innerHTML = "Score: ";
						setTimeout(showScore,symbolInt);
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
		// restart miss timer after calling out next task
		next = function() {
			g.nextTask();
			missTimer = setTimeout(miss,g.taskTime);
		},
		// cancel miss timer, delay before next task
		beforeNext = function() {
			clearTimeout(missTimer);
			setTimeout(next,g.taskDelay);
		},
		btnEvent = "ontouchend" in document.documentElement ? "touchend" : "click";

	document.querySelector(".clap-it").addEventListener(btnEvent,function(){
		if (g.gameOver || g.task === null) {
			document.querySelector(".cta").style.display = "none";
			g = new game();
			g.gameOver = false;
			taskLine.innerHTML = "";
			setTimeout(next,g.taskDelay);
		} else {
			if (g.check(g.actions[1],g.task)) {
				beforeNext();
			} else {
				clearTimeout(missTimer);
			}
		}
	});
	var ua = navigator.userAgent,
		grab = ua.indexOf("WebKit") > -1 ? "-webkit-grab" : (ua.indexOf("Firefox") > -1 ? "-moz-grab" : "grab"),
		
		t = Draggable.create(".twist-it", {
			type: "y",
			cursor: grab,
			edgeResistance: 1,
			bounds: {
				minY: -72,
				maxY: 0
			},
			onDragEnd: function() {
				let twistIt = document.querySelector(".twist-it");

				if (twistIt.style.transform.indexOf(", -72px,") > -1 || 
				   twistIt.style.transform.indexOf(", 0px,") > -1) {
					if (!g.gameOver && g.task !== null) {
						if (g.check(g.actions[2],g.task)) {
							beforeNext();
						} else {
							clearTimeout(missTimer);
						}
					}
				}
				TweenLite.set(".twist-it", {
					clearProps: "transform"
				});
			}
		}),
		p = Draggable.create(".pull-it", {
			type: "x",
			cursor: grab,
			edgeResistance: 1,
			bounds: {
				minX: 0,
				maxX: 16
			},
			onDragEnd: function() {
				let pullIt = document.querySelector(".pull-it");

				if (pullIt.style.transform.indexOf("(16px") > -1) {
					if (!g.gameOver && g.task !== null) {
						if (g.check(g.actions[3],g.task)) {
							beforeNext();
						} else {
							clearTimeout(missTimer);
						}
					}
				}
				TweenLite.set(".pull-it", {
					clearProps: "transform"
				});
			}
		});
}
// prevent accidental panning in iOS Safari
document.addEventListener('touchstart', function(e) {
    e.preventDefault();
});