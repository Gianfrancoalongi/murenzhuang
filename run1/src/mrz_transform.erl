-module(mrz_transform).
-export([cap2H/1,
	 cap1H/1
	 ]).
-export([rev2/1,
	 id/1
	]).

rev2(String) ->
    [A,B]=string:tokens(String," "),
    A++" "++lists:reverse(B).

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
