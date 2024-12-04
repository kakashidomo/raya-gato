const board = document.querySelector('.board');
const boardItems = document.querySelectorAll('.board_item');
const restard = document.querySelector('#restart')


function reset() {
  const circle = document.querySelectorAll('.circle')

  const cross = document.querySelectorAll('.cross')


  circle.forEach(circle => {
    circle.parentElement.innerHTML = '';
  });


  cross.forEach(cross => {
    cross.parentElement.innerHTML = '';
  });

}
let turno = 0


function fillBoard(e) {

  const target = e.target


  if (target.tagname !== "MAIN" && target.id !== '') {

    const hasIcon = target.querySelector('.cross') || target.querySelector('.circle');

    if (hasIcon) {
      return;
    }

    const template_cross = `
              <svg class="icon cross">
                <use xlink:href="./icons/icon-x.svg#icon-x"></use>
              </svg>     
`
    const template_circle = `
              <svg class="icon circle">
                <use xlink:href="./icons/icon-o.svg#icon-o"></use>
              </svg>
`
    target.innerHTML = turno === 0 ? template_cross : template_circle
    turno = turno === 0 ? 1 : 0
    const winner = checkWinner();
        if (winner) {
            reset();
        }
  }
}

board.addEventListener('click', fillBoard)
restard.addEventListener('click', reset)

function checkWinner() {

  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  
  const boardItems = document.querySelectorAll('.board_item');

  
  for (let combination of winningCombinations) {
    const [a, b, c] = combination;

    
    const cellA = boardItems[a].querySelector('.cross') || boardItems[a].querySelector('.circle');
    const cellB = boardItems[b].querySelector('.cross') || boardItems[b].querySelector('.circle');
    const cellC = boardItems[c].querySelector('.cross') || boardItems[c].querySelector('.circle');

    
    if (cellA && cellB && cellC) {
      const classA = cellA.classList.contains('cross') ? 'cross' : 'circle';
      const classB = cellB.classList.contains('cross') ? 'cross' : 'circle';
      const classC = cellC.classList.contains('cross') ? 'cross' : 'circle';

      if (classA === classB && classB === classC) {
        
        const winner = classA === 'cross' ? 'X' : 'O';
        alert(`¡El ganador es ${winner}!`);
        return winner;
      }
    }
  }

  
  return null;
}

