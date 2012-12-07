-module(mrz_plugin_loader).
-export([find_plugins/1]).

find_plugins(Path) ->
    X_plugins = filelib:wildcard(filename:join(Path,"x_plugin_*.erl")),
    O_plugins = filelib:wildcard(filename:join(Path,"o_plugin_*.erl")),
    Y_plugins = filelib:wildcard(filename:join(Path,"y_plugin_*.erl")),
    {X_plugins,O_plugins,Y_plugins}.
