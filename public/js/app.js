$(function() {
	'use strict';

	var PuzzleGame = function() {

		this.gameStarted = false;
		this.currentState = [];
		this.moves = 0;
		this.initArray = function() {

			var	totalElements = 16;

			for (var i = 0; i < totalElements; i ++) {
				this.currentState.push(i);
			}

		}

		this.shuffleArray = function() {

			var	currentIndex = this.currentState.length,
				temporaryValue,
				randomIndex;

			// Fisher-Yates (aka Knuth) Shuffle algorithm
			while (0 !== currentIndex) {

				// Pick a remaining element...
				randomIndex = Math.floor(Math.random() * currentIndex);
				currentIndex -= 1;

				// And swap it with the current element.
				temporaryValue = this.currentState[currentIndex];
				this.currentState[currentIndex] = this.currentState[randomIndex];
				this.currentState[randomIndex] = temporaryValue;

			}

		}

		this.getReadyElements = function() {
			var array = this.currentState,
				zeroIndex = array.indexOf(0) + 1,
				readyElementsIndex = [];

				// get index of top element
				(zeroIndex - 4) > 0 ? readyElementsIndex.push(zeroIndex - 4) : readyElementsIndex.push(null);
				// get index of right element
				(zeroIndex % 4) !== 0 ? readyElementsIndex.push(zeroIndex + 1) : readyElementsIndex.push(null);
				// get index of bottom element
				(zeroIndex + 4) <= 16 ? readyElementsIndex.push(zeroIndex + 4) : readyElementsIndex.push(null);
				// get index of left element
				(zeroIndex % 4) !== 1 ? readyElementsIndex.push(zeroIndex - 1) : readyElementsIndex.push(null);

				$('.puzzle-area >div').each(function() {

					for (var i = 0; i < readyElementsIndex.length; i++) {
						readyElementsIndex[i] === $(this).index() + 1 ? $(this).addClass('ready') : '';
					}

				});
				//ready to click elements get 'ready' class
		}

		this.performClick = function(e) {
			var elementToMoveIndex = $(e.target).parent().index(),
				zeroIndex = this.currentState.indexOf(0);

			this.currentState[zeroIndex] = this.currentState[elementToMoveIndex];
			this.currentState[elementToMoveIndex] = 0;
			// swap elements

			this.moves += 1;
			$('#moves-value').html('moves ' + this.moves);

			this.checkWin();

			this.init();

		}

		this.reDraw = function() {

			$('.puzzle-area').empty();

			for (var i = 0; i < 16; i++ ) {

				var currentClass = this.currentState[i] === 0 ? 'puzzle-zero' : 'puzzle-number';

				$('.puzzle-area').append('<div class="' + currentClass + '"><i>' + this.currentState[i] + '</i></div>');

			}

		}

		this.init = function() {

			if (!this.gameStarted) {

				this.initArray();

				this.shuffleArray();

				this.gameStarted = true;

				Array.prototype.equals = function (array) {
				    // if the other array is a falsy value, return
				    if (!array)
				        return false;

				    // compare lengths
				    if (this.length != array.length)
				        return false;

				    for (var i = 0, l=this.length; i < l; i++) {
				        // Check if we have nested arrays
				        if (this[i] instanceof Array && array[i] instanceof Array) {
				            // recurse into the nested arrays
				            if (!this[i].equals(array[i]))
				                return false;       
				        }           
				        else if (this[i] != array[i]) { 
				            // Warning - two different object instances will never be equal: {x:20} != {x:20}
				            return false;   
				        }           
				    }       
				    return true;
				}  

			}

			this.reDraw();

			this.getReadyElements();

			var that = this;

			$('.puzzle-area .ready i').on('click', function(e) {

				that.performClick(e);

			});

		}

		this.checkWin = function() {
			var winSituation = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0];

			if (this.currentState.equals(winSituation)) {
				$('#total-moves').html('Total moves: ' + this.moves);
				$('#total-time').html('Total time: ' + this.timer);
				$('.win-container').fadeIn(100);
			}

		}

		// this.formatTimer = function(seconds) {
		// 		var h = Math.floor(seconds / 3600),
		// 				m = Math.floor(seconds / 60) % 60,
		// 				s = seconds % 60;
		// 		if (h < 10) h = "0" + h;
		// 		if (m < 10) m = "0" + m;
		// 		if (s < 10) s = "0" + s;
		// 		return h + ":" + m + ":" + s;
		// }
		// var count = 0;
		// var counter = setInterval(this.startTimer, 1000);

		// this.startTimer = function() {
		// 		count++;
		// 		if (count < 0) return clearInterval(counter);
		// 		$('#timer-value ').html(this.formatTimer(count));
		// 		document.getElementById('timer').innerHTML = this.formatTimer(count);
		// }

		// this.startTimer();

	};

	var game = new PuzzleGame();

	$('.start-container').click(function(){
		$(this).fadeOut(100);
		game.init();
	})

	// function formatTime(seconds) {
	//     var h = Math.floor(seconds / 3600),
	//         m = Math.floor(seconds / 60) % 60,
	//         s = seconds % 60;
	//     if (h < 10) h = "0" + h;
	//     if (m < 10) m = "0" + m;
	//     if (s < 10) s = "0" + s;
	//     return h + ":" + m + ":" + s;
	// }
	// var count = 62;
	// var counter = setInterval(timer, 1000);

	// function timer() {
	//     count--;
	//     if (count < 0) return clearInterval(counter);
	//     document.getElementById('timer').innerHTML = formatTime(count);
	// }


});