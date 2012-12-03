-module(mrz_transform_tests).
-include_lib("eunit/include/eunit.hrl").

rev2_test() ->
    ?assertEqual("first dnoces",mrz_transform:rev2("first second")).

cap2H_test() ->
    ?assertEqual("first SECOND",mrz_transform:cap2H("first second")).
