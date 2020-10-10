"use strict";

const { vec3 } = glMatrix;

var canvas;
var gl;

var points = [];

var numTimesToSubdivide=0;

var theta=0;

var turntheta=0;

function init()
{
    canvas = document.getElementById( "gl-canvas" );  
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }
        
    //
    //  Initialize our data for the Sierpinski Gasket
    //
	
	var vertices = [
	          //0.0000,  0.0000, -1.0000 ,
	          0.0000,  0.9428,  0.0 ,
	         -0.8165, -0.4714,  0.0 ,
	          0.8165, -0.4714,  0.0
			// vec2(  0.0000,  0.9428 ),
			// vec2( -0.8165, -0.4714 ),
			// vec2(  0.8165, -0.4714 )
	    ];
		aaa();
    // First, initialize the corners of our gasket with three points.
	if(document.getElementById("asdasd").value == 0){
		aaa();
	}else {
		bbb();
	}

};
function aaa(){
	var u = vec3.fromValues( vertices[0], vertices[1], vertices[2] ); //数组形式转为向量
	
	var v = vec3.fromValues( vertices[3], vertices[4], vertices[5] );
	
	var w = vec3.fromValues( vertices[6], vertices[7], vertices[8] );
	
	
	divideTrianglelines( u,v,w,numTimesToSubdivide);
	
	gl.viewport( 0, 0, canvas.width, canvas.height );
	gl.clearColor( 1.0, 1.0, 1.0, 1.0 );
	
	//  Load shaders and initialize attribute buffers
	
	var program = initShaders( gl, "vertex-shader", "fragment-shader" );
	gl.useProgram( program );
	
	// Load the data into the GPU
	
	var bufferId = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
	gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( points ), gl.STATIC_DRAW );
	
	// Associate out shader variables with our data buffer
	
	var vPosition = gl.getAttribLocation( program, "vPosition" );
	gl.vertexAttribPointer( vPosition, 3, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPosition );
	
	renderlines();
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

function trianglelines( a, b, c )
{
	points.push( a[0], a[1] ,a[2]);
	points.push( b[0], b[1] ,b[2]);
	points.push( b[0], b[1] ,b[2]);
	points.push( c[0], c[1] ,c[2]);
	points.push( c[0], c[1] ,c[2]);
	points.push( a[0], a[1] ,a[2]);
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

        // three new triangles
        --count;
		
		divideTrianglelines( a, ab, ca, count );
		divideTrianglelines( b, bc, ab, count );
		divideTrianglelines( c, ca, bc, count );
		divideTrianglelines( ab, bc, ca, count );
    }
}

 window.onload = init;

function renderlines()
{
    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.drawArrays( gl.LINES, 0, points.length );
    points = [];
}
