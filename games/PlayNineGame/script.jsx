var StarsFrame = React.createClass({
  
  render: function(){
  
    var stars=[];
    
    for (var i=0; i < this.props.numberOfStars; i++){
      stars.push(
        <span className='glyphicon glyphicon-star'></span>
      );
    }
    
    return(
      <div id='stars-frame'>
        <div className='well'>
          {stars}    
        </div>
      </div>
    );
  }
});

var ButtonFrame = React.createClass({
  render: function(){
    var disabled, button, correct = this.props.correct;
    
    switch (correct){
      case true:
        button =(
          <button className='btn btn-success btn-lg' disabled={disabled}>
            <span className='glyphicon glyphicon-ok' onClick={this.props.acceptAnswer}></span>
          </button>
        );
        break;
      case false:
        button =(
          <button className='btn btn-danger btn-lg' disabled={disabled}>
            <span className='glyphicon glyphicon-remove'></span>
          </button>
        );
        break;
      default:
        button =(
          <button className='btn btn-primary btn-lg' disabled={disabled}
            onClick={this.props.checkAnswer}>
            =
          </button>
        );
    }
    
    disabled = (this.props.selectedNumbers.length === 0);
    
    return(
      <div id='button-frame'>
        {button}
        <br /><br />
        <button className='btn btn-warning btn-xs' onClick={this.props.redraw}
                disabled={this.props.redraws === 0}>
          <span className='glyphicon glyphicon-refresh'></span>
          &nbsp;
          {this.props.redraws}
        </button>
      </div>
    );
  }
});

var AnswerFrame = React.createClass({
  render: function(){
    var props = this.props;
    var selectedNumbers = props.selectedNumbers.map(function(i){
      return(
        <span onClick={props.unselectNumber.bind(null, i)}>
          {i}
        </span>
      )
    });
    
    return(
      <div id='answer-frame'>
        <div className='well'>
          {selectedNumbers}
        </div>
      </div>
    );
  }
});

var NumbersFrame = React.createClass({
  
  render: function(){
    var numbers=[], className,
        selectNumber = this.props.selectNumber, //called parent's selectNumber() 
        usedNumbers = this.props.usedNumbers,
        selectedNumbers = this.props.selectedNumbers;
      
    
    for (var i=1; i <= 9; i++){
      className = 'number selected-'+(selectedNumbers.indexOf(i)>=0); //if there is a number return True; if not return False
      className += ' used-' +(usedNumbers.indexOf(i)>=0);
      numbers.push(
        <div className={className} onClick={selectNumber.bind(null, i)}>
          {i}
        </div>
      );
    }
    
    return(
      <div id='numbers-frame'>
        <div className='well'>
          {numbers}
        </div>
      </div>
    );
  }
});

var InstructionsFrame = React.createClass({
  render: function(){
    return(
      <div className="well text-center">
        <h2 className="text-center">Game Instructions</h2>
        <ol className="text-left">
          <li><span className="bold">Objective:</span> You must select the number(s) in the Number Box to equal the star(s). However, you can <span className="bold">only</span> use the number <span className="bold">once</span>.
          </li>
          <li>Once you selected the number(s), click the <button className="btn btn-primary btn-xs">=</button>.
          </li>
          <li>If the number(s) sum does not equal the star(s), <button className='btn btn-danger btn-xs'><span className="glyphicon glyphicon-remove"></span></button> will appear. If <button className='btn btn-success btn-xs'><span className="glyphicon glyphicon-ok"></span></button> appears, this means the selected number(s) sum is equal to the star(s). Click the <button className='btn btn-success btn-xs'><span className="glyphicon glyphicon-ok"></span></button> to submit your answer.
          </li>
          <li>If there are no numbers in the Number Box that equal the star(s). You can select the <button className='btn btn-warning btn-xs'><span className="glyphicon glyphicon-refresh"></span></button> to draw new star(s). You <span className="bold">only</span> have 3 draws. Use them wisely.
          </li>
          <li>Last, but not least. Have Fun!</li>
        </ol>
      </div>
    );
  }
});

var DoneFrame = React.createClass({
  render: function(){
    return(
      <div className='well text-center'>
        <h2>{this.props.doneStatus}</h2>
        <button className='btn btn-default' onClick={this.props.resetGame}>Play again?</button>
      </div>
    );
  }
});

