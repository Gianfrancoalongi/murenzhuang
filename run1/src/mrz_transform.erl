-module(mrz_transform).
-export([cap2H/1,
	 cap1H/1
	 ]).
-export([rev2/1,
	 id/1
	]).

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

cap1H(String) ->
    List = string:tokens(String," "),
    {A,B} = lists:split(round(length(List)/2),List),
    string:join(lists:map(fun string:to_upper/1,A)++B," ").
    
cap2H(String) ->
    List = string:tokens(String," "),
    {A,B} = lists:split(round(length(List)/2),List),
    string:join(A++lists:map(fun string:to_upper/1,B)," ").

id(X) ->
    X.
