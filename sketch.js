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

function setup() {
	createCanvas(1400, 800);
	fill(0, 200, 0);
	rect(start.x, start.y, 20);
	fill(200, 0, 0);
	rect(end.x, end.y, 20);
	fill(50, 50, 50);
}

function mouseClicked() {
	setTimeout(() => {
		push();
		fill(25, 100, 122);
		clickedX = mouseX - (mouseX % 20);
		clickedY = mouseY - (mouseY % 20);
		console.log(clickedX, clickedY);
		wall.push(nodes.find((element) => element.x == clickedX && element.y == clickedY));
		square(clickedX, clickedY, 20);
		pop();
	});
}

function mouseDragged() {
	setTimeout(() => {
		push();
		fill(25, 100, 122);
		clickedX = mouseX - (mouseX % 20);
		clickedY = mouseY - (mouseY % 20);
		console.log(clickedX, clickedY);
		wall.push(nodes.find((element) => element.x == clickedX && element.y == clickedY));
		square(clickedX, clickedY, 20);
		pop();
	});
}

function execute() {
	dijkstra();
	showPath();
}

function showPath() {
	setTimeout(() => {
		push();
		fill(0, 0, 200);
		let node = end;
		if (node.prec != undefined) {
			while (node != undefined) {
				if (!(node.x == start.x && node.y == start.y)) square(node.x, node.y, 20);
				node = node.prec;
			}
		}
		pop();
	});
}

function dijkstra() {
	nodes = nodes.filter((elem) => !wall.includes(elem));
	while (nodes.length != 0) {
		var u = nodes.reduce((prev, curr) => (prev.dist < curr.dist ? prev : curr));
		if (u.prec == end) nodes = [];
		nodes = nodes.filter((elem) => elem != u);
		adjacent(u).forEach((v) => {
			if (!(v.x == end.x && v.y == end.y)) {
				setTimeout(() => {
					square(v.x, v.y, 20);
				}, 5);
			}
			let alt = u.dist + 1;
			if (alt < v.dist) {
				v.dist = alt;
				v.prec = u;
			}
		});
	}
}

function adjacent(node) {
	let adj = [];
	let adjNode = undefined;

	adjNode = nodes.find((element) => element.x == node.x - 20 && element.y == node.y);
	if (adjNode != undefined) {
		adj.push(adjNode);
	}

	adjNode = nodes.find((element) => element.x == node.x + 20 && element.y == node.y);
	if (adjNode != undefined) {
		adj.push(adjNode);
	}

	adjNode = nodes.find((element) => element.x == node.x && element.y == node.y - 20);
	if (adjNode != undefined) {
		adj.push(adjNode);
	}

	adjNode = nodes.find((element) => element.x == node.x && element.y == node.y + 20);
	if (adjNode != undefined) {
		adj.push(adjNode);
	}

	return adj.filter((elem) => !wall.includes(elem));
}
