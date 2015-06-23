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