-module(mrz_data_tests).
-include_lib("eunit/include/eunit.hrl").

hello_world_test() ->
    ?assertEqual("hello world",mrz_data:hello_world()).

from_json_test() ->
    Input = "{\"data\":\"json string\"}",
    ?assertEqual("json string",mrz_data:from_json(Input)).
