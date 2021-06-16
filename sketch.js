class Node {
	constructor(x, y, prec = undefined, dist = Infinity) {
		this.x = x;
		this.y = y;
		this.dist = dist;
		this.prec = prec;
	}
}
let start = new Node(500, 500, undefined, 0);
let end = new Node(20, 20);
var wall = [];

var nodes = [];
for (var y = 0; y < 40; y++) {
	for (var x = 0; x < 70; x++) {
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

let startImage;
function preload() {
	startImage = loadImage("./assets/arrow-circle-right-solid.svg");
	endImage = loadImage("./assets/flag-solid.svg");
}

function setup() {
	var canvas = createCanvas(1400, 800);
	canvas.parent("canvas-container");
	// fill(0, 200, 0);
	image(startImage, start.x, start.y, 20, 20);
	// fill(200, 0, 0);
	image(endImage, end.x, end.y, 20, 20);
	fill("#242423");
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
	drawWall();
}

function mouseDragged() {
	drawWall();
}

function execute() {
	dijkstra();
	setTimeout(() => {
		showPath();
	});
}
