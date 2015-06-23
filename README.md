Delaunay Triangulation
=============

Javascript module for triangulation.

### About Delaunay triangulation ###

A Delaunay triangulation for a set P of points in a plane is a triangulation DT(P) such that no point in P is inside the [circumcircle](https://en.wikipedia.org/wiki/Circumscribed_circle#Triangles) of any triangle in DT(P). Get more information on the [Wikipedia page](https://en.wikipedia.org/wiki/Delaunay_triangulation).

### Live demo ###

- [Basic example](http://sokeroner.github.io/Delaunay-Triangulation/example1.html) 

### Installation ###
```
npm install delaunay-triangulation --save
```

### Basic Usage Example ###

```js
var Delaunay = require('delaunay-triangulation');

var vertices = [
	 new Delaunay.Point (10, 14)
	,new Delaunay.Point (1, 15)
	,new Delaunay.Point (18, 10)
	,new Delaunay.Point (8, 10)
	,new Delaunay.Point (10, 20)
 	// ...
];

var triangles = Delaunay.triangulate( vertices );
var ctx = document.getElementById('canvas').getContext('2d');
ctx.strokeStyle = "red";

for ( var i = 0; i < L; i++ ) {
	var t = triangles[ i ];
	ctx.beginPath();
	ctx.moveTo(t.p1.x, t.p1.y);
	ctx.lineTo(t.p2.x, t.p2.y);
	ctx.lineTo(t.p3.x, t.p3.y);
	ctx.lineTo(t.p1.x, t.p1.y);
	ctx.stroke();
}

```

### Test ###

[![testling badge](https://ci.testling.com/sokeroner/Delaunay-Triangulation.png)](https://ci.testling.com/sokeroner/Delaunay-Triangulation)


### License ###

This content is released under the [MIT License](http://opensource.org/licenses/MIT).