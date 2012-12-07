-module(mrz).
-export([run/1]).

run(Options) ->
    Features = load_plugins(),
    X = choose_X(Features,Options),
    Os = choose_Os(Features,Options),
    Y = choose_Y(Features,Options),
    Y:act(seq_apply(Os, X:act())).

load_plugins() ->
    Found = mrz_plugin_loader:find_plugins("../priv/"),
    Comp =  mrz_plugin_loader:compile_plugins(Found),
    mrz_plugin_loader:load_compiled_plugins(Comp),
    Comp.

seq_apply(Fs,X) ->
    lists:foldl(fun(F,R) -> F:act(R) end,X,Fs).

choose_X({X_plugins,_,_},Options) ->
    hd(find_matching(X_plugins,Options)).

choose_Os({_,O_plugins,_},Options) ->
    find_matching(O_plugins,Options).

choose_Y({_,_,Y_plugins},Options) ->
    hd(find_matching(Y_plugins,Options)).

find_matching([],_) -> [];
find_matching([Plugin|T],Options) ->
    Feature = mrz_plugin_loader:plugin_to_feature_name(Plugin),
    case lists:member(Feature,Options) of
	true ->
	    [ Plugin | find_matching(T,Options) ];
	false ->
	    find_matching(T,Options)
    end.
	
