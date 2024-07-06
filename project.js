const state = {
    scores:{
        player1: 0 ,
        player2: 0
    },
    squares: Array(9).fill(null),
    xIsNext: true
};

function calWinner(squares){
    const winning_lines = [
        [0,1,2] ,
        [3,4,5] ,
        [6,7,8] ,
        [0,3,6] ,
        [1,4,7] ,
        [2,5,8] ,
        [0,4,8] ,
        [2,4,6] ,

    ] ;

    for(let i=0; i<winning_lines.length; i++)
    {
       const [a, b, c] = winning_lines[i];
       if(squares[a] && squares[a] === squares[b] && squares[b] === squares[c]){
          showWinner(squares[a])
          setTimeout( () => resetBoard(), 1000)
          return squares[a];
        } }

        if(!squares.includes(null)){
            showWinner(null);
            setTimeout( () => resetBoard(), 1000 )
            return null;
        }
    

}


function resetBoard(winner)
{
   if(winner){
    if(winner === 'X')
    {
       state.scores.player1++ ;
    }
    else {
       state.scores.player2++ ;
    }
   }
   state.squares = Array(9).fill(null);
   document.getElementById("player1").text(state.scores.player1);
   document.getElementById("player2").text(state.scores.player2);
   renderBoard();
}

function showWinner(winner){
 const alert_box = document.getElementById("alert-box")
 if(winner){
    if(winner === 'X'){ winner = "player1 "}
    else { winner = "player2"}
 
alert_box.html(' ${winner} is <strong> Won! </strong>') 
 }
else{
 alert_box.html('It`s a Draw')
}
 alert_box.slideDown()
 setTimeout( () => alert_box.slideUp() , 1000 );
}

function renderSquare(index){
   const val=state.squares[index] ? state.squares[index] : "&nbsp"
   return '<div> value=${index} class="box col-lg-4 col-md-4 col-sm-4 col-xs-4" onclick="boxClick(${index})">$(val)</div>'
}

function renderBoard(){
   let board_html = ' ' ;
   for( let i=0; i<9; i++){
      board_html += renderSquare(i) ;
   }
   $("#board").html(board_html);
   calWinner(state.squares);
}

function boxClick(index){
   const squares = state.squares;
   if(calWinner(squares) || squares[index]) 
   {
      return;
   }

   squares[index] = state.xIsNext ? 'X' :  'O'
   state.squares = squares 
   state.xIsNext = !state.xIsNext ;
   renderBoard();
}

function resetGame(){
   state.scores.player1 = 0
   state.scores.player2 = 0
   resetBoard(null) ;
}

$(() => {
   renderBoard();
   document.getElementById("alert-box").slideUp(0.0001) ;
   $("#clear").on("click", () =>resetBoard(null))
   $("#reset").on("click", () => resetGame())
})