function setup() {
	drawCanvas()

	setShape();
}

percent = 0.2;
count = 20;
shape = null;
gettingShape = false;
colorize = false;

function draw() {

	drawCanvas();
	// translate(window.innerWidth / 2, window.innerHeight / 2);
	stroke(255);
	strokeWeight(3);
	noFill();

	if (shape) {
		if (gettingShape) {
			shape.outline();
		} else {
			shape.fill(percent, count);
		}
	}

}


function drawCanvas() {
	createCanvas(window.innerWidth, window.innerHeight);
	background(0);
}

class Shape {
	constructor(points) {
		this.points = points;
		this.inner = null;
		this.color = color(random(255), random(255), random(255));
	}

	setPoints(points) {
		this.points = points;
	}

	addPoint(x, y) {
		this.points.push(new Point(x, y));
		return this;
	}

	outline() {
		for (var i = 0; i < this.points.length - 1; i++) {
			line(this.points[i].x, this.points[i].y, this.points[i + 1].x, this.points[i + 1].y);
		}
	}

	draw() {
		if (colorize) fill(this.color);
		beginShape();
		for (var i in this.points) {
			vertex(this.points[i].x, this.points[i].y);
		}
		endShape(CLOSE);
	}

	innerLerp(percent) {
		let lerpedPoints = []
		for (var i = 0; i < this.points.length; i++) {
			lerpedPoints.push(Point.lerp(this.points[i], this.points[(i + 1) % this.points.length], percent));
		}
		if (this.inner) {
			this.inner.setPoints(lerpedPoints);
		} else {
			this.inner = new Shape(lerpedPoints);
		}

		return this.inner;
	}

	fill(percent, count) {
		if (count <= 0) return;

		this.draw();
		this.innerLerp(percent);
		this.inner.fill(percent, --count);
	}

}


class Point {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	static lerp(a, b, percent) {
		let lx = a.x + (b.x - a.x) * percent;
		let ly = a.y + (b.y - a.y) * percent;

		return new Point(lx, ly);
	}
}


function handleRight() {
	percent += 0.01;
	if (percent > 1) percent = 0.01;
}

function handleLeft() {
	percent -= 0.01;
	if (percent < 0) percent = 0.99;
}

function handleUp() {
	count++;
}

function handleDown() {
	count--;
}

document.addEventListener("mousedown", function (e) {
	if (e.button == 0) {
		if (!shape) shape = new Shape([]);
		if (gettingShape) {
			shape.addPoint(e.clientX, e.clientY);
		}
	}

	if (e.button == 2) {
		gettingShape = !gettingShape;
		if (gettingShape) {
			shape = new Shape([]);
		}
	}

});

document.addEventListener('contextmenu', function (e) {
	e.preventDefault();
	// alert('success!');
	return true;
}, false);



function setShape() {
	let centerX = window.innerWidth / 2;
	let centerY = window.innerHeight / 2;

	let l = 300;
	let points = [
		[-l, -l],
		[l, -l],
		[-l, -l],

		[l, -l],
		[l, l],
		[l, -l],

		[l, l],
		[-l, l],
		[l, l],

		[-l, l],
		[-l, -l],
		[-l, l]

	]

	shape = new Shape([]);
	for (var i in points) {
		shape.addPoint(centerX + points[i][0], centerY + points[i][1]);
	}
}