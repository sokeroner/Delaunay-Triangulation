Delaunay.Edge = function ( point1, point2 )
{
	
	var that = this;
	
	this.p1 = point1;
	this.p2 = point2;
	
	this.equals = function ( otherEdge )
	{
		return ((this.p1 == otherEdge.p2) && (this.p2 == otherEdge.p1)) || ((this.p1 == otherEdge.p1) && (this.p2 == otherEdge.p2));
	}
	
}