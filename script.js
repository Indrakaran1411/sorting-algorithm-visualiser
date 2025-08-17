let values = [];
let arraySize = 20;
let speed = 100;
let sorting = false;
let paused = false;
let sortType = null;
let i = 0, j = 0;
let comparisons = 0;
let swaps = 0;
let canvas;
let quickSortStack = [];

function setup() {
    canvas = createCanvas(min(windowWidth - 20, 800), 400).parent('controls');
    resetArray();
    textSize(16);
}

function windowResized() {
    resizeCanvas(min(windowWidth - 20, 800), 400);
}

function resetArray() {
    values = [];
    for (let i = 0; i < arraySize; i++) {
        values.push(random(10, 350));
    }
    i = 0;
    j = 0;
    comparisons = 0;
    swaps = 0;
    sorting = false;
    paused = false;
    quickSortStack = [];
    updateStatus("Ready");
    updateComplexity("N/A", "N/A");
}

function draw() {
    background(255);
    drawBars();
    if (sorting && !paused) {
        if (sortType === 'bubble') bubbleSortStep();
        else if (sortType === 'selection') selectionSortStep();
        else if (sortType === 'insertion') insertionSortStep();
        else if (sortType === 'quick') quickSortStep();
    }
    displayStats();
}

function drawBars() {
    let barWidth = width / values.length;
    for (let k = 0; k < values.length; k++) {
        if (sorting && !paused) {
            if (k === i || k === j) fill(255, 165, 0); // Orange for compared
            else if (sortType === 'quick' && k === quickSortStack[quickSortStack.length - 1]?.pivot) fill(255, 0, 0); // Red for pivot
            else if (sortType === 'insertion' && k <= i) fill(0, 255, 0); // Green for sorted
            else fill(0, 128, 255); // Blue for unsorted
        } else if (!sorting && isSorted()) {
            fill(0, 255, 0); // Green when sorted
        } else {
            fill(0, 128, 255); // Blue for unsorted
        }
        rect(k * barWidth, height - values[k], barWidth - 2, values[k]);
    }
}

function displayStats() {
    fill(0);
    text(`Comparisons: ${comparisons}`, 10, 20);
    text(`Swaps: ${swaps}`, 10, 40);
}

function isSorted() {
    for (let k = 0; k < values.length - 1; k++) {
        if (values[k] > values[k + 1]) return false;
    }
    return true;
}

async function bubbleSortStep() {
    updateComplexity("O(n²)", "O(1)");
    if (i < values.length - 1) {
        if (j < values.length - 1 - i) {
            comparisons++;
            if (values[j] > values[j + 1]) {
                swaps++;
                let temp = values[j];
                values[j] = values[j + 1];
                values[j + 1] = temp;
            }
            j++;
        } else {
            j = 0;
            i++;
        }
        await sleep(speed);
    } else {
        sorting = false;
        updateStatus("Sorted!");
    }
}

async function selectionSortStep() {
    updateComplexity("O(n²)", "O(1)");
    if (i < values.length - 1) {
        let minIdx = i;
        for (let k = i + 1; k < values.length; k++) {
            comparisons++;
            if (values[k] < values[minIdx]) minIdx = k;
        }
        if (minIdx !== i) {
            swaps++;
            let temp = values[i];
            values[i] = values[minIdx];
            values[minIdx] = temp;
        }
        i++;
        await sleep(speed);
    } else {
        sorting = false;
        updateStatus("Sorted!");
    }
}

async function insertionSortStep() {
    updateComplexity("O(n²)", "O(1)");
    if (i < values.length) {
        let key = values[i];
        j = i - 1;
        while (j >= 0 && values[j] > key) {
            comparisons++;
            swaps++;
            values[j + 1] = values[j];
            j--;
            await sleep(speed / 2);
        }
        values[j + 1] = key;
        i++;
        await sleep(speed);
    } else {
        sorting = false;
        updateStatus("Sorted!");
    }
}

async function quickSortStep() {
    updateComplexity("O(n log n) average", "O(log n)");
    if (quickSortStack.length === 0 && i === 0) {
        quickSortStack.push({ left: 0, right: values.length - 1 });
    }
    if (quickSortStack.length > 0) {
        let { left, right, pivot } = quickSortStack[quickSortStack.length - 1];
        if (!pivot) {
            if (left < right) {
                quickSortStack[quickSortStack.length - 1].pivot = right;
                i = left;
                j = left;
            } else {
                quickSortStack.pop();
                await sleep(speed);
                return;
            }
        }
        if (j < right) {
            comparisons++;
            if (values[j] < values[right]) {
                if (i !== j) {
                    swaps++;
                    let temp = values[i];
                    values[i] = values[j];
                    values[j] = temp;
                }
                i++;
            }
            j++;
        } else {
            swaps++;
            let temp = values[i];
            values[i] = values[right];
            values[right] = temp;
            quickSortStack.pop();
            if (i - 1 > left) quickSortStack.push({ left, right: i - 1 });
            if (i + 1 < right) quickSortStack.push({ left: i + 1, right });
        }
        await sleep(speed);
    } else {
        sorting = false;
        updateStatus("Sorted!");
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function startSort(type) {
    if (!sorting && type) {
        sortType = type;
        sorting = true;
        paused = false;
        i = 0;
        j = 0;
        comparisons = 0;
        swaps = 0;
        quickSortStack = [];
        resetArray();
        updateStatus(`Running ${type.charAt(0).toUpperCase() + type.slice(1)} Sort`);
    }
}

function togglePause() {
    if (sorting) {
        paused = !paused;
        updateStatus(paused ? "Paused" : `Running ${sortType.charAt(0).toUpperCase() + type.slice(1)} Sort`);
    }
}

function updateSize(size) {
    arraySize = parseInt(size);
    document.getElementById('sizeValue').innerText = size;
    if (!sorting) resetArray();
}

function updateSpeed(spd) {
    speed = parseInt(spd);
    document.getElementById('speedValue').innerText = spd;
}

function updateStatus(msg) {
    document.getElementById('status').innerText = `Status: ${msg}`;
}

function updateComplexity(time, space) {
    document.getElementById('complexity').innerText = `Time Complexity: ${time} | Space Complexity: ${space}`;
}

function keyPressed() {
    if (key === 'B') startSort('bubble');
    else if (key === 'S') startSort('selection');
    else if (key === 'I') startSort('insertion');
    else if (key === 'Q') startSort('quick');
    else if (key === 'P') togglePause();
    else if (key === 'R') resetArray();
}