Delaunay.Triangulate = function ( vertices )
{
	
	var i;
	var j;
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

	vertices.push(new Delaunay.Point( (xmid - 2 * dmax), (ymid - dmax), nv+1 ) );
	vertices.push(new Delaunay.Point( xmid, (ymid + 2 * dmax), nv+2 ) );
	vertices.push(new Delaunay.Point((xmid + 2 * dmax), (ymid - dmax), nv+3));

	var triangles = []; //array type de triangles
	
	vertices[ nv ].id =  nv;
	vertices[ nv + 1 ].id =  nv + 1;
	vertices[ nv + 2 ].id =  nv + 2;

	triangles.push( new Delaunay.Triangle( vertices[ nv ], vertices[ nv + 1 ], vertices[ nv + 2 ] ) ); //SuperTriangle placed at index 0

	
	
	
	// Include each point one at a time into the existing mesh
	for ( i = 0; i < nv; i++)
	{
		
		var Edges = []; // [trimax * 3];

		// Set up the edge buffer.
		// If the point (Vertex(i).x,Vertex(i).y) lies inside the circumcircle then the
		// three edges of that triangle are added to the edge buffer and the triangle is removed from list.
		for ( j = 0; j < triangles.length; j++ )
		{
			
			if ( Delaunay.InCircle( vertices[ i ], triangles[ j ].p1, triangles[ j ].p2, triangles[ j ].p3 ) )
			{

				Edges.push( new Delaunay.Edge(triangles[j].p1, triangles[j].p2) );
				Edges.push( new Delaunay.Edge(triangles[j].p2, triangles[j].p3) );
				Edges.push( new Delaunay.Edge(triangles[j].p3, triangles[j].p1) );

				triangles.splice( j,1 );

				j--;

			}

		}

		if ( i >= nv) continue; //In case we the last duplicate point we removed was the last in the array



		// Remove duplicate edges
		// Note: if all triangles are specified anticlockwise then all
		// interior edges are opposite pointing in direction.

		for ( j = Edges.length - 2; j >= 0; j--)
		{

			for (var k = Edges.length - 1; k >= j + 1; k--)
			{

				if ( Edges[ j ].equals( Edges[ k ] ) )
				{

					Edges.splice( k, 1 );
					Edges.splice( j, 1 );
					k--;
					continue;

				}

			}

		}

		// Form new triangles for the current point
		// Skipping over any tagged edges.
		// All edges are arranged in clockwise order.
		for ( j = 0; j < Edges.length; j++)
		{

			if (triangles.length >= trimax )
			{
				//	throw new ApplicationException("Exceeded maximum edges");
				DEBUG.warning ("Exceeded maximum edges");				
			}
			triangles.push( new Delaunay.Triangle( Edges[ j ].p1, Edges[ j ].p2, vertices[ i ] ));

		}

		Edges = [];
		
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
