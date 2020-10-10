"use strict";

const { vec3 } = glMatrix;

var canvas;
var gl;

var points = [];
var colors = [];

var numTimesToSubdivide=0;

var theta=0;

var turntheta=0;

//var baseColors=[];
var baseColors = [
	1.0, 0.0, 0.0,
	0.0, 1.0, 0.0,
	0.0, 0.0, 1.0,
	0.0, 0.0, 0.0
];
var vertices = [
	  0.0000,  0.0000, -1.0000 ,
	  0.0000,  0.9428,  0.3333 ,
	 -0.8165, -0.4714,  0.3333 ,
	  0.8165, -0.4714,  0.3333 
];

function init()
{
    canvas = document.getElementById( "gl-canvas" );  
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }
    //
    //  Initialize our data for the Sierpinski Gasket
    //
	aaa();
	if(document.getElementById("Controls").value == 0){
		aaa();
	}
	else if(document.getElementById("Controls").value == 1){
		bbb();
	}
	else if(document.getElementById("Controls").value == 2){
		ccc();
	}
};
function  aaa(){

	var u = vec3.fromValues( vertices[3], vertices[4], vertices[5] ); //数组形式转为向量
	
	var v = vec3.fromValues( vertices[6], vertices[7], vertices[8] );
	
	var w = vec3.fromValues( vertices[9], vertices[10], vertices[11] );
	
	divideTriangleOrigin( u,v,w,numTimesToSubdivide);
	
	samepart();
	
	renderOrigin();
}
function bbb(){
	
	var u = vec3.fromValues( vertices[3], vertices[4], vertices[5] ); //数组形式转为向量
	
	var v = vec3.fromValues( vertices[6], vertices[7], vertices[8] );
	
	var w = vec3.fromValues( vertices[9], vertices[10], vertices[11] );
	
	divideTrianglelines( u,v,w,numTimesToSubdivide);
	
	samepart();
	
	renderlines();
}

