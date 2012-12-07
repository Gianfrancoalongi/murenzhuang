#!/usr/bin/env escript 
%% -*- erlang -*-
%%! -sasl errlog_type error
-type feature() :: string().
-type modifier() :: added | removed.
-record(state,{allowed_features = [] :: [feature()],
	       available_features = [] :: [feature()],
	       history = [] :: [{modifier(),feature()}]
	      }).

main(Already) ->    
    State = new_state(Already),
    loop(State).

loop(State) ->
    print_menu(),
    case engine_step(State) of
	quit -> quit;
	NS -> loop(NS)
    end.

new_state(Already) ->
    X_base = ["goodbye world","stdin","file","socket"],
    X_mod = ["id","xml","json","binary"],
    O_base = ["id","rev","cap","bin","lower","dec","switch"],
    O_mod = ["whole","2","HT","1H","2H"],
    Y_base = ["stdout","file","socket"],
    Y_mod = [],
    Configuration = [ {"X:",{X_base,X_mod}},
		      {"O:",{O_base,O_mod}},
		      {"Y:",{Y_base,Y_mod}}
		    ],
    #state{available_features = generate_feature_pairs(Configuration),
	   allowed_features = already_have(Already)
	  }.

already_have(Already) ->
    lists:map(
      fun(String) ->
	      {added,erlang:list_to_atom(String)}
      end,
      Already).

generate_feature_pairs([]) -> [];
generate_feature_pairs([{Prefix,{Base,Mod}}|T]) -> 
    Gens = [ Prefix++B++M || B <- Base,M <- Mod],
    Gens ++ generate_feature_pairs(T).

print_menu() ->
    io:format("~n"
	      " ***** MuRenZhuang ***** ~n"
	      " (n) - next step~n"
	      " (c) - current state~n"
	      " (q) - quit~n"
	      "~n",
	      []).

next_step(S) when S#state.allowed_features =/= S#state.available_features ->
    case S#state.allowed_features of
	[] -> add_a_feature(S);
	_ ->
	    case random:uniform(2) of
		1 -> add_a_feature(S);
		2 -> remove_a_feature(S)
	    end
    end;
next_step(S) ->
    remove_a_feature(S).

add_a_feature(State) ->
    Avail = State#state.available_features,
    Allowed = State#state.allowed_features,
    To_add = pick_random_excluding(Allowed,Avail),
    wait_until_done_adding_feature(State,To_add).

remove_a_feature(State) ->
    Allowed = State#state.allowed_features,
    To_remove = pick_random_excluding([],Allowed),
    wait_until_done_removing_feature(State,To_remove).

wait_until_done_adding_feature(State,Name) ->
    Args = [{banner,"+"},
	    {verb,"ADD"},
	    {name,Name}],
    wait_until_done_modifying(Args),
    State#state{allowed_features = [Name | State#state.allowed_features],
		history = [ {added,Name} | State#state.history ]
	       }.

wait_until_done_removing_feature(State,Name) ->
    Args = [{banner,"-"},
	    {verb,"REMOVE"},
	    {name,Name}],
    wait_until_done_modifying(Args),
    State#state{allowed_features = State#state.allowed_features -- [Name],
		history = [ {removed,Name} | State#state.history ]
	       }.

wait_until_done_modifying(Args) ->
    Banner = string:copies(proplists:get_value(banner,Args),10),
    Verb = proplists:get_value(verb,Args),
    Name = proplists:get_value(name,Args),
    io:format("~n"
	      "~p ~p FEATURE ~p~n"
	      " Feature: ~p~n"
	      "~n"
	      " Press d and enter when done~n",
	      [Banner,Verb,Banner,Name]),
    case io:get_line("choice > ") of
	"d\n" -> ok;
	 _ -> wait_until_done_modifying(Args)
    end.
        
pick_random_excluding(Exclude_list,Available) ->
    Free = Available -- Exclude_list,
    lists:nth(random:uniform(length(Free)),Free).

print_current_state(State) ->
    io:format("~n"
	      " ********** Current State **********~n"
	      " Allowed features: ~s~n"
	      " History: ~s~n"
	      " Amount of available features: ~p~n"
	      "~n",
	      [io_lib:format("~p",[State#state.allowed_features]),
	       io_lib:format("~p",[State#state.history]),
	       length(State#state.available_features)
	       ]),
    State.
    

quit(State) ->    
    quit.

engine_step(State) ->
    Options = [{"n\n",fun(S) -> next_step(S) end},
	       {"c\n",fun(S) -> print_current_state(S) end},
	       {"q\n",fun(S) -> quit(S) end}],
    case proplists:get_value(io:get_line("choice > "),Options) of
	undefined -> engine_step(State);
	Fun -> Fun(State)
    end.

