!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.Delaunay=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * The InCircle function return true if the point p is inside the circumcircle
 * made by p1, p2, p3 points (note: a point on the edge is inside the circumcircle).
 *
 * @function
 * @param p {Point} 
 * @param p1 {Point}
 * @param p2 {Point}
 * @param p3 {Point}
 */

function inCircle ( p, p1, p2, p3 ) 
{	

	var EPSILON = Number.MIN_VALUE;
	
	if ( Math.abs( p1.y - p2.y ) < EPSILON && Math.abs( p2.y - p3.y) < EPSILON)
	{
		//INCIRCUM - F - Points are coincident !!
		return false;
	}
	
	var m1, m2
	   ,mx1, mx2
	   ,my1, my2
	   ,xc, yc;
	
	if ( Math.abs(p2.y - p1.y) < EPSILON)
	{
		m2 = -(p3.x - p2.x) / (p3.y - p2.y);
		mx2 = (p2.x + p3.x) * 0.5;
		my2 = (p2.y + p3.y) * 0.5;
		//Calculate CircumCircle center (xc,yc)
		xc = (p2.x + p1.x) * 0.5;
		yc = m2 * (xc - mx2) + my2;
	}
	else if ( Math.abs(p3.y - p2.y) < EPSILON)
	{
		m1 = -(p2.x - p1.x) / (p2.y - p1.y);
		mx1 = (p1.x + p2.x) * 0.5;
		my1 = (p1.y + p2.y) * 0.5;
		//Calculate CircumCircle center (xc,yc)
		xc = (p3.x + p2.x) * 0.5;
		yc = m1 * (xc - mx1) + my1;
	}
	else
	{
		m1 = -(p2.x - p1.x) / (p2.y - p1.y);
		m2 = -(p3.x - p2.x) / (p3.y - p2.y);
		mx1 = (p1.x + p2.x) * 0.5;
		mx2 = (p2.x + p3.x) * 0.5;
		my1 = (p1.y + p2.y) * 0.5;
		my2 = (p2.y + p3.y) * 0.5;
		//Calculate CircumCircle center (xc,yc)
		xc = (m1 * mx1 - m2 * mx2 + my2 - my1) / (m1 - m2);
		yc = m1 * (xc - mx1) + my1;
	}

	var dx = p2.x - xc;
	var dy = p2.y - yc;
	var rsqr = dx * dx + dy * dy;
	//double r = Math.Sqrt(rsqr); //Circumcircle radius
	dx = p.x - xc;
	dy = p.y - yc;
	var drsqr = dx * dx + dy * dy;

	return ( drsqr <= rsqr );
	
}


