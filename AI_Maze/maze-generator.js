function generateMaze(width, height) {
    const maze = [
        [2, 0, 1, 0, 0, 0, 1, 0, 0, 0],
        [1, 0, 1, 0, 1, 1, 1, 1, 1, 0],
        [1, 0, 1, 0, 1, 0, 0, 0, 1, 0],
        [0, 0, 0, 0, 1, 0, 1, 0, 1, 0],
        [0, 1, 1, 0, 1, 0, 1, 1, 1, 0],
        [0, 1, 0, 0, 1, 0, 0, 0, 0, 0],
        [1, 1, 0, 1, 1, 1, 1, 1, 1, 0],
        [0, 0, 0, 0, 0, 0, 0, 1, 0, 3],
        [1, 1, 1, 1, 0, 1, 1, 1, 1, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];
    return maze;
}

function displayMaze(maze) {
    const mazeContainer = document.getElementById("maze-container");
    mazeContainer.innerHTML = '';
    maze.forEach((row, y) => {
        row.forEach((cell, x) => {
            const div = document.createElement("div");
            div.classList.add("cell");
            div.dataset.x = x;
            div.dataset.y = y;

            if (cell === 1) div.classList.add("wall");
            else if (cell === 0) div.classList.add("path");
            else if (cell === 2) div.classList.add("start");
            else if (cell === 3) div.classList.add("end");

            mazeContainer.appendChild(div);
        });
    });
}
