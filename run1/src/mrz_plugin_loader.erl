-module(mrz_plugin_loader).
-export([find_plugins/1]).
-export([plugin_to_feature_name/1]).
-export([load_plugins/1]).

find_plugins(Path) ->
    X_plugins = lists:map(fun filename:basename/1,
			  filelib:wildcard(filename:join(Path,"x_plugin_*.erl"))),
    O_plugins = lists:map(fun filename:basename/1,
			  filelib:wildcard(filename:join(Path,"o_plugin_*.erl"))),
    Y_plugins = lists:map(fun filename:basename/1,
			  filelib:wildcard(filename:join(Path,"y_plugin_*.erl"))),
    {X_plugins,O_plugins,Y_plugins}.

%% Format is {x,o,y}_plugin_NAME
plugin_to_feature_name(PluginName) ->
    [_,_,Name] = string:tokens(atom_to_list(PluginName),"_"),
    list_to_atom(Name).

load_plugins(SrcPath) ->
    list_to_tuple(
      lists:map(fun try_load_plugins/1,
		tuple_to_list(find_plugins(SrcPath)))).
    
try_load_plugins(PluginList) ->
    lists:foldr(
      fun(PluginSrc,Acc) ->
	      Base = filename:basename(PluginSrc,".erl"),
	      Module = list_to_atom(Base),
	      case code:is_loaded(Module) of
		  {file,_} ->
		      [ Module | Acc];
		  false ->
		      case code:load_file(Module) of
			  {error,_} ->
			      Acc;
			  {module,_} ->
			      [ Module | Acc]
		      end
	      end
      end,
      [],
      PluginList).
	      
	      
