// (function(){
	var model = {
		board:[Array(3),Array(3),Array(3)],//[[3][3][3]]	

		player: 'X',//X
		
		updateBoard: function(player, row, col){
						model.board[row][col] = player;//board[0][0]=X
						model.player = model.switchPlayer(player);//O
		},

		tieCount: 0,

		switchPlayer: function(turn){
			return (turn==='X') ? 'O': 'X'; //return O
		}
	
	};

	var octopus = {
		init: function(){

			var board = document.getElementById('board');
			
			//Game Handler
			var playGame = function(e){
				var player = model.player;//X
				var clickedElement = e.target;//<div class="game" id="b00"></div>
				var row = clickedElement.id.substring(1,2);//0
				var col = clickedElement.id.substring(2,3);//0
				
				if(model.board[row][col] !== 'X' && model.board[row][col] !== 'O' ){	
					
					octopus.updateBoard(clickedElement, player, row, col);//octopus.updateBoard('<div class="game" id="b00"></div>','X','0','0')
					
					if(octopus.checkForWinner(player)){//return false 
						octopus.announceWinner(player);//not invoke when false. True will player + " won" 
						board.removeEventListener('click', playGame, false);//not invoke when false. True will remove eventlistener
					}
				}
			};


			//Listen for click on board
			board.addEventListener('click', playGame);
			
		},

		updateBoard: function (clickedElement, player, row, col){
					view.updateBoard(clickedElement, player);//view.updateBoard() -- Must be before model call as model will modify X becomes O
																									 // view.updateBoard('<div class="game" id="b00"></div>','X') 
					model.updateBoard(player, row, col);//model.updateBoard('X','0','0')
		},

		checkForWinner: function(player){ //checkForWinner: function('X'){}

			for (var i = 0; i < 3; i++) {  

				if (model.board[i][0] === player &&
		        model.board[i][1] === player &&
		        model.board[i][2] === player) {
		        	return true;
			    } else
			    if (model.board[0][i] === player &&
			        model.board[1][i] === player &&
			        model.board[2][i] === player) {
			        return true;
			    } else
			    if (model.board[0][i] === player &&
			        model.board[1][i + 1] === player &&
			        model.board[2][i + 2] === player) {
			        return true;
			    } else
			    if (model.board[0][i + 2] === player &&
			        model.board[1][i + 1] === player &&
			        model.board[2][i] === player) {
			        return true;
			    }
			}
	
			model.tieCount += 1;	//0 + 1
			
			if(model.tieCount === 9){
				return alert("Tie Game. Would you like to play again.");
			}		
		},

		announceWinner: function(winner){//announceWinner: function('X'){}
			alert(winner + " won!");
		}

	};

	var view = {

		updateBoard: function(clickedElement, player){ //updateBoard: function('<div class="game" id="b00"></div>','X')

			clickedElement.innerText = player; //html: X
			
			if(player === 'X'){
				clickedElement.classList.add('x');//<div class="game x" id="b00"></div> 
			}else{
				clickedElement.classList.add('o');
			}
		},
	};

octopus.init();//calls octopus.init

// })();


/*

*/