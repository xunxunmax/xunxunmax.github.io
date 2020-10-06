var canvas;
var gl;

var points = [];
var colors = [];

var numTimesToSubdivide = 0;

var theta=0;
var turntheta=0;





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
function xxx(a)
{

	
	// Load the data into the GPU
	// if(a == 2){

	// }
	// else if(a == 3)
	// {

	// }
}
function aaa(){
	canvas = document.getElementById( "gl-canvas" );
	gl = WebGLUtils.setupWebGL( canvas );
	if ( !gl ) { alert( "WebGL isn't available" ); }
	var vertices = [
		vec3(  0.0000,  0.0000, -1.0000 ),
		vec3(  0.0000,  0.9428,  0.3333 ),
		vec3( -0.8165, -0.4714,  0.3333 ),
		vec3(  0.8165, -0.4714,  0.3333 )
	];
	divideTriangleOne( vertices[1], vertices[2], vertices[3],numTimesToSubdivide);
	gl.viewport( 0, 0, canvas.width, canvas.height );
	gl.clearColor( 1.0, 1.0, 1.0, 1.0 );
	gl.enable(gl.DEPTH_TEST);
	
	//  Load shaders and initialize attribute buffers
	
	var program = initShaders( gl, "vertex-shader", "fragment-shader" );
	gl.useProgram( program );
	var bufferId = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
	gl.bufferData( gl.ARRAY_BUFFER, 1000000, gl.STATIC_DRAW );
	gl.bufferSubData(gl.ARRAY_BUFFER, 0, flatten(points));
	
	// Associate out shader variables with our data buffer
	
	var vPosition = gl.getAttribLocation( program, "vPosition" );
	gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPosition );
	
	var cBuffer = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
	gl.bufferData( gl.ARRAY_BUFFER, 5000000, gl.STATIC_DRAW );
	gl.bufferSubData(gl.ARRAY_BUFFER, 0, flatten(colors));
	
	var vColor = gl.getAttribLocation( program, "vColor" );
	gl.vertexAttribPointer( vColor, 2, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vColor );
	renderOne();
}
function bbb(){
	canvas = document.getElementById( "gl-canvas" );
	gl = WebGLUtils.setupWebGL( canvas );
	if ( !gl ) { alert( "WebGL isn't available" ); }
	var vertices = [
		vec3(  0.0000,  0.0000, -1.0000 ),
		vec3(  0.0000,  0.9428,  0.3333 ),
		vec3( -0.8165, -0.4714,  0.3333 ),
		vec3(  0.8165, -0.4714,  0.3333 )
	];
	divideTriangleTwo( vertices[1], vertices[2], vertices[3],numTimesToSubdivide);
	gl.viewport( 0, 0, canvas.width, canvas.height );
	gl.clearColor( 1.0, 1.0, 1.0, 1.0 );
	gl.enable(gl.DEPTH_TEST);
	
	//  Load shaders and initialize attribute buffers
	
	var program = initShaders( gl, "vertex-shader", "fragment-shader" );
	gl.useProgram( program );
	var bufferId = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
	gl.bufferData( gl.ARRAY_BUFFER, 1000000, gl.STATIC_DRAW );
	gl.bufferSubData(gl.ARRAY_BUFFER, 0, flatten(points));
	
	// Associate out shader variables with our data buffer
	
	var vPosition = gl.getAttribLocation( program, "vPosition" );
	gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPosition );
	
	var cBuffer = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
	gl.bufferData( gl.ARRAY_BUFFER, 5000000, gl.STATIC_DRAW );
	gl.bufferSubData(gl.ARRAY_BUFFER, 0, flatten(colors));
	
	var vColor = gl.getAttribLocation( program, "vColor" );
	gl.vertexAttribPointer( vColor, 2, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vColor );
	renderTwo();
}
function ccc(){
	canvas = document.getElementById( "gl-canvas" );
	gl = WebGLUtils.setupWebGL( canvas );
	if ( !gl ) { alert( "WebGL isn't available" ); }
	var vertices = [
		vec3(  0.0000,  0.0000, -1.0000 ),
		vec3(  0.0000,  0.9428,  0.3333 ),
		vec3( -0.8165, -0.4714,  0.3333 ),
		vec3(  0.8165, -0.4714,  0.3333 )
	];
	divideTetra( vertices[0], vertices[1], vertices[2], vertices[3],numTimesToSubdivide);
	gl.viewport( 0, 0, canvas.width, canvas.height );
	gl.clearColor( 1.0, 1.0, 1.0, 1.0 );
	gl.enable(gl.DEPTH_TEST);
	
	//  Load shaders and initialize attribute buffers
	
	var program = initShaders( gl, "vertex-shader", "fragment-shader" );
	gl.useProgram( program );
	var bufferId = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
	gl.bufferData( gl.ARRAY_BUFFER, 1000000, gl.STATIC_DRAW );
	gl.bufferSubData(gl.ARRAY_BUFFER, 0, flatten(points));
	
	// Associate out shader variables with our data buffer
	
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
	points.push( a, b, c );
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
function triangleTwo( a, b, c )
{
    points.push( a, b, b, c, c, a );
}

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
        triangleTwo( a, b, c );
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
	var baseColors = [
		vec3(1.0, 0.0, 0.0),
		vec3(0.0, 1.0, 0.0),
		vec3(0.0, 0.0, 1.0),
		vec3(0.0, 0.0, 0.0)
	];
	colors.push( baseColors[color] );
	points.push( a );
	colors.push( baseColors[color] );
	points.push( b );
	colors.push( baseColors[color] );
	points.push( c );
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