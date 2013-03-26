
function new_mutator(id) {
    var mutator = {
	id: id,
	buffer: random_buffer_size(),
	transform: this.random_transform(),
	arguments: this.random_arguments(),

	random_arguments: function() {
	    var upto = this.buffer + 1;
	    var args = shuffle(sequence(1,upto));
	    remove_some(args);
	    return args;
	}
	
    };
    return mutator;
}

function random_transform() {
    return choose_one_randomly(["order",
				"increase",
				"decrease",
				"type",
				"copy",
				"sum",
				"encode"]);
}

function random_buffer_size() {
    Math.round(Math.random()*7)+1;
}

function shuffle(o){
    for(var j, x, i = o.length; i; j= parseInt(Math.random() * i), 
	x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};

function sequence(from,to) {
    var nums=[];
    for(var i = from; i <= to; i++) {
	nums.push(i);
    }
    return sequence;
}

function remove_some(array) {
    var len = array.length - 1;
    wile( len-- ) {
	if ( Math.round(Math.random()) == 0 ) {
	    array.splice(len,1);
	}
    }
}