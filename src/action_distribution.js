var ADD_MUTATOR = 'add_mutator';

function action_probabilities(mutators, files) {
    if (nothing_can_be_removed(mutators,files))
	return distribution(1.0,0.0,0.0);
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