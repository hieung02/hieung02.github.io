describe("Model.UpdateBoard Checks:", function(){
	// octopus.updateBoard("<div class='game' id='b00'></div>",'X','0','0');
	
	// //Not sure how to pass DOM element div to unit test; also may need to know how to trigger event click
	// var clickedEle, player, row, col;
		
		// beforeEach(function(){
		// 	clickedEle = document.getElementById('b00');
		// 	clickedEle.click();
		// 	player = "O";
		// 	// row = "0";
		// 	// col = "0";
		// });

	beforeEach(function(){
		model.updateBoard('X','0','0');
	});

	

	it("should update board position", function(){

		expect(model.board[0][0]).toBe('X');
	});

	it('Player switch - should NOT be player X', function(){

		expect(model.player).not.toBe('X');
	});

	//review this unit test as it does not properly address test - model 
	it('Board should NOT override existing position', function(){
		
		// var clickedEle, player, row, col;
		
		// beforeEach(function(){
		// 	clickedEle = document.getElementById('b00');
		// 	clickedEle.click();
		// 	player = "O";
		// 	// row = "0";
		// 	// col = "0";
		// });

		expect(model.board[0][0]).not.toBe('O');
	});
	
});

// describe('View.UpdateBoard Checks', function(){

// });

describe('Check for Winner:', function(){
	var player;

	beforeEach(function(){
		player = 'X';
		model.board[0][0] = player;
		model.board[0][1] = player;
		model.board[0][2] = player;
	});

	it('Winner should be Player X', function(){
		expect(octopus.checkForWinner(player)).toBe(true);
	});

	it('Console.log("X won!")', function(){
		
		// spyOn(console,'log'); //This also works!!
		console.log = jasmine.createSpy('log');
		octopus.announceWinner(player);

		expect(console.log).toHaveBeenCalledWith("X won!");
	});					
		
});

describe('Check for Tie Winner:', function(){
	
	var x;
	var o;

	beforeEach(function(){
		
		x = 'X';
		o = 'O';

		// model.tieCount = 0;
		  
		model.board[0][0] = x;
		model.board[0][1] = o;
		model.board[0][2] = x;

		model.board[0][0] = o;
		model.board[1][0] = x;
		model.board[2][0] = o;

		model.board[0][1] = x;
		model.board[1][1] = o;
		model.board[2][2] = x;

		model.board[0][2] = o;
		model.board[1][1] = x;
		model.board[2][0] = o;
		
	});

	it('No winner - alert: no winner', function(){
		spyOn(window,'alert');
		
		while(model.tieCount <= 9){
			octopus.checkForWinner(x);
		}
		
		expect(window.alert).toHaveBeenCalledWith('Tie Game. Would you like to play again.');
	});

});

describe('Check Board - Click Event Simulation:', function(){
	var clickedEle;

	beforeEach(function(){
		model.board[0][0] = 'O'
		//simulate a div click
		clickedEle = document.getElementById('b00');

		var e = new MouseEvent('click', {'view': window, 'bubbles': true, 'cancelable': true});
		clickedEle.dispatchEvent(e);
	});

	it('octopus.updateBoard() should not be called when position exists', function(){
		
		// var clickBoard = octopus.updateBoard()
		// spyOn(clickBoard, 'updateBoard');

		expect(octopus.updateBoard).not.toHaveBeenCalled();
	});
});