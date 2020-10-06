var canvas;
var gl;

var points = [];
var colors = [];

var numTimesToSubdivide = 0;

var theta=0;
var turntheta=0;

var baseColors = [
			vec3(1.0, 0.0, 0.0),
			vec3(0.0, 1.0, 0.0),
			vec3(0.0, 0.0, 1.0),
			vec3(0.0, 0.0, 0.0)
		];
var baseColorstwo = [
		    vec3(1.0, 0.0, 0.0),
		    vec3(1.0, 0.0, 0.0),
		    vec3(1.0, 0.0, 0.0),
		    vec3(1.0, 0.0, 0.0)
		];

function init()
{
	
	aaa();
	document.getElementById("Controls").onclick = function(event) {
		switch(event.srcElement.index) {
		  case 0:
			aaa();
			break;
	
		  case 1:
			bbb();
			break;
		  
		  case 2:
			ccc();
			break;
	   }
	};
	document.getElementById("slider").onchange = function() {
		numTimesToSubdivide = event.srcElement.value;
		document.getElementById("num").innerHTML = numTimesToSubdivide;
	};
	
	document.getElementById("thetaSlider").onchange = function() {
		theta = event.srcElement.value* Math.PI/180.0;
		document.getElementById("theta").innerHTML =event.srcElement.value;
	};
	
	document.getElementById("turnthetaSlider").onchange = function() {
		turntheta = event.srcElement.value* Math.PI/180.0;
		document.getElementById("shape").innerHTML =event.srcElement.value;
	};
};

function aaa()
{
	canvas = document.getElementById( "gl-canvas" );
	
	gl = WebGLUtils.setupWebGL( canvas );
	if ( !gl ) { alert( "WebGL isn't available" ); }
	//
	//  Initialize our data for the Sierpinski Gasket
	//
	
	// First, initialize the corners of our gasket with three points.
	
	var vertices = [
	    vec2(  0.0000,  0.9428 ),
	    vec2( -0.8165, -0.4714 ),
	    vec2(  0.8165, -0.4714 )
	];
	
	divideTriangleOne( vertices[0], vertices[1], vertices[2],numTimesToSubdivide);
	//
	//  Configure WebGL
	//
	gl.viewport( 0, 0, canvas.width, canvas.height );
	gl.clearColor( 1.0, 1.0, 1.0, 1.0 );
	gl.enable(gl.DEPTH_TEST);
	
	//  Load shaders and initialize attribute buffers
	
	var program = initShaders( gl, "vertex-shader", "fragment-shader" );
	gl.useProgram( program );
	
	// Load the data into the GPU
	
	var bufferId = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
	gl.bufferData( gl.ARRAY_BUFFER, 1000000, gl.STATIC_DRAW );
	gl.bufferSubData(gl.ARRAY_BUFFER, 0, flatten(points));
	
	// Associate out shader variables with our data buffer
	
	var vPosition = gl.getAttribLocation( program, "vPosition" );
	gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPosition );
	
	renderOne();
}

function bbb(){
	canvas = document.getElementById( "gl-canvas" );
	
	gl = WebGLUtils.setupWebGL( canvas );
	if ( !gl ) { alert( "WebGL isn't available" ); }
	//
	//  Initialize our data for the Sierpinski Gasket
	//
	
	// First, initialize the corners of our gasket with three points.
	
	var vertices = [
	    vec2(  0.0000,  0.9428 ),
	    vec2( -0.8165, -0.4714 ),
	    vec2(  0.8165, -0.4714 )
	];
	

	divideTriangleTwo( vertices[0], vertices[1], vertices[2],numTimesToSubdivide);
	//
	//  Configure WebGL
	//
	gl.viewport( 0, 0, canvas.width, canvas.height );
	gl.clearColor( 1.0, 1.0, 1.0, 1.0 );
	gl.enable(gl.DEPTH_TEST);
	
	//  Load shaders and initialize attribute buffers
	
	var program = initShaders( gl, "vertex-shader", "fragment-shader" );
	gl.useProgram( program );
	
	// Load the data into the GPU
	
	var bufferId = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
	gl.bufferData( gl.ARRAY_BUFFER, 1000000, gl.STATIC_DRAW );
	gl.bufferSubData(gl.ARRAY_BUFFER, 0, flatten(points));
	
	// Associate out shader variables with our data buffer
	
	var vPosition = gl.getAttribLocation( program, "vPosition" );
	gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPosition );
	
	
	renderTwo();
}

