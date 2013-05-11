var ADD_MUTATOR = 'add_mutator';
var ADD_OUTPUT = 'add_output';
var REMOVE_OUTPUT = 'remove_output';
var REMOVE_MUTATOR = 'remove_mutator';

function action_probabilities(mutators, files) {

    var x = 1 - Math.exp(-mutators/8);

    var p_add = Math.exp(-3*Math.pow(x,10));
    var p_add_output = p_add/8;
    var p_add_mut = p_add - p_add_output;

    var p_remove = 1 - p_add;
    var p_remove_output = 0
    if (files > 0) {
	p_remove_output = p_remove/4;
    }
    var p_remove_mutator = 0;
    if (mutators > 0) {
	p_remove_mutator = p_remove - p_remove_output;
    }
    
    return distribution([p_add_mut,
			 p_add_output,
			 p_remove_mutator,
			 p_remove_output]);
};

function distribution(probabilities) {
    return distr = { add_mutator: probabilities[0],
		     add_output: probabilities[1],
		     remove_mutator: probabilities[2],
		     remove_output: probabilities[3]
		   };
}

function choose_action(mutators, files) {
    var distr = action_probabilities(mutators,files);
    var rand = Math.random();

    if ( distr.add_mutator > rand)
	return ADD_MUTATOR;
    
    if ( (distr.add_output + distr.add_mutator) > rand )
	return ADD_OUTPUT;

    if ( (distr.add_output + distr.add_mutator + distr.remove_mutator) > rand )
	return REMOVE_MUTATOR;

    return REMOVE_OUTPUT;	
}