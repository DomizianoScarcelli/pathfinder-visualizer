class Node {
	constructor(x, y, prec, dist = Infinity) {
		this.x = x;
		this.y = y;
		this.dist = dist;
		this.prec = prec;
	}
}
let start = new Node(500, 500, undefined, 0);
let end = new Node(10, 10);

var nodes = [];

for (var y = 0; y < 80; y++) {
	for (var x = 0; x < 150; x++) {
		let node = new Node(x * 10, y * 10, undefined, Infinity);

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
	createCanvas(1500, 800);
	fill(0, 200, 0);
	rect(start.x, start.y, 10);
	fill(200, 0, 0);
	rect(end.x, end.y, 10);
	fill(50, 50, 50);
}

function execute() {
	dijkstra();
	showPath();
}

function showPath() {
	setTimeout(() => {
		fill(0, 0, 200);
		let node = end;
		if (node.prec != undefined) {
			while (node != undefined) {
				node = node.prec;
				if (!(node.x == start.x && node.y == start.y)) square(node.x, node.y, 10);
			}
		}
	});
}

function dijkstra() {
	while (nodes.length != 0) {
		var u = nodes.reduce((prev, curr) => (prev.dist < curr.dist ? prev : curr));
		if (u.prec == end) nodes = [];
		nodes = nodes.filter((elem) => elem != u);
		adjacent(u).forEach((v) => {
			if (!(v.x == end.x && v.y == end.y)) {
				setTimeout(() => {
					square(v.x, v.y, 10);
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
