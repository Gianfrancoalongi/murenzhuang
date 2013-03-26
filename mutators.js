
function new_mutator(id) {
    var mutator = {
	id: id,
	buffer: random_buffer_size(),
	transform: this.random_transform(),
	arguments: this.random_arguments(),

	random_transform: function() {
	    
	}
    };
    return mutator;
}

function random_buffer_size() {
    Math.round(Math.random()*7)+1;
}