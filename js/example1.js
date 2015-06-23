var Delaunay = require ('delaunay-triangulation');



var vertices = [];
			
var ctx = document.getElementById('canvas').getContext('2d');
document.getElementById('canvas').setAttribute('width', window.innerWidth);
document.getElementById('canvas').setAttribute('height', window.innerHeight);
ctx.strokeStyle = "red";
start();

function start ( )
{
	document.addEventListener('mousedown',onclickpoint,false);
}


function onclickpoint (event) {
	var pt = new Delaunay.Point(event.clientX, event.clientY);
	if ( !alreadyExist(pt) )
	{
		vertices.push( pt );
		render(vertices);
	} 
	else {
		console.log ( 'alreadyExist' );
	}
	
	
}



function alreadyExist ( point )
{
	var find = false;
	for ( var i = 0; i < vertices.length; i ++ )
	{
		if (point.equals(vertices[i])) {
			find = true;
			break;
		}
	}
	return find;
}


function render ( vertices )
{
	
	var delaunay = Delaunay.triangulate( vertices );

	var t;
	var i;
	var L = delaunay.length;
	
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	
  	for ( i = 0; i < L; i++ )
	{
		t = delaunay[ i ];
		ctx.beginPath();
		ctx.moveTo(t.p1.x, t.p1.y);
		ctx.lineTo(t.p2.x, t.p2.y);
		ctx.lineTo(t.p3.x, t.p3.y);
		ctx.lineTo(t.p1.x, t.p1.y);
		ctx.stroke();
	}
	
}