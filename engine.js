var STDIN="STDIN";
var STDOUT="STDOUT";
var ADD_MUTATOR='add_mutator';
var ADD_OUTPUT='add_output';
var REMOVE_NODE='remove_node';

var paths;
var files;
var mutators;

function initialize()
{
    files=[];
    paths=[];
    mutators=[];
    paths.push([STDIN,STDOUT]);
}

function next_step()
{
    var actions = [ADD_MUTATOR,ADD_OUTPUT,REMOVE_NODE];
    var chosen_action = choose_one_randomly(actions);
    next_step_based_on_action(chosen_action);
}

function next_step_based_on_action(action) 
{
    switch(action) {
    case ADD_MUTATOR:
	add_mutator_randomly_on_edge();
	break;
    case ADD_OUTPUT:
	add_output_node_randomly_from_input_node_or_mutator_node();
	break;
    case REMOVE_NODE:
	remove_node_randomly();
	break;
    }
}

function add_output_node_from_input()
{
    var output_file=create_new_output_file();
    add_node_from(STDIN,output_file);
}

function add_mutator_randomly_on_edge()
{
    var mutator = create_new_mutator();
    var chosen = randomly_choose_existing_path();
    var point = Math.floor(Math.random()*(chosen.length-1))+1;
    var new_edge = copy_edge(chosen);
    new_edge.splice(point,0,mutator);
    paths.push(new_edge);
}

function add_output_node_randomly_from_input_node_or_mutator_node()
{
    var possibles=['stdin'];
    if (there_are_any_mutator_nodes()) {
	possibles.push('mutator');
    }
    var chosen=choose_one_randomly(possibles);
    if ( chosen == 'stdin' ) {
	add_output_node_from_input();
    }else{
	add_output_node_from_random_mutator_node();
    }
}

function remove_node_randomly()
{
    var possibles=determine_possible_to_remove();
    if (possibles.length > 0) {
	var chosen=choose_one_randomly(possibles);
	if ( chosen == 'output' ) {
	    remove_random_output_node();
	}else{
	    remove_random_mutator_node();
	}
    }
}

function choose_one_randomly(possibles) 
{
    var max=possibles.length - 1;
    var index=Math.round(Math.random()*max);
    return possibles[index];
}

function determine_possible_to_remove()
{
    var possibles=[];
    if (there_are_any_output_nodes()) {
	possibles.push('output');
    }
    if (there_are_any_mutator_nodes()) {
	possibles.push('mutator');
    }
    return possibles;
}

function there_are_any_output_nodes() 
{
    return (files.length > 0);
}

function there_are_any_mutator_nodes()
{
    return (mutators.length > 0);
}

function remove_random_mutator_node()
{
    var chosen=pick_random_mutator_node();
    remove_chosen_node_from_all_paths(chosen);
    remove_chosen_node_from_mutators(chosen);
}

function pick_random_mutator_node()
{
    var index=Math.round((mutators.length-1)*Math.random());
    return mutators[index];
}

function remove_path_with_output_node(chosen) 
{  
    var len=paths.length;
    while(len--) {
	var index=paths[len].indexOf(chosen);
	if ( index != -1 ) {
	    paths.splice(len,1);
	}
    }
}

function remove_chosen_node_from_all_paths(chosen) 
{ 
    var len=paths.length;
    while(len--) {
	var i=len;
	var index=paths[i].indexOf(chosen);
	if ( index != -1 ) {
	    paths[i].splice(index,1);
	    if ( path_should_be_removed(i) ) { 
		paths.splice(i,1);
	    }
	}
    }
}

function path_should_be_removed(index) {
    return (path_is_single_node(index) || 
	    path_is_dummy_path(index));
}

function path_is_single_node(index) {
    return (paths[index].length == 1);
}

function path_is_dummy_path(index) {
    return ((paths[index][0] == STDIN) && 
	    (paths[index][1] == STDOUT) && 
	    (paths[index].length == 2));
}

function remove_chosen_node_from_mutators(chosen)
{
    var index=mutators.indexOf(chosen);
    mutators.splice(index,1);
}

