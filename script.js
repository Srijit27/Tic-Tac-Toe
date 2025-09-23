const cells=document.querySelectorAll('.cell')
const titleHead=document.querySelector('#titleHeader')
const player_x=document.querySelector('#playerX')
const player_y=document.querySelector('#playerY')
const Restartbtn=document.querySelector('Restartbtn')

//initialised the variables
let player='X'
let gamePause=false
let gameStart=false

//An array to track the state of each cell
const inputCells=['','','',
                  '','','',
                  '','','']
const winCells=[[0,1,2],[3,4,5],[6,7,8], //for rows
                [0,3,6],[1,4,7],[2,5,8], //for columns
                [0,4,8],[2,4,6] //for left and right diagonals
               ]

cells.forEach((cell,index)=> {
    cell.addEventListener('click',()=>Celltap(cell,index))
})

function Celltap(cell,index){
    //Ensuring that no cell is empty and the game is not paused
    if(cell.textContent==='' && !gamePause){ //if game is paused then gamePause=false, ! value gives true which will satisfy the condition
        gameStart=true
        Cellupdate(cell,index)
        if(!winner()){
            Playerchange()
            Pickrandom()
        }
    }
}

function Cellupdate(cell,index){
    cell.textContent=player
    inputCells[index]=player
    cell.style.color=(player=='X')?'#0095ff9f':'#8f0af4'
} 

function Playerchange(){
    player=(player=='X')?'O':'X'
}

function Pickrandom(){
    // Pause the game to allow the computer to pick
    gamePause=true
    setTimeout(()=>{
        let rand_ind
        do{
            // Pick a random index
            rand_ind=Math.floor(Math.random()*inputCells.length)
        }while(
            // Ensure the chosen cell is empty
            inputCells[rand_ind]!=''
        )
        // Update the cell with Computer's move
        Cellupdate(cells[rand_ind],rand_ind,player)
        // Check if Computer not won
        if (!winner()) {
            Playerchange()
            // Swith back to Human player
            gamePause=false
            return
        }
        player=(player=='X')?'O':'X'
    }, 1000) // Delay Computer move by 1 second
}

function checkWinner(){
    for(const[a,b,c] of winConditions){
        // Check each winning condition
        if(inputCells[a]==player && inputCells[b]==player && inputCells[c] == player)
        {
            declareWinner([a, b, c])
            return true
        }
    }
    // Check for a draw (if all cells are filled)
    if(inputCells.every(cell=>cell!='')){
        declareDraw()
        return true
    }
}

function declareWinner(winningIndices) {
    titleHead.textContent = `${player} Win`
    isPauseGame = true
    // Highlight winning cells
    winningIndices.forEach((index) =>
        cells[index].style.background = '#2A2343'
    )
    restartBtn.style.visibility = 'visible'
}