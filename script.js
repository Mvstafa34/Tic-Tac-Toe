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
            tableHTML += `<td>${value ? (value === 'cross' ? 'X' : 'O') : ''}</td>`;
        }
        tableHTML += '</tr>';
    }

    tableHTML += '</table>';
    content.innerHTML = tableHTML;
}

