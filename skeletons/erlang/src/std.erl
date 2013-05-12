-module(std).
-export([in/1]).

in(X) ->
    io:format("~s",[X]).
