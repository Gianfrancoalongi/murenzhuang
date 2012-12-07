-module(o_plugin_capHT).
-export([act/1]).
act(Input) ->
    [H|T] = string:tokens(Input," "),
    [TH|TT] = lists:reverse(T),
    string:join([string:to_upper(H)]++TT++[string:to_upper(TH)]," ").

