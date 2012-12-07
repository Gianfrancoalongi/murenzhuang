-module(mrz_plugin_loader).
-export([find_plugins/1]).
-export([compile_plugins/1]).

find_plugins(Path) ->
    X_plugins = filelib:wildcard(filename:join(Path,"x_plugin_*.erl")),
    O_plugins = filelib:wildcard(filename:join(Path,"o_plugin_*.erl")),
    Y_plugins = filelib:wildcard(filename:join(Path,"y_plugin_*.erl")),
    {X_plugins,O_plugins,Y_plugins}.

compile_plugins(Plugins3Tuple) ->
    list_to_tuple(lists:map(fun compile_list_of_plugins/1,
			    tuple_to_list(Plugins3Tuple))
		 ).

compile_list_of_plugins([]) -> [];
compile_list_of_plugins([F|T]) ->   
    {ok,Mod} = compile:file(F,[debug_info,report_errors]),
    [Mod | compile_list_of_plugins(T)].