function remove_random_output_node() 
{ 
    var chosen=pick_random_output_node();
    remove_path_with_output_node(chosen);
    remove_chosen_from_files(chosen);
}

function pick_random_output_node()
{
    var index=Math.round((files.length-1)*Math.random());
    return files[index];
}

function remove_chosen_from_files(chosen)
{
    var index=files.indexOf(chosen);
    files.splice(index,1);
}

function copy_edge(chosen)
{
    var new_edge=[];
    for(var i = 0; i < chosen.length; i++) {
	new_edge[i] = chosen[i];
    }
    return new_edge;
}

function randomly_choose_existing_path()
{
    var rand_i=Math.round(Math.random()*(paths.length-1)); 
    return paths[rand_i];
}
 
function add_output_node_from_random_mutator_node()
{
    var chosen=choose_random_mutator();
    var path_indices=[];
    var len=paths.length;
    for(var i=0; i< len; i++) {
	var index=paths[i].indexOf(chosen);
	if ( index != -1 ) {
	    path_indices.push(i);
	}
    }
    var path_index=path_indices[ Math.round(Math.random()*(path_indices.length-1)) ];
    var copy=copy_edge(paths[path_index]);
    var output_file=create_new_output_file(); 
    var mutator_index=copy.indexOf(chosen);
    copy.splice(mutator_index+1,0,output_file);
    copy.splice(mutator_index+2,copy.length-mutator_index-2);
    paths.push(copy);
}

function choose_random_mutator()
{
    var rand_i=Math.floor(Math.random()*mutators.length);
    return mutators[(rand_i > 0 ? rand_i -1 : rand_i)];
}

function add_node_from(source,new_node)
{
    paths.push([source,new_node]);
}
 
function add_node_between(source,new_node,end)
{
    paths.push([source,new_node,end]);
}

function create_new_mutator()
{
    var name=random_mutator_name();
    while( mutator_name_is_used(name) ) {
	name=random_mutator_name();
    }
    mutators.push(name);
    return name;           
}

function mutator_name_is_used(name)
{
    return $.inArray(name, mutators) != -1;
}

function random_mutator_name()
{
    return "mutator_"+Math.floor((Math.random()*100)+1);
}

function create_new_output_file()
{
    var file_name=random_file_name();
    while( file_name_is_used(file_name) ) {
	file_name=random_file_name();
    }
    files.push(file_name);
    return file_name;
}      

function file_name_is_used(file_name)
{
    return $.inArray(file_name, files) != -1;
}

function random_file_name()
{
    return "file_"+Math.floor((Math.random()*100)+1);
}

function create_output_shape_dot_code()
{
    var output="";
    var length = files.length, element = null;
    for(var i = 0; i < length; i++) {
	output+=files[i]+'[shape="note"];';
    }
    return output;
}

function create_edge_shape_dot_code()
{
    return (STDIN+'[shape="house"];'+STDOUT+'[shape="invhouse"];')
}

function create_dot_code_from_paths()
{          
    var length = paths.length, element = null;
    var dot_paths=[];
    for (var i = 0; i < length; i++) {
	element = paths[i];
	var parts = element.length, subpart = null;
	for (var j = 1; j < parts; j++) {
	    dot_paths.push(element[j-1]+"->"+element[j]);
	}
    }
    var dot_code="";
    var length = dot_paths.length, element = null;
    for (var i = 0; i < length; i++) {
	dot_code+=dot_paths[i]+";";
    }
    return dot_code;
}

function make_graphviz_graph()
{
    var input_output = create_edge_shape_dot_code();
    var output_shapes = create_output_shape_dot_code();
    var path_dot_code = create_dot_code_from_paths();
    var dot_code = 'strict digraph gr{ ' + input_output + output_shapes + path_dot_code + ' }';
    var options = {cht: "gv", chl: dot_code };
    var request = "https://chart.googleapis.com/chart?"+$.param(options);
    $('#graph_img').attr('src',request);
}
