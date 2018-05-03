function setup() {
	drawCanvas()

	setShape();
}

percent = 0.01;
count = 2100;
shapes = [];
gettingShape = false;
colorize = false;

function draw() {

	drawCanvas();
	// translate(canvasWidth / 2, canvasHeight / 2);
	stroke(255);
	strokeWeight(1);
	noFill();

	if (shapes) {
		if (gettingShape && shapes[0].points.length > 0) {
			shapes[0].outline();
		} else {
			for (var i in shapes) {
				shapes[i].fill(percent, count);
			}
		}
	}
}


function drawCanvas() {

	// var canvas = createCanvas(canvasWidth, canvasHeight);

	canvasWidth = document.getElementById('canvasContainer').offsetWidth
	canvasHeight = window.innerHeight//document.getElementById('canvasContainer').offsetHeight


	var canvas = createCanvas(canvasWidth,canvasHeight);
	canvas.parent('canvasContainer');
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
		ellipse(this.points[0].x, this.points[0].y, 4, 4)
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
		if (!shapes) shapes = [new Shape([])];
		if (gettingShape) {
			shapes[0].addPoint(e.clientX, e.clientY);
		}
	}

	if (e.button == 2) {
		gettingShape = !gettingShape;
		if (gettingShape) {
			shapes = [new Shape([])];
		}
	}

});

document.addEventListener('contextmenu', function (e) {
	e.preventDefault();
	// alert('success!');
	return true;
}, false);



function setShape() {
	let centerX = canvasWidth / 2;
	let centerY = canvasHeight / 2;

	let l = 400;
	let points = [
		[
			[-l, -l], //[-l, -l],
			[0, -l],  //[0, -l],
			[0, 0],   //[0, 0],
			[-l, 0],  //[-l, 0]
		],
		[
			[0, -l], //[0, -l],
			[l, -l], //[l, -l],
			[l, 0],  //[l, 0],
			[0, 0],  //[0, 0],
		],
		[
			[0, 0], //[0, 0],
			[l, 0], //[l, 0],
			[l, l], //[l, l],
			[0, l], //[0, l],
		],
		[
			[-l, 0], //[-l, 0],
			[0, 0],  //[0, 0],
			[0, l],  //[0, l],
			[-l, l], //[-l, l],
		],


		// [
		// 	[10-centerX,10-centerY],
		// 	[410-centerX, 10-centerY],
		// 	[10-centerX,10-centerY],
		// 	[10-centerX, 410-centerY]
		// ]


		// [
		// 	[-centerX, -centerY],[-centerX, -centerY],
		// 	[centerX, -centerY], [centerX, -centerY],
		// 	[centerX, centerY],  [centerX, centerY],
		// 	[-centerX, centerY], [-centerX, centerY],
		// ],
		// [
		// 	[-centerX, centerY], [-centerX, centerY],
		// 	[centerX, centerY],  [centerX, centerY],
		// 	[centerX, -centerY], [centerX, -centerY],
		// 	[-centerX, -centerY],[-centerX, -centerY],
		// ]


		// [
		// 	[-l, -l],
		// 	[l, -l],
		// 	[-l, -l],
			
		// 	[l, -l],
		// 	[l,l],
		// 	[l, -l],

		// 	[l,l],
		// 	[-l, l],
		// 	[l,l],

		// 	[-l, l],
		// 	[-l, -l],
		// 	[-l, l],
		// ],


		// [
		// 	[-l,-l],
		// 	[0,0],
		// 	[l,-l],
		// 	[0,0],
		// 	[l,l],
		// 	[0,0],
		// 	[-l,l],
		// 	[0,0],
		// ],
		// [
		// 	[0,0],
		// 	[-l,l],
		// 	[0,0],
		// 	[l,l],
		// 	[0,0],
		// 	[l,-l],
		// 	[0,0],
		// 	[-l,-l],
		// ]


		// [
		// 	[-centerX, -centerY],
		// 	[-centerX, centerY],
		// 	[0, centerY],

		// 	[0, -centerY],
		// 	[0, centerY],
		// 	[0, -centerY],

		// 	[centerX, -centerY],
		// 	[centerX, centerY],
		// 	[0, centerY],

		// 	[0, -centerY],
		// 	[0, centerY],
		// 	[0, -centerY],
		// ]
	]

	shapes = [];
	for (var j in points) {
		shapes.push(new Shape([]));
		for (var i in points[j]) {
			shapes[j].addPoint(centerX + points[j][i][0], centerY + points[j][i][1]);
		}
	}
}