function setup() {
	createCanvas(window.innerWidth, window.innerHeight);
	background(0);
}

percent = 0.2;
count = 20;
shape = null;
gettingShape = true;

function draw() {
	setup();
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




class Shape {
	constructor(points) {
		this.points = points;
		this.inner = null;
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

		this.inner = new Shape(lerpedPoints);
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