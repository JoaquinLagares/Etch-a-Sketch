const grid = document.querySelector('#grid')
const container = document.querySelector('#container')
const input = document.createElement('input')
const buttons = document.createElement('div')
const black = document.createElement('button')
const multicolor = document.createElement('button')
const scaleGray = document.createElement('button')
const restart = document.createElement('button')
let modo = 'black'


black.textContent = 'Black';
black.id = 'Black'
multicolor.textContent = 'Multicolor'
multicolor.id = 'Multicolor'
scaleGray.textContent = 'Gray-scale'
scaleGray.id = 'Gray-scale'
restart.textContent = 'Restart'
restart.classList.add('Restart')


let modoActual = () => {
    buttons.addEventListener('click', (event) => {
        let target = event.target.id;

        if (!['Black', 'Multicolor', 'Gray-scale', 'RestartS'].includes(target)) {
            console.log('skere')
            return
        }
        else
            switch (target) {
                case 'Black':
                    modo = 'black'
                    break
                case 'Multicolor':
                    modo = 'multicolor'
                    break
                case 'Gray-scale':
                    modo = 'gray-scale'
                    break
                case 'Restart':
                    modo = 'white'
                    break
            }
    })
}



//buttons for color choosing


buttons.appendChild(black)
buttons.appendChild(multicolor)
buttons.appendChild(scaleGray)
buttons.appendChild(restart)

input.type = 'range'
input.min = '2'
input.max = '100'
input.value = '16'
grid.style.width = '400px'
grid.style.height = '400px'


container.appendChild(buttons)
container.appendChild(input)
input.addEventListener('input', () => {
    createGrid(input.value);
})


let createCell = (i, ii, cellSize) => {
    const cell = document.createElement('div')
    cell.style.width = `${cellSize}px`
    cell.style.height = `${cellSize}px`
    cell.classList.add('cell')
    cell.id = `${i}-${ii}`
    cell.dataset.count = 0
    let paso = Number(cell.dataset.count)
    let decremento = 255 / 10
    cell.addEventListener('mouseenter', () => {
        modoActual()
        if (modo === 'black')
            cell.style.backgroundColor = `black`
        else if (modo === 'multicolor') {
            let r = Math.floor(Math.random() * 256)
            let g = Math.floor(Math.random() * 256)
            let b = Math.floor(Math.random() * 256)
            cell.style.backgroundColor = `rgb(${r}, ${g}, ${b})`
        } else if ('gray-scale') {
            paso++
            cell.dataset.count = paso
            let gris = Math.max(255 - paso * decremento, 0)
            cell.style.backgroundColor = `rgb(${gris}, ${gris}, ${gris})`
        }
    })

    return cell
}



let createGrid = (size) => {
    grid.innerHTML = '';
    const cellSize = 400 / size;
    for (let i = 0; i < size; i++) {
        const rowDiv = document.createElement('div')
        rowDiv.style.display = "flex";

        for (let ii = 0; ii < size; ii++) {
            rowDiv.appendChild(createCell(i, ii, cellSize))
        }

        grid.appendChild(rowDiv)
    }

}

createGrid(parseInt(input.value))