function ccc(){
	canvas = document.getElementById( "gl-canvas" );
	gl = WebGLUtils.setupWebGL( canvas );
	if ( !gl ) { alert( "WebGL isn't available" ); }
	
	//
	//  Initialize our data for the Sierpinski Gasket
	//
	// First, initialize the vertices of our 3D gasket
	// Four vertices on unit circle
	// Intial tetrahedron with equal length sides
	
	var vertices = [
	    vec3(  0.0000,  0.0000, -1.0000 ),
	    vec3(  0.0000,  0.9428,  0.3333 ),
	    vec3( -0.8165, -0.4714,  0.3333 ),
	    vec3(  0.8165, -0.4714,  0.3333 )
	];
	
	divideTetra( vertices[0], vertices[1], vertices[2], vertices[3],numTimesToSubdivide);
	
	//
	//  Configure WebGL
	//
	gl.viewport( 0, 0, canvas.width, canvas.height );
	gl.clearColor( 1.0, 1.0, 1.0, 1.0 );
	
	// enable hidden-surface removal
	
	gl.enable(gl.DEPTH_TEST);
	
	//  Load shaders and initialize attribute buffers
	
	var program = initShaders( gl, "vertex-shader", "fragment-shader" );
	gl.useProgram( program );
	
	// Create a buffer object, initialize it, and associate it with the
	//  associated attribute variable in our vertex shader
	
	var vBuffer = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
	gl.bufferData( gl.ARRAY_BUFFER, 5000000, gl.STATIC_DRAW );
	gl.bufferSubData(gl.ARRAY_BUFFER, 0, flatten(points));
	
	var vPosition = gl.getAttribLocation( program, "vPosition" );
	gl.vertexAttribPointer( vPosition, 3, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPosition );
	
	var cBuffer = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
	gl.bufferData( gl.ARRAY_BUFFER, 5000000, gl.STATIC_DRAW );
	gl.bufferSubData(gl.ARRAY_BUFFER, 0, flatten(colors));
	
	var vColor = gl.getAttribLocation( program, "vColor" );
	gl.vertexAttribPointer( vColor, 3, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vColor );
	
	renderThree();
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
//第一种绘制---------------------------------------------
function triangleOne( a, b, c , color)
{
    if(document.getElementById("Controls").value==0)
	{
		points.push( a, b, c );
	}
	else
	{
		points.push( a, b, b, c, c, a );
	}
}

function divideTriangleOne( a, b, c, count )
{

    // check for end of recursion
    
    if ( count == 0 ) {
		a = turnthera(a);//调用旋转变形代码
		b = turnthera(b);
		c = turnthera(c);
		a = turnAll(a);
		b = turnAll(b);
		c = turnAll(c);
        triangleOne( a, b, c );
    }
    else {
    
        //bisect the sides
        
        var ab = mix( a, b, 0.5 );
        var ac = mix( a, c, 0.5 );
        var bc = mix( b, c, 0.5 );

        --count;

        // three new triangles
        
        divideTriangleOne( a, ab, ac, count );
        divideTriangleOne( c, ac, bc, count );
        divideTriangleOne( b, bc, ab, count );
    }
}
//第二种绘制----------------------------------------------
// function triangleTwo( a, b, c )
// {
//     points.push( a, b, b, c, c, a );
// }

function divideTriangleTwo( a, b, c, count )
{

    // check for end of recursion 
    if ( count === 0 ) {
		a = turnthera(a);//调用旋转变形代码
		b = turnthera(b);
		c = turnthera(c);
		a = turnAll(a);//调用旋转整个图形代码
		b = turnAll(b);
		c = turnAll(c);
        triangleOne( a, b, c );
    }
    else {
    
        //bisect the sides
        
        var ab = mix( a, b, 0.5 );
        var ac = mix( a, c, 0.5 );
        var bc = mix( b, c, 0.5 );
		
        --count;

        // four new triangles
        
        divideTriangleTwo( a, ab, ac, count );
        divideTriangleTwo( c, ac, bc, count );
        divideTriangleTwo( b, bc, ab, count );
		divideTriangleTwo( ab, bc, ac, count );
		
    }
}
//第三种绘制----------------------------------------------
function triangle( a, b, c, color )
{

    // add colors and vertices for one triangle
	if(document.getElementById("Controls").value==2){
		// var baseColors = [
		// 	vec3(1.0, 0.0, 0.0),
		// 	vec3(0.0, 1.0, 0.0),
		// 	vec3(0.0, 0.0, 1.0),
		// 	vec3(0.0, 0.0, 0.0)
		// ];
		colors.push( baseColors[color] );
		points.push( a );
		colors.push( baseColors[color] );
		points.push( b );
		colors.push( baseColors[color] );
		points.push( c );
	}
	else{
		colors.push( baseColorstwo[color] );
		points.push( a );
		colors.push( baseColorstwo[color] );
		points.push( b );
		colors.push( baseColorstwo[color] );
		points.push( c );
	}
    
}

function tetra( a, b, c, d )
{
    // tetrahedron with each side using
    // a different color
    triangle( a, c, b, 0 );
    triangle( a, c, d, 1 );
    triangle( a, b, d, 2 );
    triangle( b, c, d, 3 );
}

function divideTetra( a, b, c, d, count )
{
    // check for end of recursion
    if ( count === 0 ) {
		// a = turnthera(a);
		// b = turnthera(b);
		// c = turnthera(c);
		// d = turnthera(d);
		// a = turnAll(a);
		// b = turnAll(b);
		// c = turnAll(c);
		// d = turnAll(d);
        tetra( a, b, c, d );
    }
    
    // find midpoints of sides
    // divide four smaller tetrahedra
    
    else {
        var ab = mix( a, b, 0.5 );
        var ac = mix( a, c, 0.5 );
        var ad = mix( a, d, 0.5 );
        var bc = mix( b, c, 0.5 );
        var bd = mix( b, d, 0.5 );
        var cd = mix( c, d, 0.5 );

        --count;
        
        divideTetra(  a, ab, ac, ad, count );
        divideTetra( ab,  b, bc, bd, count );
        divideTetra( ac, bc,  c, cd, count );
        divideTetra( ad, bd, cd,  d, count );
    }
}
//render------------------------------------------------
window.onload = init;
//one---originTriangle
function renderOne()
{
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );
    gl.drawArrays( gl.TRIANGLES, 0, points.length );
    points = [];
	colors = [];
    requestAnimFrame(aaa);
}
//two---linesTriangle
function renderTwo()
{
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.drawArrays( gl.LINES, 0, points.length );
    points = [];
	colors = [];
    requestAnimFrame(bbb);
}
//three---Tetra
function renderThree()
{
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.drawArrays( gl.TRIANGLES, 0, points.length );
	points = [];
	colors = [];
	requestAnimFrame(ccc);
}