var Game = React.createClass({
  
  getInitialState: function(){
    return{
      numberOfStars: this.randomNumber(),//Math.random() btw 0-1 ...will not reach 9,
      selectedNumbers: [],
      usedNumbers: [],
      redraws: 3,
      correct: null, //no answer right now
      doneStatus: null
    } //this is state property of Game class!!
  },
  resetGame: function(){
    this.replaceState(this.getInitialState());//replaceState - drops the whole state and replace with whatever you supply; setState merges what you supply
  },
  randomNumber: function(){
    return Math.floor(Math.random()*9) + 1;
  },
  
  selectNumber: function(clickedNumber){
    if(this.state.selectedNumbers.indexOf(clickedNumber) < 0 && this.state.usedNumbers.indexOf(clickedNumber) < 0){ //condition to check if selectedNumbers exist...
      this.setState(
        {selectedNumbers: this.state.selectedNumbers.concat(clickedNumber), correct: null} //combined new clickedNumber with current number array
      );
    }
  },
  
  unselectNumber: function(clickedNumber){
    var selectedNumbers = this.state.selectedNumbers,
        indexOfNumber = selectedNumbers.indexOf(clickedNumber);
        
        selectedNumbers.splice(indexOfNumber,1); //the removed number; don't need it
        
        this.setState({ selectedNumbers: selectedNumbers, correct: null }); //updating selectedNumbers state
  },
  
  sumOfSelectedNumbers: function(){
    return this.state.selectedNumbers.reduce(function(p,n){
      return p+n;  
    }, 0);
  },
  
  checkAnswer: function(){
    var correct = (this.state.numberOfStars === this.sumOfSelectedNumbers());
    this.setState({ correct: correct })
  },
  
  acceptAnswer: function(){
    var usedNumbers = this.state.usedNumbers.concat(this.state.selectedNumbers);
    this.setState({
      selectedNumbers: [],
      usedNumbers: usedNumbers,
      correct: null,
      numberOfStars: this.randomNumber()
    }, function(){
      this.updateDoneStatus();
    });
  },
  
  redraw: function(){
    if(this.state.redraws > 0){
      this.setState({
        numberOfStars: this.randomNumber(),
        selectedNumbers: [],
        correct: null,
        redraws: this.state.redraws - 1
      }, function(){
      this.updateDoneStatus();
      });
    }
  },
  
  possibleSolutions: function(){
    var numberOfStars = this.state.numberOfStars,
        possibleNumbers = [],
        usedNumbers = this.state.usedNumbers;
        
    for (var i = 1; i <= 9; i++){
      if(usedNumbers.indexOf(i) < 0){
        possibleNumbers.push(i);
      }
    }
    
    return (this.possibleCombinationSum(possibleNumbers, numberOfStars));
  },
  
  possibleCombinationSum: function(arr, n) {
    if (arr.indexOf(n) >= 0) { return true; }
    if (arr[0] > n) { return false; }
    if (arr[arr.length - 1] > n) {
      arr.pop();
      return possibleCombinationSum(arr, n);
    }
    var listSize = arr.length, combinationsCount = (1 << listSize)
    for (var i = 1; i < combinationsCount ; i++ ) {
      var combinationSum = 0;
      for (var j=0 ; j < listSize ; j++) {
        if (i & (1 << j)) { combinationSum += arr[j]; }
      }
      if (n === combinationSum) { return true; }
    }
    return false;
  },
  
  updateDoneStatus: function(){
    if(this.state.usedNumbers.length === 9){
      this.setState({ doneStatus:'You Won!' });
      return
    }else if(this.state.redraws === 0 && !this.possibleSolutions()){
      this.setState({ doneStatus:'Game Over!' });
      return
    } 
  },
  
  render: function(){
    var selectedNumbers = this.state.selectedNumbers,
        usedNumbers = this.state.usedNumbers,
        numberOfStars = this.state.numberOfStars,
        correct = this.state.correct,
        redraws = this.state.redraws,
        doneStatus = this.state.doneStatus,
        bottomFrame;
      
      if(doneStatus){
        bottomFrame = <DoneFrame doneStatus={this.state.doneStatus}
                                 resetGame = {this.resetGame}/>;
      }else{
        bottomFrame = <NumbersFrame selectedNumbers = {selectedNumbers}
                      usedNumbers = {usedNumbers}
                      selectNumber = {this.selectNumber}/>;
      }
        
    return(
      <div id='game' className='container'>
        <h2>Play Nine</h2>
        <hr />
        <div className='clearfix'>
          <StarsFrame numberOfStars={numberOfStars}/>
          <ButtonFrame selectedNumbers = {selectedNumbers} 
                       correct = {correct}
                       redraws = {redraws}
                       checkAnswer = {this.checkAnswer}
                       acceptAnswer = {this.acceptAnswer}
                       redraw = {this.redraw}/>
          <AnswerFrame selectedNumbers = {selectedNumbers}
                       unselectNumber = {this.unselectNumber}/>    
        </div>
          {bottomFrame}
          <InstructionsFrame/>
      </div>
    );
  }
});

ReactDOM.render(
  <Game />,
  document.getElementById('container')
);

/*
Bootstrap and CSS
Rendering random stars
Button, and answer frame
Available numbers, 1-9

Playing the Game
Selecting an answer
Changing an answer
UI behavior

Verify and accept answer
5 redraws to balance the level
No possible solutions
Done Status (win/lose)
*/
