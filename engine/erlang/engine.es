#!/usr/bin/env escript 
%% -*- erlang -*-
%%! -sasl errlog_type error
-type feature() :: string().
-type modifier() :: added | removed.
-record(state,{allowed_features = [] :: [feature()],
	       available_features = [] :: [feature()],
	       iterations = 0 :: integer(),
	       history = [] :: [{modifier(),feature()}]				 
	      }).

main([]) ->    
    State = new_state(),
    print_menu(),
    engine_step(State).

new_state() ->
    #state{available_features = ["reverse"]}.

print_menu() ->
    io:format("~n"
	      " ***** MuRenZhuang ***** ~n"
	      " (n) - next step~n"
	      " (c) - current state~n"	      
	      " (q) - quit~n"
	      "~n",
	      []).

next_step(State) ->
    io:format("Next step~n",[]).

print_current_state(State) ->
    io:format("Print current state~n",[]).

quit(State) ->
    io:format("Quit~n",[]).

engine_step(State) ->
    Options = [{"n",fun(S) -> next_step(S) end},
	       {"c",fun(S) -> print_current_state(S) end},
	       {"q",fun(S) -> quit(S) end}],
    case proplists:get_value(io:get_chars("choice > ",1),Options) of
	undefined -> engine_step(State);
	Fun -> Fun(State)
    end.
    

