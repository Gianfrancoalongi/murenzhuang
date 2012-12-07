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
    
plugin_loader_compiles_pluins_test() ->
    Plugins_path = "../priv/plugins",
    Res = mrz_plugin_loader:find_plugins(Plugins_path),
    ModNames = mrz_plugin_loader:compile_plugins(Res),
    ?assertEqual({['x_plugin_A','x_plugin_B'],
		  ['o_plugin_E','o_plugin_F'],
		  ['y_plugin_C','y_plugin_D']},
		 ModNames).


plugin_loader_load_compiled_plugins_test() ->
    Plugins_path = "../priv/plugins",
    Res = mrz_plugin_loader:find_plugins(Plugins_path),
    ModNames = mrz_plugin_loader:compile_plugins(Res),

    ?assertEqual(false,code:is_loaded('x_plugin_A')),
    ?assertEqual(false,code:is_loaded('x_plugin_B')),
    ?assertEqual(false,code:is_loaded('o_plugin_E')),
    ?assertEqual(false,code:is_loaded('o_plugin_F')),
    ?assertEqual(false,code:is_loaded('y_plugin_C')),
    ?assertEqual(false,code:is_loaded('y_plugin_D')),

    mrz_plugin_loader:load_compiled_plugins(ModNames),

    ?assertMatch({file,_},code:is_loaded('x_plugin_A')),
    ?assertMatch({file,_},code:is_loaded('x_plugin_B')),
    ?assertMatch({file,_},code:is_loaded('o_plugin_E')),
    ?assertMatch({file,_},code:is_loaded('o_plugin_F')),
    ?assertMatch({file,_},code:is_loaded('y_plugin_C')),
    ?assertMatch({file,_},code:is_loaded('y_plugin_D')),
    
    code:delete('x_plugin_A'),
    code:delete('x_plugin_B'),
    code:delete('o_plugin_E'),
    code:delete('o_plugin_F'),
    code:delete('y_plugin_C'),
    code:delete('y_plugin_D').

query_plugin_support_test() ->
    Plugins_path = "../priv/plugins",
    Res = mrz_plugin_loader:find_plugins(Plugins_path),
    ModNames = mrz_plugin_loader:compile_plugins(Res),

    ?assertEqual(false,mrz_plugin_loader:does_plugin_exist('A')),
    ?assertEqual(false,mrz_plugin_loader:does_plugin_exist('B')),
    ?assertEqual(false,mrz_plugin_loader:does_plugin_exist('C')),
    ?assertEqual(false,mrz_plugin_loader:does_plugin_exist('D')),
    ?assertEqual(false,mrz_plugin_loader:does_plugin_exist('E')),
    ?assertEqual(false,mrz_plugin_loader:does_plugin_exist('F')),

    mrz_plugin_loader:load_compiled_plugins(ModNames),

    ?assertEqual(true,mrz_plugin_loader:does_plugin_exist('A')),
    ?assertEqual(true,mrz_plugin_loader:does_plugin_exist('B')),
    ?assertEqual(true,mrz_plugin_loader:does_plugin_exist('C')),
    ?assertEqual(true,mrz_plugin_loader:does_plugin_exist('D')),
    ?assertEqual(true,mrz_plugin_loader:does_plugin_exist('E')),
    ?assertEqual(true,mrz_plugin_loader:does_plugin_exist('F')),

    ?assertEqual(false,mrz_plugin_loader:does_plugin_exist('H')),
    ?assertEqual(false,mrz_plugin_loader:does_plugin_exist('I')).
    
