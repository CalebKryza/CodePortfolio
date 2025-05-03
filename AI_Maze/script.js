const width = 10;
const height = 10;
let maze = generateMaze(width, height);
displayMaze(maze);

// Agent settings
const actions = ['up', 'down', 'left', 'right'];
const qTable = {};
const LearningRate = 0.1;    // Learning rate
const DiscountFactor = 0.9;    // Discount factor
let ExplorationRate = 0.2;    // Exploration rate

let startX = 0, startY = 0;
let goalX = 9, goalY = 7; // (x, y) of the goal (3)

// Identify start and goal positions
for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
        if (maze[y][x] === 2) {
            startX = x;
            startY = y;
        }
        if (maze[y][x] === 3) {
            goalX = x;
            goalY = y;
        }
    }
}

function getQ(state, action) {
    const key = `${state.x},${state.y}`;
    if (!qTable[key]) qTable[key] = {};
    if (qTable[key][action] === undefined) qTable[key][action] = 0;
    return qTable[key][action];
}

function setQ(state, action, value) {
    const key = `${state.x},${state.y}`;
    if (!qTable[key]) qTable[key] = {};
    qTable[key][action] = value;
}

function chooseAction(state) {
    if (Math.random() < ExplorationRate) {
        return actions[Math.floor(Math.random() * actions.length)];
    }

    let maxQ = -Infinity;
    let bestActions = [];
    for (const action of actions) {
        const q = getQ(state, action);
        if (q > maxQ) {
            maxQ = q;
            bestActions = [action];
        } else if (q === maxQ) {
            bestActions.push(action);
        }
    }
    return bestActions[Math.floor(Math.random() * bestActions.length)];
}

function move(state, action) {
    let { x, y } = state;
    if (action === 'up') y--;
    else if (action === 'down') y++;
    else if (action === 'left') x--;
    else if (action === 'right') x++;

    if (x < 0 || y < 0 || x >= width || y >= height || maze[y][x] === 1) {
        return { x: state.x, y: state.y, reward: -10 }; // invalid
    }

    if (x === goalX && y === goalY) {
        return { x, y, reward: 100 };
    }

    return { x, y, reward: -1 };
}

function updateAgentPositionVisual(x, y) {
    document.querySelectorAll(".cell").forEach(cell => {
        cell.classList.remove("agent");
    });

    const cell = document.querySelector(`.cell[data-x="${x}"][data-y="${y}"]`);
    if (cell) cell.classList.add("agent");
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function runEpisode(episodeNum) {
    let state = { x: startX, y: startY };
    let steps = 0;

    while (!(state.x === goalX && state.y === goalY) && steps < 100) {
        updateAgentPositionVisual(state.x, state.y);
        const action = chooseAction(state);
        const result = move(state, action);
        const nextState = { x: result.x, y: result.y };

        const oldQ = getQ(state, action);
        const maxNextQ = Math.max(...actions.map(a => getQ(nextState, a)));
        const newQ = oldQ + LearningRate * (result.reward + DiscountFactor * maxNextQ - oldQ);
        setQ(state, action, newQ);

        state = nextState;
        steps++;
        await sleep(150);
    }

    document.getElementById("episode-counter").textContent = episodeNum;
}

async function trainAgent(episodes = 100) {
    for (let i = 1; i <= episodes; i++) {
        await runEpisode(i);
    }
}

async function runBestPath() {
    let state = { x: startX, y: startY };
    let steps = 0;

    while (!(state.x === goalX && state.y === goalY) && steps < 100) {
        updateAgentPositionVisual(state.x, state.y);

        const key = `${state.x},${state.y}`;
        const qValues = qTable[key];

        if (!qValues) break;

        // Pick best action
        let bestAction = null;
        let maxQ = -Infinity;
        for (const action of actions) {
            const q = qValues[action] ?? -Infinity;
            if (q > maxQ) {
                maxQ = q;
                bestAction = action;
            }
        }

        if (!bestAction) break;

        const result = move(state, bestAction);
        state = { x: result.x, y: result.y };
        steps++;

        await sleep(150);
    }
}

// Button events
document.getElementById("start-btn").addEventListener("click", () => {
    trainAgent(100);
});

document.getElementById("reset-btn").addEventListener("click", () => {
    maze = generateMaze(width, height);
    displayMaze(maze);
    location.reload();
});

document.getElementById("run-btn").addEventListener("click", () => {
    runBestPath();
});

