-module(mrz_transform).
-export([capHT/1
	]).
-export([rev2/1,
	 revwhole/1
	 ]).
-export([id/1
	]).

capHT(String) ->
    [H|T] = string:tokens(String," "),
    [TH|TT] = lists:reverse(T),
    string:join([string:to_upper(H)]++TT++[string:to_upper(TH)]," ").

rev2(String) ->
    Words = string:tokens(String," "),
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

revwhole(String) ->
    lists:reverse(String).

id(X) ->
    X.
