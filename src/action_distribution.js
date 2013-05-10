var ADD_MUTATOR = 'add_mutator';

function action_probabilities(mutators, files) {    
    if (nothing_can_be_removed(mutators,files))
	return distribution(1.0,0.0,0.0);

    if (mutators > 9)
	return distribution(0.6, 0.2, 0.2);

    if (mutators > 4)
	return distribution(0.7, 0.2, 0.1);

    if (mutators > 0)
	return distribution(0.9, 0.1, 0.0);
}

function nothing_can_be_removed(mutators, files) {
    return (mutators + files) == 0
}

function distribution(p_addmut, p_addout, p_remove) {
    return distr = { add_mutator: p_addmut,
		     add_output: p_addout,
		     remove: p_remove
		   };
}