module.exports = inCircle;



},{}],2:[function(require,module,exports){
module.exports = {
    triangulate :     	require('./triangulate'),
    inCircle    :     	require('./inCircle')
};
},{"./inCircle":1,"./triangulate":3}],3:[function(require,module,exports){
var geom = 		require ('../geom'),
	inCircle =	require ('./inCircle');


/**
 * The triangulate function return 
 *
 * @function
 * @param vertices {Array} 
 */


function triangulate ( vertices )
{
	
	var i, j;
	var nv = vertices.length;
	
	if (nv < 3) return [];
	
	var trimax = 4 * nv;
	
	// Find the maximum and minimum vertex bounds.
	// This is to allow calculation of the bounding supertriangle

	var xmin = vertices[0].x;
	var ymin = vertices[0].y;
	var xmax = xmin;
	var ymax = ymin;
	
	for ( i = 1; i < nv; i++)
	{	
		vertices[i].id = i;
		if (vertices[i].x < xmin) xmin = vertices[i].x;
		if (vertices[i].x > xmax) xmax = vertices[i].x;
		if (vertices[i].y < ymin) ymin = vertices[i].y;
		if (vertices[i].y > ymax) ymax = vertices[i].y;
	}
	
	var dx = xmax - xmin;
	var dy = ymax - ymin;

	var dmax = (dx > dy) ? dx : dy;
	var xmid = (xmax + xmin) * 0.5;
	var ymid = (ymax + ymin) * 0.5;
	
	// Set up the supertriangle
	// This is a triangle which encompasses all the sample points.
	// The supertriangle coordinates are added to the end of the
	// vertex list. The supertriangle is the first triangle in
	// the triangle list.

	vertices.push(new geom.Point( (xmid - 2 * dmax), (ymid - dmax), nv+1 ) );
	vertices.push(new geom.Point( xmid, (ymid + 2 * dmax), nv+2 ) );
	vertices.push(new geom.Point((xmid + 2 * dmax), (ymid - dmax), nv+3));

	var triangles = []; //array type de triangles
	
	vertices[ nv ].id =  nv;
	vertices[ nv + 1 ].id =  nv + 1;
	vertices[ nv + 2 ].id =  nv + 2;

	triangles.push( new geom.Triangle( vertices[ nv ], vertices[ nv + 1 ], vertices[ nv + 2 ] ) ); //SuperTriangle placed at index 0

	
	
	
	// Include each point one at a time into the existing mesh
	for ( i = 0; i < nv; i++)
	{
		
		var edges = []; // [trimax * 3];

		// Set up the edge buffer.
		// If the point (Vertex(i).x,Vertex(i).y) lies inside the circumcircle then the
		// three edges of that triangle are added to the edge buffer and the triangle is removed from list.
		for ( j = 0; j < triangles.length; j++ )
		{
			
			if ( inCircle( vertices[ i ], triangles[ j ].p1, triangles[ j ].p2, triangles[ j ].p3 ) )
			{

				edges.push( new geom.Edge(triangles[j].p1, triangles[j].p2) );
				edges.push( new geom.Edge(triangles[j].p2, triangles[j].p3) );
				edges.push( new geom.Edge(triangles[j].p3, triangles[j].p1) );

				triangles.splice( j,1 );

				j--;

			}

		}

		if ( i >= nv) continue; //In case we the last duplicate point we removed was the last in the array



		// Remove duplicate edges
		// Note: if all triangles are specified anticlockwise then all
		// interior edges are opposite pointing in direction.

		for ( j = edges.length - 2; j >= 0; j--)
		{

			for (var k = edges.length - 1; k >= j + 1; k--)
			{

				if ( edges[ j ].equals( edges[ k ] ) )
				{

					edges.splice( k, 1 );
					edges.splice( j, 1 );
					k--;
					continue;

				}

			}

		}

		// Form new triangles for the current point
		// Skipping over any tagged edges.
		// All edges are arranged in clockwise order.
		for ( j = 0; j < edges.length; j++)
		{

			if (triangles.length >= trimax )
			{
				//	throw new ApplicationException("Exceeded maximum edges");
				DEBUG.warning ("Exceeded maximum edges");				
			}
			triangles.push( new geom.Triangle( edges[ j ].p1, edges[ j ].p2, vertices[ i ] ));

		}

		edges = [];
		
	}
	
	
	// Remove triangles with supertriangle vertices
	// These are triangles which have a vertex number greater than nv
	

	for ( i = triangles.length - 1; i >= 0; i--)
	{	
		if ( triangles[ i ].p1.id >= nv || triangles[ i ].p2.id >= nv || triangles[ i ].p3.id >= nv)
		{
			triangles.splice(i, 1);
			
		}
	}


	//Remove SuperTriangle vertices
	vertices.splice( vertices.length - 1, 1 );
	vertices.splice( vertices.length - 1, 1 );
	vertices.splice( vertices.length - 1, 1 );
	

	return triangles.concat();
	
}

module.exports = triangulate;

},{"../geom":7,"./inCircle":1}],4:[function(require,module,exports){
var Point = require('./Point');

/**
 * The Edge object represents the edge between two points.
 *
 * @class
 * @param [point1={x:0,y:0}] {Point} first point.
 * @param [point2={x:0,y:0}] {Point} second point.
 */

function Edge ( point1, point2 )
{
    /**
     * @member {Point}
     * @default {x:0,y:0}
     */
    this.p1 = point1 || new Point(0,0);

    /**
     * @member {Point}
     * @default {x:0,y:0}
     */
    this.p2 = point2 || new Point(0,0);
}

Edge.prototype.constructor = Edge;
module.exports = Edge;


/**
 * Returns true if the given edge is equal to this edge
 *
 * @param otherEdge {Edge}
 * @returns {boolean}
 */

Edge.prototype.equals = function ( otherEdge )
{
    return ((this.p1 == otherEdge.p2) && (this.p2 == otherEdge.p1)) || ((this.p1 == otherEdge.p1) && (this.p2 == otherEdge.p2));
}


/**
 * Returns the value of the edge length
 *
 * @returns {number}
 */

Edge.prototype.length = function ()
{
    return this.p1.distance( this.p2 );
}


},{"./Point":5}],5:[function(require,module,exports){
/**
 * The Point object represents a location in a two-dimensional coordinate system, where x represents
 * the horizontal axis and y represents the vertical axis.
 *
 * @class
 * @param [x=0] {number} position of the point on the x axis
 * @param [y=0] {number} position of the point on the y axis
 */

function Point(x, y)
{
    /**
     * @member {number}
     * @default 0
     */
    this.x = x || 0;

    /**
     * @member {number}
     * @default 0
     */
    this.y = y || 0;

}

Point.prototype.constructor = Point;
module.exports = Point;



/**
 * Returns the value of the distance between two points
 *
 * @param otherpoint {Point}
 * @returns {number}
 */

Point.prototype.distance = function ( otherpoint )
{
	return  Math.sqrt( ((otherpoint.x - this.x)*(otherpoint.x - this.x)) + ((otherpoint.y - this.y)*(otherpoint.y - this.y)) );
};


/**
 * Returns true if the given point is equal to this point
 *
 * @param otherpoint {Point}
 * @returns {boolean}
 */

Point.prototype.equals = function ( otherpoint )
{
	return ( this.x == otherpoint.x && this.y == otherpoint.y );
};


/**
 * Copies x and y from the given point
 *
 * @param p {Point}
 */

Point.prototype.copy = function (p) {
    this.set(p.x, p.y);
};


/**
 * Sets the point to a new x and y position.
 * If y is omitted, both x and y will be set to x.
 *
 * @param [x=0] {number} position of the point on the x axis
 * @param [y=0] {number} position of the point on the y axis
 */

Point.prototype.set = function (x, y)
{
    this.x = x || 0;
    this.y = y || 0;
};


},{}],6:[function(require,module,exports){
var Point = require('./Point');


/**
 * The Triangle object represents a set of three points.
 *
 * @class
 * @param [point1={x:0,y:0}] {Point} one of the three points
 * @param [point2={x:0,y:0}] {Point} one of the three points
 * @param [point3={x:0,y:0}] {Point} one of the three points
 */

function Triangle ( point1, point2, point3 )
{
    /**
     * @member {Point}
     * @default {x:0,y:0}
     */
    this.p1 = point1 || new Point(0,0);

    /**
     * @member {Point}
     * @default {x:0,y:0}
     */
    this.p2 = point2 || new Point(0,0);

    /**
     * @member {Point}
     * @default {x:0,y:0}
     */
    this.p3 = point3 || new Point(0,0);


    /**
     * @member {Point}
     */
    this.mid0 = new Point ( this.p1.x + ( this.p2.x - this.p1.x )/2,
                            this.p1.y + ( this.p2.y - this.p1.y )/2 );


    /**
     * @member {Point}
     */
    this.mid1 = new Point ( this.p2.x + ( this.p3.x - this.p2.x )/2,
                            this.p2.y + ( this.p3.y - this.p2.y )/2 );
    

    /**
     * @member {Point}
     */
    this.mid2 = new Point ( this.p3.x + ( this.p1.x - this.p3.x )/2,
                            this.p3.y + ( this.p1.y - this.p3.y )/2 );

}

Triangle.prototype.constructor = Triangle;
module.exports = Triangle;



/**
 * Returns the x and y values of the center of the triangle
 *
 * @returns {Point}
 */

Triangle.prototype.getCenter = function ( )
{
    return new Point ( ( this.p1.x + this.p2.x + this.p3.x ) / 3,
                       ( this.p1.y + this.p2.y + this.p3.y ) / 3 );
}





},{"./Point":5}],7:[function(require,module,exports){
module.exports = {
	Point	 :     	require('./Point'),
    Triangle :  	require('./Triangle'),
    Edge	 :      require('./Edge')
};
},{"./Edge":4,"./Point":5,"./Triangle":6}],8:[function(require,module,exports){
var core =	require ( './core' );
	geom =	require ( './geom' );

/**
 * @file        Main export of the Delaunay Triangulation library
 * @author      Jean-Vincent Roger <jv.roger@84paris.com>
 * @license     {@link https://github.com/sokeroner/delaunay-triangulation/blob/master/LICENSE|MIT License}
 */

var Delaunay = {

	// core methods
	triangulate : 	core.triangulate,
	inCircle	: 	core.inCircle,

	// geom
	Point		: 	geom.Point,
	Triangle 	: 	geom.Triangle,
	Edge 		: 	geom.Edge

}

module.exports = Delaunay;
},{"./core":2,"./geom":7}]},{},[8])(8)
});