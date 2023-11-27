let fields = [
    null,
    null,
    'circle',
    null,
    'cross',
    null,
    null,
    null,
    null
]


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
                if (value === 'cross') {
                    tableHTML += `<td>${generateAnimatedCross()}</td>`;
                } else if (value === 'circle') {
                    tableHTML += `<td>${generateAnimatedCircle()}</td>`;
                } else {
                    tableHTML += '<td></td>';
                }
            } else {
                tableHTML += '<td></td>';
            }
        }
        tableHTML += '</tr>';
    }

    tableHTML += '</table>';
    content.innerHTML = tableHTML;
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
