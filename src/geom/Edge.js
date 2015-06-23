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

