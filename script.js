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

        // Wechseln Sie den aktuellen Spieler für den nächsten Zug
        currentPlayer = (currentPlayer === 'cross') ? 'circle' : 'cross';
    }
}

// Restliche Funktionen bleiben unverändert




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
