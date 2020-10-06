var canvas;
var gl;

var points = [];

var numTimesToSubdivide = 0;

var theta=0;
var turntheta=0;
//var s = Math.sin(turntheta);
//var c = Math.cos(turntheta);

var vertices = [
        // vec2( -1, -1 ),
        // vec2(  0,  1 ),
        // vec2(  1, -1 )
		vec2(  0.0000,  0.9428 ),
		vec2( -0.8165, -0.4714 ),
		vec2(  0.8165, -0.4714 )
    ];

function init()
{
    canvas = document.getElementById( "gl-canvas" );  
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }
        
    //
    //  Initialize our data for the Sierpinski Gasket
    //

    // First, initialize the corners of our gasket with three points.
    
    
	
    divideTriangle( vertices[0], vertices[1], vertices[2],
                    numTimesToSubdivide);

	xxx();
    
    document.getElementById("slider").onchange = function() {
        numTimesToSubdivide = event.srcElement.value;
    };
	
	document.getElementById("thetaSlider").onchange = function() {
		theta = event.srcElement.value* Math.PI/180.0;
	};
	
	document.getElementById("turnthetaSlider").onchange = function() {
		turntheta = event.srcElement.value* Math.PI/180.0;
	};
	
    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.drawArrays( gl.TRIANGLES, 0, points.length );
    points = [];
    requestAnimFrame(init);
};

function xxx(){
	//
	//  Configure WebGL
	//
	gl.viewport( 0, 0, canvas.width, canvas.height );
	gl.clearColor( 1.0, 1.0, 1.0, 1.0 );
	
	//  Load shaders and initialize attribute buffers
	
	var program = initShaders( gl, "vertex-shader", "fragment-shader" );
	gl.useProgram( program );
	
	// Load the data into the GPU
	
	var bufferId = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
	gl.bufferData( gl.ARRAY_BUFFER, 200000, gl.STATIC_DRAW );
	gl.bufferSubData(gl.ARRAY_BUFFER, 0, flatten(points));
	
	// Associate out shader variables with our data buffer
	
	var vPosition = gl.getAttribLocation( program, "vPosition" );
	gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPosition );
}

//对点的位置进行旋转变形
function turnthera(a){
	var d = Math.sqrt(a[0]*a[0]+a[1]*a[1]);
	var s = Math.sin(d*turntheta);
	var c = Math.cos(d*turntheta);
	a = vec2(a[0]*c-a[1]*s,a[0]*s+a[1]*c);
	return a;
}
//对点的位置进行中心旋转
function turnAll(a){
	var s = Math.sin(theta);
	var c = Math.cos(theta);
	a = vec2(a[0]*c-a[1]*s,a[0]*s+a[1]*c);
	return a;
}

function triangle( a, b, c )
{
    points.push( a, b, c );
}

function divideTriangle( a, b, c, count )
{

    // check for end of recursion
    
    if ( count == 0 ) {
		a = turnthera(a);//调用旋转变形代码
		b = turnthera(b);
		c = turnthera(c);
		a = turnAll(a);
		b = turnAll(b);
		c = turnAll(c);
        triangle( a, b, c );
    }
    else {
    
        //bisect the sides
        
        var ab = mix( a, b, 0.5 );
        var ac = mix( a, c, 0.5 );
        var bc = mix( b, c, 0.5 );

        --count;

        // three new triangles
        
        divideTriangle( a, ab, ac, count );
        divideTriangle( c, ac, bc, count );
        divideTriangle( b, bc, ab, count );
    }
}

window.onload = init;

function renderOne()
{

}
