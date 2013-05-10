function action_probabilities(mutators) {    
    if (mutators > 24)
	return distribution(0.05, 0.05, 0.9);

    if (mutators > 19)
	return distribution(0.3, 0.1, 0.6);

    if (mutators > 14)
	return distribution(0.4, 0.2, 0.4);

    if (mutators > 9)
	return distribution(0.6, 0.2, 0.2);

    if (mutators > 4)
	return distribution(0.7, 0.2, 0.1);

    if (mutators > 0)
	return distribution(0.9, 0.1, 0.0);

    return distribution(1.0,0.0,0.0);
}

function distribution(p_addmut, p_addout, p_remove) {
    return distr = { add_mutator: p_addmut,
		     add_output: p_addout,
		     remove: p_remove
		   };
}

var ADD_MUTATOR = 'add_mutator';
var ADD_OUTPUT = 'add_output';
var REMOVE = 'remove';

function choose_action(mutators) {
    var distr = action_probabilities(mutators);
    var rand = Math.random();

    if ( distr.add_mutator > rand)
	return ADD_MUTATOR;
    
    if ( (distr.add_output + distr.add_mutator) > rand )
	return ADD_OUTPUT;

    return REMOVE;
	
}