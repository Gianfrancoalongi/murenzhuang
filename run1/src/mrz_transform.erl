-module(mrz_transform).
-export([rev2/1,
	 cap2H/1
	]).

rev2(String) ->
    [A,B]=string:tokens(String," "),
    A++" "++lists:reverse(B).

cap2H(String) ->
    [A,B]=string:tokens(String," "),
    A++" "++string:to_upper(B).
