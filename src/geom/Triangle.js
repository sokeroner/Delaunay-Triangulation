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




