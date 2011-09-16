Delaunay.InCircle = function ( p, p1, p2, p3 )
{
	
	//Return TRUE if the point (xp,yp) lies inside the circumcircle
	//made up by points (x1,y1) (x2,y2) (x3,y3)
	//NOTE: A point on the edge is inside the circumcircle
	
	var Epsilon = Number.MIN_VALUE;
	
	if ( Math.abs( p1.y - p2.y ) < Epsilon && Math.abs( p2.y - p3.y) < Epsilon)
	{
		//INCIRCUM - F - Points are coincident !!
		return false;
	}
	
	
	var m1;
	var m2;
	var mx1;
	var mx2;
	var my1;
	var my2;
	var xc;
	var yc;
	
	if ( Math.abs(p2.y - p1.y) < Epsilon)
	{
		m2 = -(p3.x - p2.x) / (p3.y - p2.y);
		mx2 = (p2.x + p3.x) * 0.5;
		my2 = (p2.y + p3.y) * 0.5;
		//Calculate CircumCircle center (xc,yc)
		xc = (p2.x + p1.x) * 0.5;
		yc = m2 * (xc - mx2) + my2;
	}
	else if ( Math.abs(p3.y - p2.y) < Epsilon)
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

