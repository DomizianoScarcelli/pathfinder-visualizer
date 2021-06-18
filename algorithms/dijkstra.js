function dijkstra() {
	nodes = nodes.filter((elem) => !wall.includes(elem));
	while (nodes.length != 0) {
		var u = nodes.reduce((prev, curr) => (prev.dist < curr.dist ? prev : curr));
		if (u.prec != undefined && u.prec.x == end.x && u.prec.y == end.y) nodes = [];
		nodes = nodes.filter((elem) => elem != u); //remove u from nodes
		adjacent(u).forEach((v) => {
			if (!(v.x == end.x && v.y == end.y) && !(v.x == start.x && v.y == start.y)) {
				setTimeout(() => {
					square(v.x, v.y, globalDim);
				}, 0);
			}
			let alt = u.dist + 1;
			if (alt < v.dist) {
				v.dist = alt;
				v.prec = u;
			}
		});
	}
}
