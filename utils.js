$(document).ready(function () {
	/**
	 * Da migliorare assolutamente sta cosa. Non so perchè ma non funziona con un for loop
	 */
	let start = document.getElementById("start");
	let finish = document.getElementById("finish");
	let erase = document.getElementById("erase");
	let wall = document.getElementById("wall");
	let undo = document.getElementById("undo");
	let redo = document.getElementById("redo");
	let play = document.getElementById("play");

	wall.style.backgroundColor = "#464746";

	start.addEventListener("click", () => {
		resetToolColors();
		start.style.backgroundColor = "#464746";
	});

	finish.addEventListener("click", () => {
		resetToolColors();
		finish.style.backgroundColor = "#464746";
	});
	erase.addEventListener("click", () => {
		resetToolColors();
		erase.style.backgroundColor = "#464746";
	});
	wall.addEventListener("click", () => {
		resetToolColors();
		wall.style.backgroundColor = "#464746";
	});
	undo.addEventListener("click", () => {
		resetToolColors();
		undo.style.backgroundColor = "#464746";
	});
	redo.addEventListener("click", () => {
		resetToolColors();
		redo.style.backgroundColor = "#464746";
	});
	// play.addEventListener("click", () => {
	// 	resetToolColors();
	// 	play.style.backgroundColor = "#464746";
	// });
});

function resetToolColors() {
	for (item of document.getElementsByClassName("toolbar-button")) {
		item.style.backgroundColor = "#333533";
	}
}

function drawWall() {
	setTimeout(() => {
		push();
		fill("#a7a5c6");
		stroke(0, 0, 0);
		strokeWeight(1);
		clickedX = mouseX - (mouseX % globalDim);
		clickedY = mouseY - (mouseY % globalDim);
		if (!((clickedX == start.x && clickedY == start.y) || (clickedX == end.x && clickedY == end.y))) {
			wall.push(nodes.find((element) => element.x == clickedX && element.y == clickedY));
			square(clickedX, clickedY, globalDim);
		}
		pop();
	});
}

function eraseWall() {
	//TODO forse si potrebbe migliorare sta cosa
	clickedX = mouseX - (mouseX % globalDim);
	clickedY = mouseY - (mouseY % globalDim);
	wall = wall.filter((elem) => elem.x != clickedX || elem.y != clickedY);
	setup();
}

function drawStart() {
	push();
	fill("beige");
	square(start.x, start.y, globalDim);
	clickedX = mouseX - (mouseX % globalDim);
	clickedY = mouseY - (mouseY % globalDim);
	start = new Node(clickedX, clickedY, undefined, 0);
	nodes = [];
	setup();
	// image(startImage, clickedX, clickedY, 20, 20);
	// nodes.splice(nodes.indexOf(start), 1);
	// start = new Node(clickedX, clickedY, undefined, 0);
	// nodes.push(start);
	fill("#242423");
	pop();
}

function drawEnd() {
	push();
	fill("beige");
	square(end.x, end.y, globalDim);
	clickedX = mouseX - (mouseX % globalDim);
	clickedY = mouseY - (mouseY % globalDim);
	end = new Node(clickedX, clickedY);
	nodes = [];
	setup();
	// image(endImage, clickedX, clickedY, 20, 20);
	// nodes.splice(nodes.indexOf(end), 1);
	// end = new Node(clickedX, clickedY);
	// nodes.push(end);
	fill("#242423");
	pop();
}

function showPath() {
	push();
	fill("#f5cb5c");
	let node = end;
	if (node.prec != undefined) {
		while (node != undefined) {
			if (!(node.x == start.x && node.y == start.y) && !(node.x == end.x && node.y == end.y)) {
				square(node.x, node.y, globalDim);
			}
			node = node.prec;
		}
	}
	pop();
}

function adjacent(node) {
	let adj = [];
	let adjNode = undefined;

	adjNode = nodes.find((element) => element.x == node.x - globalDim && element.y == node.y);
	if (adjNode != undefined) {
		adj.push(adjNode);
	}

	adjNode = nodes.find((element) => element.x == node.x + globalDim && element.y == node.y);
	if (adjNode != undefined) {
		adj.push(adjNode);
	}

	adjNode = nodes.find((element) => element.x == node.x && element.y == node.y - globalDim);
	if (adjNode != undefined) {
		adj.push(adjNode);
	}

	adjNode = nodes.find((element) => element.x == node.x && element.y == node.y + globalDim);
	if (adjNode != undefined) {
		adj.push(adjNode);
	}
	return adj.filter((elem) => !wall.find((wallElem) => elem.x == wallElem.x && elem.y == wallElem.y));
}
