Delaunay.Point = function ( px, py )
{
	var that = this;
	var ox = px;
	var yx = yx;
	
	this.id;
	this.x = px;
	this.y = py;	
}


Delaunay.Point.prototype.distance = function ( otherpoint )
{
	return  Math.sqrt( ((otherpoint.x - this.x)*(otherpoint.x - this.x)) + ((otherpoint.y - this.y)*(otherpoint.y - this.y)) );
}

Delaunay.Point.prototype.equals2d = function ( otherpoint )
{
	return ( this.x == otherpoint.x && this.y == otherpoint.y );
	
}
