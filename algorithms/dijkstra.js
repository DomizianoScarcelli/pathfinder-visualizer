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
