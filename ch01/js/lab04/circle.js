"use strict";

const { vec3 } = glMatrix;

var canvas;
var gl;

var colors=[];
var vertices=[];

var num=12;

function init(){
	canvas = document.getElementById( "triangle-canvas" );
	gl = WebGLUtils.setupWebGL( canvas );
	if( !gl ){
		alert( "WebGL isn't available" );
	}

	vertices = calCircle(num,0.8);
	//顶点颜色
	colors = colorCircle(num);

	//配置WebGL
	gl.viewport( 0, 0, canvas.width, canvas.height );
	gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

	//加载着色器并初始化属性缓冲区
	var program = initShaders( gl, "vertex-shader", "fragment-shader" );
	gl.useProgram( program );
	
	// gl.bufferSubData( gl.ARRAY_BUFFER, 0, sizeof(vertices), vertices );
	// gl.bufferSubData( gl.ARRAY_BUFFER, 0, sizeof(colors), colors );
	

	//将数据加载到GPU
	var bufferId = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
	gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( vertices ), gl.DYNAMIC_DRAW );

	//将外部着色器变量与数据缓冲区关联
	var vPosition = gl.getAttribLocation( program, "vPosition" );
	gl.vertexAttribPointer( vPosition, 3, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPosition );
	
	//将数据加载到GPU
	var bufferc = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, bufferc );
	gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( colors ), gl.DYNAMIC_DRAW );
	
	//将外部着色器变量与数据缓冲区关联
	var cPosition = gl.getAttribLocation( program, "cPosition" );
	gl.vertexAttribPointer( cPosition, 4, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( cPosition );
	
	document.getElementById("circle_shape").onchange=function(event){
		num = event.target.value;
		init();
	}
	
	render();
}
window.onload = init;
function render(){
	gl.clear( gl.COLOR_BUFFER_BIT );
	gl.drawArrays( gl.LINE_LOOP, 0, vertices.length/3 );
	vertices=[];
}

function calCircle(n,r){
     var vertices = [];
     var angle = 0; 
     var stepAngle = 360/n * (Math.PI/180);
     for(var i=0; i<=n*3; i+=3){
       vertices[i] = r * Math.cos(angle);
       vertices[i+1] = r * Math.sin(angle);
       vertices[i+2] = 0;
       angle += stepAngle;
     }

     return vertices;
}
function colorCircle(n){

	 var colors = [];

     for(var i=0; i<=n*4; i+=4){

	   colors[i]=1;
	   colors[i+1]=0;
	   colors[i+2]=1;
	   colors[i+3]=1;
     }

     return colors;
}