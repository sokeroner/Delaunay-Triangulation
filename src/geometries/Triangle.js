Delaunay.Triangle = function ( point1, point2, point3 )
{
	var that = this;
	
	this.p1 = point1;
	this.p2 = point2;
	this.p3 = point3;
	
	this.center;
	
	this.mid0; //p0 > p1
	this.mid1; //p1 > p2
	this.mid2; //p2 > p0
}



Delaunay.Triangle.prototype.getCenter = function ( )
{
	if( this.center == null ) center = new Delaunay.Point( 0,0 );
	center.x = ( this.p1.x + this.p2.x + this.p3.x ) / 3;
	center.y = ( this.p1.y + this.p2.y + this.p3.y ) / 3;
	return center;
	
}


Delaunay.Triangle.prototype.getSidesCenters = function ( )
{
	if( this.mid0 == null || this.mid1 == null || this.mid2 == null )
		{
			mid0 = new Delaunay.Point( 0, 0 );
			mid1 = new Delaunay.Point( 0, 0 );
			mid2 = new Delaunay.Point( 0, 0 );
		} 
		
		this.mid0.x = this.p1.x + ( this.p2.x - this.p1.x )/2;
		this.mid0.y = this.p1.y + ( this.p2.y - this.p1.y )/2;
		
		this.mid1.x = this.p2.x + ( this.p3.x - this.p2.x )/2;
		this.mid1.y = this.p2.y + ( this.p3.y - this.p2.y )/2;	
		
		this.mid2.x = this.p3.x + ( this.p1.x - this.p3.x )/2;
		this.mid2.y = this.p3.y + ( this.p1.y - this.p3.y )/2;
}