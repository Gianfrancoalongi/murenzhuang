-module(mrz_plugin_loader_tests).
-include_lib("eunit/include/eunit.hrl").

plugin_loader_sees_plugins_test() ->
    Plugins_path = "../priv/plugins/",
    Res = mrz_plugin_loader:find_plugins(Plugins_path),
    ?assertEqual({["../priv/plugins/x_plugin_A.erl",
		   "../priv/plugins/x_plugin_B.erl"],
		  ["../priv/plugins/o_plugin_E.erl",
		   "../priv/plugins/o_plugin_F.erl"],
		  ["../priv/plugins/y_plugin_C.erl",
		   "../priv/plugins/y_plugin_D.erl"]},
		 Res).
    
