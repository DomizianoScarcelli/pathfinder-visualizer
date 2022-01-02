let mazeWalls = [];
let maze = [];

function prim() {
	maze.push(start);
	mazeWalls.push(getAdjWalls(start));
	while (mazeWalls.length > 0) {
		let currentWall = mazeWalls[0];
		//todo
	}
}

function init() {
	wall = [];
	nodes.filter((elem) => !elem.equals(start) && !elem.equals(end)).forEach((elem) => wall.push(elem));
	setup();
	prim();
}

function getAdjWalls(node) {
	let adj = [];
	let adjNode = undefined;

	adjNode = wall.find((element) => element.x == node.x - globalDim && element.y == node.y);
	if (adjNode != undefined) {
		adj.push(adjNode);
	}

	adjNode = wall.find((element) => element.x == node.x + globalDim && element.y == node.y);
	if (adjNode != undefined) {
		adj.push(adjNode);
	}

	adjNode = wall.find((element) => element.x == node.x && element.y == node.y - globalDim);
	if (adjNode != undefined) {
		adj.push(adjNode);
	}

	adjNode = wall.find((element) => element.x == node.x && element.y == node.y + globalDim);
	if (adjNode != undefined) {
		adj.push(adjNode);
	}
	return adj;
}
