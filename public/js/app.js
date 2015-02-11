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
		
		this.setMoves('moves ' + this.moves);

		this.checkWin();

		this.init();

	}

	this.setMoves = function(moves) {
		$('#moves-value').html(moves);
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
			$('#total-time').html('Total time: ' + $('#timer-value').html());
			$('.win-container').fadeIn(100);
			$('#timer-value').timer({action: 'pause'});

		}

	}

	this.restart = function() {
		this.gameStarted = false;
		this.moves = 0;
		this.currentState = [];
		this.setMoves('');
		this.init();
		$('.win-container').fadeOut(100);
		$('#timer-value')
			.timer({action: 'reset'})
			.timer({action: 'start'});

	}

};

var game = new PuzzleGame();

$('.start-container').click(function(){
	$(this).addClass('hidden');
	$('.game-container').removeClass('hidden');
	game.init();
	$('#timer-value').timer({
		action: 'start', 
		seconds: 0
	});
});

$('#game-restart').click(function(){
	game.restart();
});