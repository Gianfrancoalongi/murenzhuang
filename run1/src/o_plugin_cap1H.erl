-module(o_plugin_cap1H).
-export([act/1]).
act(Input) ->
    Words = string:tokens(Input," "),
    {A,B} = lists:split(round(length(Words)/2),Words),
    string:join(lists:map(fun string:to_upper/1,
			  A)++B,
		" ").
