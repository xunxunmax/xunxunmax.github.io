"use strict";

var gl;
var points;

window.onload = function init(){
	var canvas = document.getElementById( "triangle-canvas" );
	gl = WebGLUtils.setupWebGL( canvas );
	if( !gl ){
		alert( "WebGL isn't available" );
	}

	//三个顶点
	var vertices = [
		-1.0, -0.5, 
		 0.0, -0.5, 
		-1.0,  0.5,
		
		 0.0, -0.5,
		 1.0, -0.5,
		 1.0,  0.5,
		 
		 0.0, -0.5,
		 0.0,  0.5,
		 1.0,  0.5,
	];
	var colors = [
		0.95, 0.7 , 0.2 , 1.0,
		0.95, 0.7 , 0.2 , 1.0,
		0.95, 0.7 , 0.2 , 1.0,
		
		0.6 , 0.8 , 0.4 , 1.0,
		0.6 , 0.8 , 0.4 , 1.0,
		0.6 , 0.8 , 0.4 , 1.0,
		
		0.6 , 0.8 , 0.4 , 1.0,
		0.6 , 0.8 , 0.4 , 1.0,
		0.6 , 0.8 , 0.4 , 1.0
	]
	//配置WebGL
	gl.viewport( 0, 0, canvas.width, canvas.height );
	gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

	//加载着色器并初始化属性缓冲区
	var program = initShaders( gl, "vertex-shader", "fragment-shader" );
	gl.useProgram( program );

	//将数据加载到GPU
	var bufferId = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
	gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( vertices ), gl.STATIC_DRAW );

	//将外部着色器变量与数据缓冲区关联
	var vPosition = gl.getAttribLocation( program, "vPosition" );
	gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPosition );
	
	//将数据加载到GPU
	var bufferc = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, bufferc );
	gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( colors ), gl.STATIC_DRAW );
	
	//将外部着色器变量与数据缓冲区关联
	var cPosition = gl.getAttribLocation( program, "cPosition" );
	gl.vertexAttribPointer( cPosition, 4, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( cPosition );
	

	render();
}

function render(){
	gl.clear( gl.COLOR_BUFFER_BIT );
	//gl.drawArrays( gl.TRIANGLE_FAN, 0, 3 );
	gl.drawArrays( gl.TRIANGLES, 0, 9 );
	//gl.drawArrays( gl.TRIANGLE_FANS, 3, 6 );
}