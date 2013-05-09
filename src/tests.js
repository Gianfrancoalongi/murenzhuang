test( "output node color test", function() {
    var output = new_output("file_68");
    equal( output.generate_shape_dot_code("black"),
	   'file_68[shape=note,color=black]', 
	   "Passed!" )
});

test( "output node dot_code test", function() {
    var output = new_output("file_69");
    equal( output.generate_dot_code(),
	   'file_69',
	   "Passed")
});

test( "edge node shape code test", function() {
    var node = new_edge_node("STDIN", "house");
    equal( node.generate_shape_dot_code(),
	   'STDIN[shape=house];',
	   "Passed")
});

test( "edge node dot code test", function() {
    var node = new_edge_node("STDOUT", "invhouse");
    equal( node.generate_dot_code(),
	   'STDOUT',
	   "Passed")
});