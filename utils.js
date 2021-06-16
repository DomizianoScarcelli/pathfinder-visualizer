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

function showPath() {
	push();
	fill("#f5cb5c");
	let node = end;
	if (node.prec != undefined) {
		while (node != undefined) {
			if (!(node.x == start.x && node.y == start.y) && !(node.x == end.x && node.y == end.y)) square(node.x, node.y, 20);
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
