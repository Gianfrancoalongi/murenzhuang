-module(o_plugin_rev2).
-export([act/1]).
act(Input) ->
    Words = string:tokens(Input," "),
    List = [ begin
		 case N rem 2 == 0 of
		     true ->
			 lists:reverse(W);
		     false ->
			 W
		 end
	     end
	     || {W,N} <- lists:zip(Words,lists:seq(1,length(Words)))
	   ],
    string:join(List," ").

