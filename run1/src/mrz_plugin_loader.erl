-module(mrz_plugin_loader).
-export([find_plugins/1]).
-export([plugin_to_feature_name/1]).
-export([load_plugins/1]).

find_plugins(SourcePath) ->
    FB = fun filename:basename/1,
    F = fun(Path,Prefix) -> filelib:wildcard(filename:join(Path,Prefix++"_plugin_*.erl")) end,
    X_plugins = lists:map(FB,F(SourcePath,"x")),
    O_plugins = lists:map(FB,F(SourcePath,"o")),
    Y_plugins = lists:map(FB,F(SourcePath,"y")),
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
		      maybe_load_file(Module,Acc)
	      end
      end,
      [],
      PluginList).
	      

maybe_load_file(Module,Acc) ->	      
    case code:load_file(Module) of
	{error,_} ->
	    Acc;
	{module,_} ->
	    [ Module | Acc]
    end.
	
