let fields = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null
];

let currentPlayer = 'cross'; // Start mit 'cross', kann auch mit 'circle' initialisiert werden
let gameEnded = false; // Neue Variable, um den Spielstatus zu verfolgen

function init() {
    // Call the render function to display the initial state
    render();
}

function render() {
    const content = document.getElementById('content');
    let tableHTML = '<table>';

    for (let i = 0; i < 3; i++) {
        tableHTML += '<tr>';
        for (let j = 0; j < 3; j++) {
            const index = i * 3 + j;
            const value = fields[index];

            if (value) {
                tableHTML += `<td onclick="handleClick(${index})">${generateSymbolHTML(value)}</td>`;
            } else {
                tableHTML += `<td onclick="handleClick(${index})"></td>`;
            }
        }
        tableHTML += '</tr>';
    }

    tableHTML += '</table>';
    content.innerHTML = tableHTML;

    // Überprüfen, ob das Spiel vorbei ist
    if (isGameOver()) {
        // Das Spiel ist vorbei, zeichne die Gewinnlinie
        drawWinningLine();
        gameEnded = true; // Das Spiel ist nicht mehr spielbar
    }
}

function generateSymbolHTML(symbol) {
    if (symbol === 'cross') {
        return generateAnimatedCross();
    } else if (symbol === 'circle') {
        return generateAnimatedCircle();
    } else {
        return '';
    }
}

function handleClick(index) {
    if (gameEnded) {
        // Das Spiel ist vorbei, keine weiteren Züge zulassen
        return;
    }

    const clickedCell = fields[index];
    if (!clickedCell) {
        // Generate the symbol HTML based on the current player
        const symbolHTML = generateSymbolHTML(currentPlayer);

        // Insert the generated symbol HTML into the clicked cell
        const cell = document.getElementsByTagName('td')[index];
        cell.innerHTML = symbolHTML;

        // Remove the onclick function to prevent further clicks on this cell
        cell.onclick = null;

        // Update the fields array
        fields[index] = currentPlayer;

        // Überprüfen, ob das Spiel vorbei ist
        if (isGameOver()) {
            // Das Spiel ist vorbei, zeichne die Gewinnlinie
            drawWinningLine();
            gameEnded = true; // Das Spiel ist nicht mehr spielbar
        } else {
            // Wechseln Sie den aktuellen Spieler für den nächsten Zug
            currentPlayer = (currentPlayer === 'cross') ? 'circle' : 'cross';
        }
    }
}

function isGameOver() {
    // Überprüfen Sie alle möglichen Gewinnkombinationen
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontale Reihen
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertikale Reihen
        [0, 4, 8], [2, 4, 6] // Diagonale Reihen
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
            return true; // Das Spiel ist vorbei, es gibt einen Gewinner
        }
    }

    // Überprüfen, ob es noch leere Zellen gibt
    return fields.includes(null) ? false : true;
}

function drawWinningLine() {
    // Finden Sie die Gewinnkombination
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontale Reihen
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertikale Reihen
        [0, 4, 8], [2, 4, 6] // Diagonale Reihen
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
            // Überprüfen Sie die Ausrichtung der Linie (horizontal, vertikal oder diagonal)
            const isHorizontal = a % 3 === 0 && b === a + 1 && c === a + 2;
            const isVertical = a < 3 && b === a + 3 && c === a + 6;
            const isDiagonal = (a === 0 && c === 8) || (a === 2 && c === 6);

            // Erstellen Sie das 'winning-line'-Element
            const line = document.createElement('div');
            line.className = 'winning-line';

            // Zwischenschritte zur Erfassung der Zeile oder Reihe
            let rowOrColumn;
            if (isHorizontal) {
                rowOrColumn = Math.floor(a / 3) + 1; // 1, 2, 3 für Zeilen
            } else if (isVertical) {
                rowOrColumn = a % 3 + 1; // 1, 2, 3 für Spalten
            }

            console.log(`Gewonnen in ${isHorizontal ? 'Zeile' : 'Reihe'} ${rowOrColumn}`);

            // Bestimmen Sie die Position und Größe der Linie basierend auf der Ausrichtung
            if (isHorizontal) {
                line.style.width = '100%';
                line.style.height = '10px';
                if (rowOrColumn == 1) {
                    line.style.top = '16.66%';
                } else if (rowOrColumn == 2) {
                    line.style.top = '50%';
                } else if (rowOrColumn == 3) {
                    line.style.top = '83.33%';
                }
            } else if (isVertical) {
                line.style.width = '10px';
                line.style.height = '100%';
                if (rowOrColumn == 1) {
                    line.style.left = '16.66%';
                } else if (rowOrColumn == 2) {
                    line.style.left = '50%';
                } else if (rowOrColumn == 3) {
                    line.style.left = '83.33%';
                }
            } else if (isDiagonal) {
                // Diagonale Linie von links oben nach rechts unten oder von rechts oben nach links unten
                line.style.width = 'calc(100% * 1.414)';
                line.style.height = '10px';
                line.style.transformOrigin = (a === 0 && c === 8) ? 'left top' : 'right top';
                line.style.transform = (a === 0 && c === 8) ? 'rotate(45deg)' : 'rotate(-45deg) translateX(-150px) translateY(-150px)';
            }

            // Fügen Sie die 'winning-line' dem 'content'-Element hinzu
            const content = document.getElementById('content');
            content.insertBefore(line, content.firstChild); // Fügen Sie die Linie vor dem ersten Kind ein
            return;
        }
    }
}


function generateAnimatedCircle() {
    const circleHTML = `
        <svg width="70" height="70" xmlns="http://www.w3.org/2000/svg">
            <circle id="animatedCircle" cx="35" cy="35" r="0" fill="transparent" stroke="#00B0EF" stroke-width="5">
                <animate attributeName="r" values="0;30" dur="0.125s" keyTimes="0;1" begin="0s" repeatCount="1" fill="freeze" />
                <animate attributeName="stroke-dasharray" values="0 0; 188.495559 0" dur="0.5s" keyTimes="0;1" begin="0s" repeatCount="1" fill="freeze" />
            </circle>
        </svg>
    `;
    return circleHTML;
}


function generateAnimatedCross() {
    const crossHTML = `
        <svg width="70" height="70" xmlns="http://www.w3.org/2000/svg">
            <line x1="10" y1="10" x2="60" y2="60" stroke="#FFC000" stroke-width="5">
                <animate attributeName="x2" values="10;60" dur="0.125s" keyTimes="0;1" begin="0s" repeatCount="1" fill="freeze" />
                <animate attributeName="y2" values="10;60" dur="0.125s" keyTimes="0;1" begin="0s" repeatCount="1" fill="freeze" />
            </line>
            <line x1="60" y1="10" x2="10" y2="60" stroke="#FFC000" stroke-width="5">
                <animate attributeName="x2" values="60;10" dur="0.125s" keyTimes="0;1" begin="0s" repeatCount="1" fill="freeze" />
                <animate attributeName="y2" values="10;60" dur="0.125s" keyTimes="0;1" begin="0s" repeatCount="1" fill="freeze" />
            </line>
        </svg>
    `;
    return crossHTML;
}
