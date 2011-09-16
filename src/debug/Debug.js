var DEBUG = DEBUG || {};

DEBUG.active = true;


DEBUG.trace = function ( param )
{
	if (this.active) console.log ( param );
}


DEBUG.warning = function ( param )
{
	if (this.active) console.log ( param );
}


DEBUG.alert = function ( param )
{
	if (this.active) alert ( param );
}


DEBUG.TODO = function ( param )
{
	if (this.active) console.warn ( "TODO: " + param );
}

DEBUG.clear = function ( )
{
	console.clear();
}
