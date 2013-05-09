function new_mutator(name) {

    var mutator = {
	id: name,
	buffer: 0,
	transform: "nothing",
	args: [],

	set_mutator_values: function() {
	    this.buffer = random_buffer_size();
	    this.transform = random_transform();
	    this.args = this.random_arguments();
	},
	
	random_arguments: function() {
	    var upto = this.buffer + 1;	    
	    var a = sequence(1,upto);
	    var b = shuffle(a);
	    remove_some(b);
	    return b;
	},

	generate_dot_code: function() {
	    return this.id;
	},

	generate_shape_dot_code: function(color) {
	    var label_text = this.generate_label_text();
	    var result = this.id+'[label="'+label_text+'",color='+color+',shape=hexagon]';
	    return result;
	},
	
	generate_label_text: function() {
	    var txt = ["Buffer:"+this.buffer,
		       "Transform:"+this.transform,
		       "[x_i]:"+this.args];
	    return txt.join('\\n');
	},
	
	get_name: function() {
	    return this.id;
	}

    };
    mutator.set_mutator_values();
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
    return Math.round(Math.random()*2)+2;
}

function shuffle(o){
    for(var j, x, i = o.length; i; j= parseInt(Math.random() * i), 
	x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}

function sequence(from,to) {
    var nums=[];
    for(var i = from; i <= to; i++) {
	nums.push(i);
    }
    return nums;
}

function remove_some(input) {
    var len = input.length - 1;
    while( len-- ) {
	if ( Math.round(Math.random()) == 0 ) {
	    input.splice(len,1);
	}
    }
}

function choose_one_randomly(possibles) {
    var max=possibles.length - 1;
    var index=Math.round(Math.random()*max);
    return possibles[index];
}