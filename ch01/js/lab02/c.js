var canvas;
var gl;

var points = [];

var numTimesToSubdivide = 0;

function init()
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
	
    divideTriangle( vertices[0], vertices[1], vertices[2],
                    numTimesToSubdivide);

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
    gl.bufferData( gl.ARRAY_BUFFER, 1000000, gl.STATIC_DRAW );
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, flatten(points));

    // Associate out shader variables with our data buffer
    
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
    
        document.getElementById("slider").onchange = function() {
        numTimesToSubdivide = event.srcElement.value;
    };


    render();
};

function triangle( a, b, c )
{
    points.push( a,b, b,c, c,a );
}

function divideTriangle( a, b, c, count )
{

    // check for end of recursion 
    if ( count === 0 ) {
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
		divideTriangle( ab, bc, ac, count );
		
    }
}

window.onload = init;

function render()
{
    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.drawArrays( gl.LINES, 0, points.length );
    points = [];
    requestAnimFrame(init);
}