function ccc(){

	var u = vec3.fromValues( vertices[0], vertices[1], vertices[2] ); //数组形式转为向量
	
	var v = vec3.fromValues( vertices[3], vertices[4], vertices[5] );
	
	var w = vec3.fromValues( vertices[6], vertices[7], vertices[8] );
	
	var x = vec3.fromValues( vertices[9], vertices[10], vertices[11] );
	
	divideTetra( u,v,w,x,numTimesToSubdivide);

	samepart();
	
	renderTetra();
}
function samepart(){
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
	gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( points ), gl.STATIC_DRAW );
	
	var vPosition = gl.getAttribLocation( program, "vPosition" );
	gl.vertexAttribPointer( vPosition, 3, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPosition );
	
	var cBuffer = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
	gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( colors ), gl.STATIC_DRAW );
	
	var vColor = gl.getAttribLocation( program, "vColor" );
	gl.vertexAttribPointer( vColor, 3, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vColor );
}
//对点的位置进行旋转变形
function turnshape(a){
	var d = Math.sqrt(a[0]*a[0]+a[1]*a[1]);
	var s = Math.sin(d*turntheta);
	var c = Math.cos(d*turntheta);
	a = vec3.fromValues(a[0]*c-a[1]*s,a[0]*s+a[1]*c,a[2]);
	return a;
}
//对点的位置进行中心旋转
function turnAll(a){
	var s = Math.sin(theta);
	var c = Math.cos(theta);
	a = vec3.fromValues(a[0]*c-a[1]*s,a[0]*s+a[1]*c,a[2]);
	return a;
}
//-----------------------------------------------------------
function triangleOriginpart( a, color )
{
	// add colors and vertices for one triangle
	colors.push(baseColors[3*color],baseColors[3*color+1],baseColors[3*color+2]);
	points.push(a[0],a[1],a[2]);

}
function triangleOrigin( a, b, c )
{
	triangleOriginpart( a, 0 );
	triangleOriginpart( b, 0 );
	triangleOriginpart( c, 0 );
	// points.push( a[0], a[1] ,a[2]);
	// points.push( b[0], b[1] ,b[2]);
	// points.push( c[0], c[1] ,c[2]);
}
function divideTriangleOrigin( a, b, c, count )
{
    // check for end of recursion
    if ( count == 0 ) {
		a = turnshape(a);//调用旋转变形代码
		b = turnshape(b);
		c = turnshape(c);
		a = turnAll(a);
		b = turnAll(b);
		c = turnAll(c);
        triangleOrigin( a, b, c );
    }
    else {
    
        //bisect the sides
		var ab = vec3.create();
		vec3.lerp( ab, a, b, 0.5 ); //ab中点
		var bc = vec3.create();
		vec3.lerp( bc, b, c, 0.5 );
		var ca = vec3.create();
		vec3.lerp( ca, c, a, 0.5 );

        // three new triangles
        
		divideTriangleOrigin( a, ab, ca, count-1 );
		divideTriangleOrigin( b, bc, ab, count-1 );
		divideTriangleOrigin( c, ca, bc, count-1 );
    }
}
//-----------------------------------------------------------
function trianglelinespart( a, b, color )
{
    // add colors and vertices for one triangle
	colors.push(baseColors[3*color],baseColors[3*color+1],baseColors[3*color+2]);
	points.push(a[0],a[1],a[2]);
	colors.push(baseColors[3*color],baseColors[3*color+1],baseColors[3*color+2]);
	points.push(b[0],b[1],b[2]);
}
function trianglelines( a, b, c )
{
	trianglelinespart( a, b, 0 );
	trianglelinespart( b, c, 0 );
	trianglelinespart( c, a, 0 );
	// points.push( a[0], a[1] ,a[2]);
	// points.push( b[0], b[1] ,b[2]);
	// points.push( b[0], b[1] ,b[2]);
	// points.push( c[0], c[1] ,c[2]);
	// points.push( c[0], c[1] ,c[2]);
	// points.push( a[0], a[1] ,a[2]);
}
function divideTrianglelines( a, b, c, count )
{
    // check for end of recursion
    if ( count == 0 ) {
		a = turnshape(a);//调用旋转变形代码
		b = turnshape(b);
		c = turnshape(c);
		a = turnAll(a);
		b = turnAll(b);
		c = turnAll(c);
        trianglelines( a, b, c );
    }
    else {
        //bisect the sides
		var ab = vec3.create();
		vec3.lerp( ab, a, b, 0.5 ); //ab中点
		var bc = vec3.create();
		vec3.lerp( bc, b, c, 0.5 );
		var ca = vec3.create();
		vec3.lerp( ca, c, a, 0.5 );

        // four new triangles
        --count;
		
		divideTrianglelines( a, ab, ca, count );
		divideTrianglelines( b, bc, ab, count );
		divideTrianglelines( c, ca, bc, count );
		divideTrianglelines( ab, bc, ca, count );
    }
}
//-----------------------------------------------------------
function trianglepart( a, b, c, color )
{
    // add colors and vertices for one triangle
	colors.push(baseColors[3*color],baseColors[3*color+1],baseColors[3*color+2]);
	points.push(a[0],a[1],a[2]);
	
	colors.push(baseColors[3*color],baseColors[3*color+1],baseColors[3*color+2]);	
	points.push(b[0],b[1],b[2]);

	colors.push(baseColors[3*color],baseColors[3*color+1],baseColors[3*color+2]);
	points.push(c[0],c[1],c[2]);
}
function tetra( a, b, c, d )
{
    // tetrahedron with each side using
    // a different color
    trianglepart( a, c, b, 0 );
    trianglepart( a, c, d, 1 );
    trianglepart( a, b, d, 2 );
    trianglepart( b, c, d, 3 );
}
function divideTetra( a, b, c, d, count )
{
    // check for end of recursion
    if ( count == 0 ) {
		a = turnshape(a);
		b = turnshape(b);
		c = turnshape(c);
		d = turnshape(d);
		a = turnAll(a);
		b = turnAll(b);
		c = turnAll(c);
		d = turnAll(d);
        tetra( a, b, c, d );
    }
    
    // find midpoints of sides
    // divide four smaller tetrahedra
    
    else {
		var ab = vec3.create();
		vec3.lerp( ab, a, b, 0.5 );
		var bc = vec3.create();
		vec3.lerp( bc, b, c, 0.5 );
		var ac = vec3.create();
		vec3.lerp( ac, a, c, 0.5 );
		var ad = vec3.create();
		vec3.lerp( ad, a, d, 0.5 );
		var bd = vec3.create();
		vec3.lerp( bd, b, d, 0.5 );
		var cd = vec3.create();
		vec3.lerp( cd, c, d, 0.5 );
		
        --count;
        
        divideTetra(  a, ab, ac, ad, count );
        divideTetra( ab,  b, bc, bd, count );
        divideTetra( ac, bc,  c, cd, count );
        divideTetra( ad, bd, cd,  d, count );
    }
}
//-----------------------------------------------------------
 window.onload = init;

function renderOrigin()
{
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.drawArrays( gl.TRIANGLES, 0, points.length );
    points = [];
	colors = [];
}

function renderlines()
{
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.drawArrays( gl.LINES, 0, points.length );
    points = [];
	colors = [];
}
function renderTetra()
{
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.drawArrays( gl.TRIANGLES, 0, points.length );
	points = [];
	colors = [];
}