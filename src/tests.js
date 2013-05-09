test( "output node color test", function() {
    var output = new_output("file_68");
    equal( output.generate_shape_dot_code("black"),
	   'file_68[shape=note,color=black]', 
	   "Passed!" )
});