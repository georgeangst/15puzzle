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

			var array = this.currentState,
				currentIndex = array.length,
				temporaryValue,
				randomIndex;

			// Fisher-Yates (aka Knuth) Shuffle algorithm
			while (0 !== currentIndex) {

				// Pick a remaining element...
				randomIndex = Math.floor(Math.random() * currentIndex);
				currentIndex -= 1;

				// And swap it with the current element.
				temporaryValue = array[currentIndex];
				array[currentIndex] = array[randomIndex];
				array[randomIndex] = temporaryValue;

			}

			return array;
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

				// console.log(readyElementsIndex);

				$('.puzzle-area >div').each(function() {

					for (var i = 0; i < readyElementsIndex.length; i++) {
						readyElementsIndex[i] === $(this).index() + 1 ? $(this).addClass('ready') : '';
					}

				});
				//ready to click elements get 'ready' class
		}

		this.performClick = function(e) {
			var elementToMoveIndex = $(e.target).index(),
				zeroIndex = this.currentState.indexOf(0);

			this.currentState[zeroIndex] = this.currentState[elementToMoveIndex];
			this.currentState[elementToMoveIndex] = 0;
			// swap elements

			this.moves += 1;
			$('#moves-value').html(this.moves);

			this.init();

		}

		this.reDraw = function() {

			var array = this.currentState;

			$('.puzzle-area').empty();

			for (var i = 0; i < 16; i++ ) {

				var currentClass = array[i] === 0 ? 'puzzle-zero' : 'puzzle-number';

				$('.puzzle-area').append('<div class="' + currentClass + '"><i>' + array[i] + '</i></div>');

			}

		}

		this.init = function() {

			if (!this.gameStarted) {

				this.initArray();

				this.currentState = this.shuffleArray();

				this.gameStarted = true;

			}

			this.reDraw();

			this.getReadyElements();

			var that = this;

			$('.puzzle-area .ready').on('click', function(e) {

				that.performClick(e);

			});

		}

		this.formatTimer = function(seconds) {
				var h = Math.floor(seconds / 3600),
						m = Math.floor(seconds / 60) % 60,
						s = seconds % 60;
				if (h < 10) h = "0" + h;
				if (m < 10) m = "0" + m;
				if (s < 10) s = "0" + s;
				return h + ":" + m + ":" + s;
		}
		var count = 0;
		var counter = setInterval(this.startTimer, 1000);

		this.startTimer = function() {
				count++;
				if (count < 0) return clearInterval(counter);
				$('#timer-value ').html(this.formatTimer(count));
				document.getElementById('timer').innerHTML = this.formatTimer(count);
		}

		this.startTimer();

	};

	var game = new PuzzleGame();

	game.init();

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