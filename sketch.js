class Node {
	constructor(x, y, prec, dist = Infinity) {
		this.x = x;
		this.y = y;
		this.dist = dist;
		this.prec = prec;
	}
}
let start = new Node(500, 500, undefined, 0);
let end = new Node(700, 500);

var queue = new PriorityQueue({
	comparator: (a, b) => {
		return a.dist - b.dist;
	},
});

var nodes = [];

for (var y = 0; y < 80; y++) {
	for (var x = 0; x < 150; x++) {
		let node = new Node(x * 10, y * 10, undefined, Infinity);

		if (node.x == start.x && node.y == start.y) {
			queue.queue(start);
			nodes.push(start);
		} else if (node.x == end.x && node.y == end.y) {
			queue.queue(end);
			nodes.push(end);
		} else {
			queue.queue(node);
			nodes.push(node);
		}
	}
}

// shortestPath();

let S = [];
let node = end;
if (node.prec != undefined) {
	while (node != undefined) {
		S.push(node);
		node = node.prec;
	}
}

function setup() {
	createCanvas(1500, 800);
}

function draw() {
	fill(0, 200, 0);
	rect(start.x, start.y, 10);
	fill(200, 0, 0);
	rect(end.x, end.y, 10);
	// S.forEach((elem) => {
	// 	if (elem.prec != undefined) {
	// 		fill(50);
	// 		animate(elem.x, elem.y, 10);
	// 	}
	// });

	nodes.forEach((elem) => {
		if (elem.prec != undefined) {
			fill(50);
			square(elem.x, elem.y, 10);
		}
	});
}

function mouseDragged() {
	dim = 10;
	fill(51);
	x = mouseX - (mouseX % dim);
	y = mouseY - (mouseY % dim);
	animate(x, y, dim);
}

function mouseClicked() {
	dim = 10;
	fill(51);
	x = mouseX - (mouseX % dim);
	y = mouseY - (mouseY % dim);
	animate(x, y, dim);
}

function animate(x, y, dim) {
	for (let i = 0; i < dim; i++) {
		setTimeout(() => {
			fill(51);
			square(x, y, i);
		}, i * 5);
	}
}

function shortestPath() {
	let visited = [];
	while (queue.length != 0) {
		var u = queue.dequeue();
		visited.push(u);
		adjacent(u).forEach((v) => {
			if (!visited.includes(v)) {
				let alt = u.dist + 1;
				if (alt < v.dist) {
					v.dist = alt;
					v.prec = u;
				}
			}
		});
	}
	console.log(visited);
}

function adjacent(node) {
	let adj = [];
	let adjNode = undefined;

	adjNode = nodes.find((element) => element.x == node.x - 10 && element.y == node.y);
	if (adjNode != undefined) {
		adj.push(adjNode);
	}

	adjNode = nodes.find((element) => element.x == node.x + 10 && element.y == node.y);
	if (adjNode != undefined) {
		adj.push(adjNode);
	}

	adjNode = nodes.find((element) => element.x == node.x && element.y == node.y - 10);
	if (adjNode != undefined) {
		adj.push(adjNode);
	}

	adjNode = nodes.find((element) => element.x == node.x && element.y == node.y + 10);
	if (adjNode != undefined) {
		adj.push(adjNode);
	}

	return adj;
}
