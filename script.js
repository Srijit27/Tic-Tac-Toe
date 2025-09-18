const cells=document.querySelectorAll('.cell')
const titleHead=document.querySelector('#titleHeader')
const player_x=document.querySelector('#playerX')
const player_y=document.querySelector('#Restartbtn')

//initialised the variables
let player='X'
let gamePause=false
let gameStart=false

//An array to track the state of each cell
const inputCells=['','','',
                  '','','',
                  '','','']
const winCells=[[0,1,2],[3,4,5],[6,7,8] //for rows
                [0,3,6],[1,4,7],[2,5,8] //for columns
                [0,4,8],[2,4,6] //for left and right diagonals
               ]

cells.forEach((cell,index)=> {
    cell.addEventListener('click',()=>Celltap(cell,index))
})