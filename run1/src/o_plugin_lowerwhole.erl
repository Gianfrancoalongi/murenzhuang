-module(o_plugin_lowerwhole).
-export([act/1]).
act(Input) ->
    string:to_lower(Input).

