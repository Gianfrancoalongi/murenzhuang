-module(mrz_transform_tests).
-include_lib("eunit/include/eunit.hrl").

rev2_test() ->
    ?assertEqual("first dnoces",mrz_transform:rev2("first second")).
