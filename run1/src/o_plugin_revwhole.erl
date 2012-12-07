-module(o_plugin_revwhole).
-export([act/1]).
act(Input) ->
    lists:reverse(Input).

