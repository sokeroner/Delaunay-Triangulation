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


