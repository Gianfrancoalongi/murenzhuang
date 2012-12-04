-module(mrz_data_tests).
-include_lib("eunit/include/eunit.hrl").

hello_world_test() ->
    ?assertEqual("hello world",mrz_data:hello_world()).
