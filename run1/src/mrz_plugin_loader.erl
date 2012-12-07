-module(mrz_plugin_loader).
-export([find_plugins/1]).
-export([compile_plugins/1]).
-export([load_compiled_plugins/1]).
-export([does_plugin_exist/1]).

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

load_compiled_plugins(Plugins3Tuple) ->
    lists:foreach(
      fun(PluginCategory) ->
	      lists:map(fun code:load_file/1,PluginCategory)
      end,
      tuple_to_list(Plugins3Tuple)).

does_plugin_exist(PluginName) ->
    Loaded = code:all_loaded(),
    search_for_plugin_by_name(PluginName,Loaded).

search_for_plugin_by_name(_,[]) ->
    false;
search_for_plugin_by_name(Name,[{Module,_}|T]) ->
    NameStr = atom_to_list(Name),
    ModStr = atom_to_list(Module),
    Found = plugin_name_matches_module(NameStr,ModStr),
    case Found of
	true -> 
	    true;
	false ->
	    search_for_plugin_by_name(Name,T)
    end.

plugin_name_matches_module(NameStr,ModStr) ->
    "x_plugin_"++NameStr == ModStr orelse
	"o_plugin_"++NameStr == ModStr orelse
	"y_plugin_"++NameStr == ModStr.
