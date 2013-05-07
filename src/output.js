function new_output(name) {

    var output = {
	id: name,

	generate_dot_code: function() {
	    return this.id;
	},

	generate_shape_dot_code: function(color) {
	    return this.id+'[shape=note,color='+color+']';
	}

    };
    return output;
}