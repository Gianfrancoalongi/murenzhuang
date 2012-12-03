-module(mrz_transform).
-export([rev2/1]).

rev2(String) ->
    [A,B]=string:tokens(String," "),
    A++" "++lists:reverse(B).
