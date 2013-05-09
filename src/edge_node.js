function new_edge_node(id,shape) {
    var edgenode = {
	id: id,
	shape: shape,

	generate_dot_code: function() {
	    return this.id;
	},

	generate_shape_dot_code: function() { 
	    return this.id+'[shape='+this.shape+'];'
	}
    };
    return edgenode;
}