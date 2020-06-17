let i = 0;
let w = 10;
// this array keeps track of the current state of items in the array -1 nothing 0 is a pivot and 1 is an item beling moved
let states = [];

function setup() {
	//set the hiehgt and width for the canvas to draw on~ full screen would be window W/H
	createCanvas(800, 600);
	// creates an array the size = to  width(of canvas)/w
	values = new Array(floor(width / w));
	//loop thought the size of the array to add random values. and indiex = to i
	for (let i = 0; i < values.length; i++) {
		values[i] = random(height);
		states[i] = -1;
	}
	frameRate(5);
	//calls the quicksort algo 
	quickSort(values, 0, values.length - 1)
}

async function quickSort(arr, start, end) {
	if (start >= end) {
		return;
	}
	let index = await parttion(arr, start, end);
	states[index] = -1;

	await Promise.all([
		quickSort(arr, start, index - 1),
		quickSort(arr, index + 1, end)
	]);

}
async function parttion(arr, start, end) {

	for (let i = start; i < end; i++) {
		states[i] = 1;
	}

	let pivotIndex = start;
	let pivotValue = arr[end];
	states[pivotIndex] = 0;
	for (let i = start; i < end; i++) {

		if (arr[i] < pivotValue) {
			await swap(arr, i, pivotIndex);
			states[pivotIndex] = -1;
			pivotIndex++;
			states[pivotIndex] = 0;
		}
	}
	await swap(arr, pivotIndex, end);
	for (let i = start; i < end; i++) {
		if (i != pivotIndex) {
			states[i] = -1;
		}
	}
	return pivotIndex;
}


function draw() {
	background(51);

	//draws in constant time the array valus as a rect and color depening on state. 
	for (let i = 0; i < values.length; i++) {
		noStroke();
		//fill(255);
		if (states[i] == 0) {
			fill('#E0777D');
		} else if (states[i] == 1) {
			fill('#D6FFB7');
		} else {
			fill(255);
		}
		rect(i * w, height - values[i], w, values[i]);
	}

}
//function to swap two elements in an array. 
async function swap(arr, a, b) {
	await sleep(50);
	let temp = arr[a];
	arr[a] = arr[b];
	arr[b] = temp;
}

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}