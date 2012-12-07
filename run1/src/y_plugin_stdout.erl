-module(y_plugin_stdout).
-export([act/1]).
act(Input) ->
    io:format("~s",[Input]).
