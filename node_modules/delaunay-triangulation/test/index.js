"use strict"

var tape = require("tape");
var Delaunay = require ("../bin/delaunay.min.js");


tape( ">>>>> Delaunay.Point", function(t) {
	t.plan(5);
	// distance method
	var point = new Delaunay.Point (1, 10);
	t.equal( typeof point.distance( new Delaunay.Point(10, 10) ), 'number', 'Point.distance method return a number' );
	t.equal( point.distance( new Delaunay.Point(10, 10) ), 9, 'Point.distance method return a good result' );
	// equals method
	t.equal( typeof point.equals( new Delaunay.Point(1, 10) ), 'boolean', 'Point.equals method return a boolean' );
	t.equal( point.equals( new Delaunay.Point(1, 10) ), true, 'Point.equals method return a good result' );
	// copy method
	var point1 = new Delaunay.Point (2,2);
	point.copy ( point1 );
	t.equal( (point.x == point1.x && point.y == point1.y), true, 'Point.copy works' );
});


tape( ">>>>> Delaunay.Triangle", function(t) {
	t.plan(2);
	var point1 = new Delaunay.Point (1, 10);
	var point2 = new Delaunay.Point (10, 10);
	var point3 = new Delaunay.Point (10, 10);
	var triangle = new Delaunay.Triangle ( point1, point2, point3 );
	// getCenter method
	t.equal( triangle.getCenter( ) instanceof Delaunay.Point, true, 'Triangle.getCenter method return a Point' );
	var center = triangle.getCenter ();
	t.equal( (center.x == 7 && center.y == 10), true, 'Triangle.getCenter return a good result' );
});


tape( ">>>>> Delaunay.Edge", function(t) {
	t.plan(3);
	var point1 = new Delaunay.Point (1, 10);
	var point2 = new Delaunay.Point (10, 10);
	var edge = new Delaunay.Edge ( point1, point2 );
	// equals method
	t.equal( typeof edge.equals ( edge ), 'boolean', 'Edge.equals method return a boolean' );
	t.equal( edge.equals ( edge ), true, 'Edge.equals method return a good result' );
	// length method
	t.equal( typeof edge.length( ), 'number', 'Edge.length method return a number' );
});


tape( ">>>>> Delaunay.inCircle", function(t) {
	t.plan(2);
	var point1 = new Delaunay.Point (5, 5);
	var point2 = new Delaunay.Point (10, 10);
	var point3 = new Delaunay.Point (10, 1);
	var point4 = new Delaunay.Point (1, 10);
	// inCircle method
	t.equal( typeof Delaunay.inCircle ( point1, point2, point3, point4 ), 'boolean', 'inCircle method return a boolean' );
	t.equal( Delaunay.inCircle ( point1, point2, point3, point4 ), true, 'inCircle method return a good result' );
});



tape( ">>>>> Delaunay.triangulate", function(t) {
	t.plan(2);
	var vertices = [
    	 new Delaunay.Point (10, 14)
    	,new Delaunay.Point (1, 15)
    	,new Delaunay.Point (18, 10)
    	,new Delaunay.Point (8, 10)
	];
	// triangulate method
	t.equal( Delaunay.triangulate( vertices ) instanceof Array, true, 'triangulate method return an array' );
	t.equal( Delaunay.triangulate( vertices ).length, 2, 'triangulate method return a good length array' );
});