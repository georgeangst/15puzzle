$(function() {
	'use strict';

	var PuzzleGame = function() {

		this.gameStarted = false;
		this.currentState = [];
		this.moves = 0;
		this.initArray = function() {

			var array = [],
				totalElements = 16;

			for (var i = 0; i < totalElements; i ++) {
				array.push(i);
			}

			this.currentState = array;
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
				(zeroIndex + 4) <= 15 ? readyElementsIndex.push(zeroIndex + 4) : readyElementsIndex.push(null);
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
				zeroIndex = this.currentState.indexOf(0),
				temp = elementToMoveIndex;

			this.currentState[zeroIndex] = this.currentState[elementToMoveIndex];
			this.currentState[elementToMoveIndex] = 0;
			// swap elements

			this.init();

		}

		this.reDraw = function() {

			var array = this.currentState;

			$('.puzzle-area').empty();

			for (var i = 0; i < 16; i++ ) {

				var currentId = array[i],
					currentClass = array[i] === 0 ? 'puzzle-zero' : 'puzzle-number';

				$('.puzzle-area').append('<div id="id' + currentId + '" class="' + currentClass + '">' + currentId + '</div>');

			}

		}

		this.init = function() {

			if (!this.gameStarted) {

				this.initArray();

				var array = this.shuffleArray();

				this.currentState = array;

				this.gameStarted = true;
			}

			this.reDraw();

			this.getReadyElements();

			var that = this;

			$('.puzzle-area .ready').on('click', function(e) {

				that.performClick(e);

			});
			// console.log(array);

		}

	};

	var game = new PuzzleGame();

	game.init();

});