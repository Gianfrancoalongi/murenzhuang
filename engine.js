var STDIN = "STDIN";
var STDOUT = "STDOUT";
var ADD_MUTATOR = 'add_mutator';
var ADD_OUTPUT = 'add_output';
var REMOVE_NODE = 'remove_node';

function new_graph(img_id) { 

    var graph = {

	paths: [[STDIN,STDOUT]],
	files: [],
	mutators: [],
	img_id: img_id,

	newly_added_mutator:[],
	newly_added_file:[],
	newly_added_path:[],
	newly_removed_mutator:[],
	newly_removed_files:[],
	newly_removed_path:[],

	next_step_and_draw: function() {
	    this.next_step();
	    this.make_graphviz_graph();
	},

	next_step: function() {
	    var actions = [ADD_MUTATOR,ADD_OUTPUT,REMOVE_NODE];
	    var chosen_action = choose_one_randomly(actions);
	    this.next_step_based_on_action(chosen_action);	    
	},

	next_step_based_on_action: function(action) {
	    console.log(action);
	    switch(action) {
	    case ADD_MUTATOR:
		this.add_mutator_randomly_on_edge();
		break;
	    case ADD_OUTPUT:
		this.add_output_node_randomly_from_input_node_or_mutator_node();
		break;
	    case REMOVE_NODE:
		this.remove_node_randomly();
		break;
	    }
	},

	add_mutator_randomly_on_edge: function() {
	    var mutator = this.create_new_mutator();
	    var chosen = this.randomly_choose_existing_path();
	    var point = Math.floor(Math.random()*(chosen.length-1))+1;
	    var new_path = copy_path(chosen);
	    new_path.splice(point,0,mutator);
	    this.add_new_path_to_list(new_path);
	},

	add_new_path_to_list: function(new_path) {
	    this.newly_added_path.push(new_path);
	},
	
	create_new_mutator: function() {
	    var name = random_mutator_name();
	    while( this.mutator_name_is_used(name) ) {
		name = random_mutator_name();
	    }
	    this.add_new_mutator_to_list(name);
	    return name;           
	},

	add_new_mutator_to_list: function(new_mutator) {
	    this.newly_added_mutator.push(new_mutator);
	},
	
	done_and_draw: function() {
	    this.done();
	    this.make_graphviz_graph();
	},

	done: function() {
	    this.copy_mutators_from_new_to_existing();
	    this.copy_files_from_new_to_existing();
	    this.copy_paths_from_new_to_existing();
	    this.reset_waiting_lists();
	    this.remove_duplicate_paths();
	},

	copy_mutators_from_new_to_existing: function() {
	    this.mutators.push.apply(this.mutators,
				     this.newly_added_mutator);
	},

	copy_files_from_new_to_existing: function() {
	    this.files.push.apply(this.files,
				  this.newly_added_file);
	},

	copy_paths_from_new_to_existing: function() {
	    this.paths.push.apply(this.paths,
				  this.newly_added_path);
	},

	reset_waiting_lists: function() {
	    this.reset_newly_added_lists();
	    this.reset_newly_removed_lists();
	},
	
	remove_duplicate_paths: function() {
	    var unique = this.paths.filter( function(itm,i,a) 
					    {
						return i == a.indexOf(itm);
					    });
	    this.paths = unique;
	},

	reset_newly_added_lists: function() {
	    this.newly_added_mutator = [];
	    this.newly_added_file = [];
	    this.newly_added_path = [];
	},

	reset_newly_removed_lists: function() {
	    this.newly_removed_mutator = [];
	    this.newly_removed_files = [];
	    this.newly_removed_path = [];
	},

	mutator_name_is_used: function(name) {
	    return $.inArray(name, this.mutators) != -1;
	},

	create_dot_code_from_paths: function() {
	    var length = this.paths.length, element = null;
	    var dot_paths = [];
	    for (var i = 0; i < length; i++) {
		element = this.paths[i];		
		var parts = element.length;
		for (var j = 1; j < parts; j++) {
		    dot_paths.push(element[j-1]+"->"+element[j]);
		}
	    }
	    return dot_paths.join(";");
	},

	create_dot_code_for_newly_added_paths: function() {
	    var len = this.newly_added_path.length, elem = null;
	    var dot_code = [];
	    for (var i = 0; i < len; i++) {
		elem = this.newly_added_path[i];
		var nodes = elem.length;
		for (var j = 1; j < nodes; j++) {
		    dot_code.push(elem[j-1]+"->"+elem[j]+'[color="green"]');
		}
	    }
	    return dot_code.join(';');
	},
	
	create_dot_code_for_newly_added_mutators: function() {
	    var len = this.newly_added_mutator.length, elem = null;
	    var dot_code = [];
	    for (var i = 0; i < len; i++) {
		elem = this.newly_added_mutator[i];
		dot_code.push(elem+'[color="green"]');
	    }	    
	    return dot_code.join(';');
	},

	create_dot_code_for_newly_added_files: function() {
	    var len = this.newly_added_file.length, elem = null;
	    var dot_code = [];
	    for (var i = 0; i < len; i++) {
		elem = this.newly_added_file[i];
		dot_code.push(elem+'[color="green"]');
	    }
	    return dot_code.join(';');
	},

	create_dot_code_for_newly_removed_mutators: function() {
	    var len = this.newly_removed_mutator.length, elem = null;
	    var dot_code = [];
	    for (var i = 0; i < len; i++) {
		elem = this.newly_removed_mutator[i];
		dot_code.push(elem+'[color="red"]');
	    }
	    return dot_code.join(';');
	},

	create_dot_code_for_newly_removed_files: function() {
	    var len = this.newly_removed_files.length, elem = null;
	    var dot_code = [];
	    for (var i = 0; i < len; i++) {
		elem = this.newly_removed_files[i];
		dot_code.push(elem+'[color="red"]');
	    }
	    return dot_code.join(';');	    
	},

	create_dot_code_for_newly_removed_paths: function() {
	    var len = this.newly_removed_path.length, elem = null;
	    var dot_code = [];
	    for (var i = 0; i < len; i++) {
		elem = this.newly_removed_path[i];
		var nodes = elem.length;
		for (var j = 1; j < nodes; j++) {
		    dot_code.push(elem[j-1]+"->"+elem[j]+'[color="red"]');
		}
	    }
	    return dot_code.join(';');	    
	},
	
	create_output_shape_dot_code: function() {
	    var existing  = this.files.join('[shape="note"];')+'[shape="note"];';
	    var newly_added = this.newly_added_file.join('[shape="note"];')+'[shape="note"];';
	    var newly_removed = this.newly_removed_files.join('[shape="note"];')+'[shape="note"];';
	    return (existing + newly_added + newly_removed);
	    
	},

	file_name_is_used: function(file_name) {
	    return $.inArray(file_name, this.files) != -1;
	},

	create_new_output_file: function() {
	    var file_name = random_file_name();
	    while( this.file_name_is_used(file_name) ) {
		file_name = random_file_name();
	    }
	    this.add_new_file_to_list(file_name);
	    return file_name;
	},

	add_new_file_to_list: function(new_file) {
	    this.newly_added_file.push(new_file);
	},
	
	add_node_from: function(source,new_node) {
	    this.paths.push([source,new_node]);
	},

	choose_random_mutator: function() {
	    return choose_one_randomly(this.mutators);
	},
	
	add_output_node_from_random_mutator_node: function() {
	    var chosen=this.choose_random_mutator();
	    var path_indices=[];
	    var len=this.paths.length;
	    for(var i=0; i< len; i++) {
		var index=this.paths[i].indexOf(chosen);
		if ( index != -1 ) {
		    path_indices.push(i);
		}
	    }
	    var path_index = choose_one_randomly(path_indices);
	    var output_file = this.create_new_output_file(); 
	    var copy = copy_path(this.paths[path_index]);
	    var mutator_index = copy.indexOf(chosen);
	    copy.splice(mutator_index+1,0,output_file);
	    copy.splice(mutator_index+2,copy.length-mutator_index-2);
	    this.add_new_path_to_list(copy);
	},

	randomly_choose_existing_path: function() {
	    return choose_one_randomly(this.paths);
	},
	
	remove_chosen_from_files: function(chosen) {
	    var index=this.files.indexOf(chosen);
	    this.add_output_node_to_remove_list(this.files[index]);
	    this.files.splice(index,1);
	},

	add_output_node_to_remove_list: function(file) {
	    this.newly_removed_files.push(file);
	},
	
	pick_random_output_node: function() {
	    return choose_one_randomly(this.files);
	},

	remove_random_output_node: function() { 
	    var chosen=this.pick_random_output_node();
	    this.remove_all_paths_with_node(chosen);
	    this.remove_chosen_from_files(chosen);
	},

	remove_chosen_node_from_mutators: function(chosen) {
	    var index=this.mutators.indexOf(chosen);
	    this.add_mutator_to_remove_list(this.mutators[index]);
	    this.mutators.splice(index,1);
	},

	add_mutator_to_remove_list: function(mutator) {
	    this.newly_removed_mutator.push(mutator);
	},

	path_is_dummy_path: function(index) {
	    return ((this.paths[index][0] == STDIN) && 
		    (this.paths[index][1] == STDOUT) && 
		    (this.paths[index].length == 2));
	},
	
	path_is_single_node: function(index) {
	    return (this.paths[index].length == 1);
	},

	path_should_be_removed: function(index) {
	    return (this.path_is_single_node(index) || 
		    this.path_is_dummy_path(index));
	},
	
	remove_chosen_node_from_all_paths: function(chosen) { 
	    var len=this.paths.length;
	    while(len--) {
		var i=len;
		var index=this.paths[i].indexOf(chosen);
		if ( index != -1 ) {
		    this.add_path_to_newly_removed(copy_path(this.paths[i]));
		    this.paths[i].splice(index,1);
		    if ( this.path_should_be_removed(i) ) { 
			this.paths.splice(i,1);
		    }
		}
	    }
	},

	remove_all_paths_with_node: function(chosen) {  
	    var len=this.paths.length;
	    while(len--) {
		var index=this.paths[len].indexOf(chosen);
		if ( index != -1 ) {
		    this.add_path_to_newly_removed(this.paths[len]);
		    this.paths.splice(len,1);
		}
	    }
	},
	
	add_path_to_newly_removed: function(path) {
	    this.newly_removed_path.push(path);
	},
	
	pick_random_mutator_node: function() {
	    return choose_one_randomly(this.mutators);
	},
	
	remove_random_mutator_node: function() {
	    var chosen=this.pick_random_mutator_node();
	    this.remove_chosen_node_from_all_paths(chosen);
	    this.remove_chosen_node_from_mutators(chosen);
	},

	there_are_any_output_nodes: function() {
	    return (this.files.length > 0);
	},
	
	there_are_any_mutator_nodes: function() {
	    return (this.mutators.length > 0);
	},

	determine_possible_to_remove: function() {
	    var possibles=[];
	    if (this.there_are_any_output_nodes()) {
		possibles.push('output');
	    }
	    if (this.there_are_any_mutator_nodes()) {
		possibles.push('mutator');
	    }
	    return possibles;
	},

	remove_node_randomly: function() {
	    var possibles = this.determine_possible_to_remove();
	    if (possibles.length > 0) {
		var chosen = choose_one_randomly(possibles);
		if ( chosen == 'output' ) {
		    this.remove_random_output_node();
		}else{
		    this.remove_random_mutator_node();
		}
	    }
	},

	add_output_node_randomly_from_input_node_or_mutator_node: function() {
	    var possibles=['stdin'];
	    if (this.there_are_any_mutator_nodes()) {
		possibles.push('mutator');
	    }
	    var chosen=choose_one_randomly(possibles);
	    if ( chosen == 'stdin' ) {
		this.add_output_node_from_input();
	    }else{
		this.add_output_node_from_random_mutator_node();
	    }
	},
	
	add_output_node_from_input: function() {
	    this.add_new_path_to_list([STDIN,this.create_new_output_file()]);
	},

	make_graphviz_graph: function()
	{
	    var input_output = create_edge_shape_dot_code();
	    var output_shapes = this.create_output_shape_dot_code();
	    var green_paths_dot_code = this.create_dot_code_for_newly_added_paths();
	    var green_mutators_dot_code = this.create_dot_code_for_newly_added_mutators();
	    var green_files_dot_code = this.create_dot_code_for_newly_added_files();
	    var red_mutators_dot_code = this.create_dot_code_for_newly_removed_mutators();
	    var red_files_dot_code = this.create_dot_code_for_newly_removed_files();
	    var red_paths_dot_code = this.create_dot_code_for_newly_removed_paths();
	    var path_dot_code = this.create_dot_code_from_paths();
	    var dot_code = 'strict digraph gr{ '
		+ input_output
		+ output_shapes
		+ green_mutators_dot_code
		+ green_paths_dot_code
		+ green_files_dot_code
		+ red_mutators_dot_code
		+ red_files_dot_code
		+ red_paths_dot_code
		+ path_dot_code 
		+ ' }';
	    var options = {cht: "gv", chl: dot_code };
	    var request = "https://chart.googleapis.com/chart?"+$.param(options);
	    $('#'+this.img_id).attr('src',request);
	}

    };
    return graph;
}

var graph = new_graph('graph_img');

function choose_one_randomly(possibles) {
    var max=possibles.length - 1;
    var index=Math.round(Math.random()*max);
    return possibles[index];
}

function copy_path(chosen) {
    var new_edge=[];
    for(var i = 0; i < chosen.length; i++) {
	new_edge[i] = chosen[i];
    }
    return new_edge;
}

function random_mutator_name() {
    return "mutator_"+Math.floor((Math.random()*100)+1);
}

function random_file_name() {
    return "file_"+Math.floor((Math.random()*100)+1);
}

function create_edge_shape_dot_code() {
    return (STDIN+'[shape="house"];'+STDOUT+'[shape="invhouse"];')
}