-module(mrz_output_tests).
-include_lib("eunit/include/eunit.hrl").

data_test() ->
    ?assertEqual("hello world",mrz_output:data()).
    
