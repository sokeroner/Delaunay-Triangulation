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

