-module(o_plugin_lower2).
-export([act/1]).
act(Input) ->
    string:join(lowercase_every_second(string:tokens(Input," "),1)," ").

lowercase_every_second([],_) -> [];
lowercase_every_second([S|T],N) ->
    R = case N rem 2 == 0  of
	    true ->
		string:to_lower(S);
	    false ->
		S
	end,
    [ R  | lowercase_every_second(T,N+1)].
