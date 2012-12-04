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
    [A,B]=string:tokens(String," "),
    string:to_upper(A)++" "++B.
    
cap2H(String) ->
    [A,B]=string:tokens(String," "),
    A++" "++string:to_upper(B).

id(X) ->
    X.
