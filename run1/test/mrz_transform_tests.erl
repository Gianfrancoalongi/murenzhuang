-module(mrz_transform_tests).
-include_lib("eunit/include/eunit.hrl").

rev2_test() ->
    ?assertEqual("first dnoces",mrz_transform:rev2("first second")).

cap2H_test() ->
    ?assertEqual("first SECOND",mrz_transform:cap2H("first second")).

id_test() ->
    ?assertEqual("first second",mrz_transform:id("first second")).

revwhole_test() ->
    ?assertEqual("dnoces tsrif",mrz_transform:revwhole("first second")).

capht_test() ->
    ?assertEqual("FIRST second THIRD",mrz_transform:capHT("first second third")).
