function drawWall() {
	setTimeout(() => {
		push();
		fill("#a7a5c6");
		stroke(0, 0, 0);
		strokeWeight(1);
		clickedX = mouseX - (mouseX % 20);
		clickedY = mouseY - (mouseY % 20);
		if (!((clickedX == start.x && clickedY == start.y) || (clickedX == end.x && clickedY == end.y))) {
			wall.push(nodes.find((element) => element.x == clickedX && element.y == clickedY));
			square(clickedX, clickedY, 20);
		}
		pop();
	});
}

function drawStart() {
	push();
	noStroke();
	fill("beige");
	square(start.x, start.y, 20);
	clickedX = mouseX - (mouseX % 20);
	clickedY = mouseY - (mouseY % 20);
	image(startImage, clickedX, clickedY, 20, 20);
	nodes.splice(nodes.indexOf(start), 1);
	start = new Node(clickedX, clickedY, undefined, 0);
	nodes.push(start);
	fill("#242423");
	pop();
}

function drawEnd() {
	push();
	noStroke();
	fill("beige");
	square(end.x, end.y, 20);
	clickedX = mouseX - (mouseX % 20);
	clickedY = mouseY - (mouseY % 20);
	image(endImage, clickedX, clickedY, 20, 20);
	nodes.splice(nodes.indexOf(end), 1);
	end = new Node(clickedX, clickedY);
	nodes.push(end);
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
				square(node.x, node.y, 20);
			}
			node = node.prec;
		}
	}
	pop();
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
