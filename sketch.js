class Node {
	constructor(x, y, prec = undefined, dist = Infinity) {
		this.x = x;
		this.y = y;
		this.dist = dist;
		this.prec = prec;
	}
}
var globalDim = 40;

let WALL = "wall";
let START = "start";
let END = "end";
let ERASE = "erase";

let start = new Node(400, 400, undefined, 0);
let end = new Node(40, 40);
let wall = [];
let nodes = [];
let clickMode = WALL;

let startImage;
function preload() {
	startImage = loadImage("./assets/arrow-circle-right-solid.svg");
	endImage = loadImage("./assets/flag-solid.svg");
}

function setup() {
	var canvas = createCanvas(1600, 800);
	canvas.parent("canvas-container");

	//draws wall (empty at the beginning)
	push();
	fill("#a7a5c6");
	stroke(0, 0, 0);
	strokeWeight(1);
	wall.forEach((elem) => {
		square(elem.x, elem.y, globalDim);
	});

	pop();
	//Set up the nodes
	for (var y = 0; y < canvas.height / globalDim; y++) {
		for (var x = 0; x < canvas.width / globalDim; x++) {
			let node = new Node(x * globalDim, y * globalDim, undefined, Infinity);
			if (node.x == start.x && node.y == start.y) {
				nodes.push(start);
			} else if (node.x == end.x && node.y == end.y) {
				nodes.push(end);
			} else {
				nodes.push(node);
			}
		}
	}
	image(startImage, start.x, start.y, globalDim, globalDim);
	image(endImage, end.x, end.y, globalDim, globalDim);
	fill("#242423");
	// draw grid
	for (var x = 0; x < width; x += globalDim) {
		for (var y = 0; y < height; y += globalDim) {
			stroke("rgba(0%,0%,0%,0.1)");
			strokeWeight(0.1);
			line(x, 0, x, height);
			line(0, y, width, y);
		}
	}
}

function mouseClicked() {
	if (mouseX > 0 && mouseX < canvas.width && mouseY > 0 && mouseY < canvas.height) {
		switch (clickMode) {
			case WALL:
				drawWall();
				break;
			case START:
				drawStart();
				break;
			case END:
				drawEnd();
				break;
			case ERASE:
				eraseWall();
				break;
		}
	}
}

function mouseDragged() {
	mouseClicked();
}

function execute() {
	dijkstra();
	setTimeout(() => {
		showPath();
	});
}
