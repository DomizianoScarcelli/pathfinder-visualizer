class Node {
	constructor(x, y, prec = undefined, dist = Infinity) {
		this.x = x;
		this.y = y;
		this.dist = dist;
		this.prec = prec;
	}
}

let WALL = "wall";
let START = "start";
let END = "end";

let start = new Node(500, 500, undefined, 0);
let end = new Node(20, 20);
let wall = [];
let nodes = [];
let clickMode = WALL;

let startImage;
function preload() {
	startImage = loadImage("./assets/arrow-circle-right-solid.svg");
	endImage = loadImage("./assets/flag-solid.svg");
}

function setup() {
	var canvas = createCanvas(1600, 700);
	canvas.parent("canvas-container");

	//draws wall (empty at the beginning)
	push();
	fill("#a7a5c6");
	stroke(0, 0, 0);
	strokeWeight(1);
	wall.forEach((elem) => {
		square(elem.x, elem.y, 20);
	});

	pop();
	//Set up the nodes
	for (var y = 0; y < canvas.height / 20; y++) {
		for (var x = 0; x < canvas.width / 20; x++) {
			let node = new Node(x * 20, y * 20, undefined, Infinity);
			if (node.x == start.x && node.y == start.y) {
				nodes.push(start);
			} else if (node.x == end.x && node.y == end.y) {
				nodes.push(end);
			} else {
				nodes.push(node);
			}
		}
	}
	image(startImage, start.x, start.y, 20, 20);
	image(endImage, end.x, end.y, 20, 20);
	fill("#242423");
	// draw grid
	for (var x = 0; x < width; x += 20) {
		for (var y = 0; y < height; y += 20) {
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

function setStartPoint() {
	clickMode = START;
}

function setEndPoint() {
	clickMode = END;
}

function setWall() {
	clickMode = WALL;
}
