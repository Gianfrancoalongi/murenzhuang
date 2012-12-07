-module(mrz_tests).
-include_lib("eunit/include/eunit.hrl").

mrz_options_test_() ->
    {foreach,
     fun setup/0,
     fun cleanup/1,
     [
      fun no_option_test_function/1,      
      fun rev2_test_function/1,
      fun revwhole_test_function/1,
      fun capHT_test_function/1
     ]}.

capHT_test_function(FileHandle) ->
    fun() ->
	    group_leader(FileHandle,self()),
	    mrz:run([capHT]),
	    {ok,Res} = file:read_file("test_res.txt"),
	    ?assertEqual(<<"HELLO WORLD">>,Res)
    end.

revwhole_test_function(FileHandle) ->
    fun() ->
	    group_leader(FileHandle,self()),
	    mrz:run([revwhole]),
	    {ok,Res} = file:read_file("test_res.txt"),
	    ?assertEqual(<<"dlrow olleh">>,Res)
    end.

rev2_test_function(FileHandle) ->
    fun() ->
	    group_leader(FileHandle,self()),
	    mrz:run([rev2]),
	    {ok,Res} = file:read_file("test_res.txt"),
	    ?assertEqual(<<"hello dlrow">>,Res)
    end.


no_option_test_function(FileHandle) ->
    fun() ->
	    group_leader(FileHandle,self()),
	    mrz:run([]),
	    {ok,Res} = file:read_file("test_res.txt"),
	    ?assertEqual(<<"hello world">>,Res)
    end.

setup() ->
    setup_json_file(),
    {ok,F} = file:open("test_res.txt",[write]),
    F.

cleanup(FileHandle) ->
    remove_json_file(),
    file:close(FileHandle),
    file:delete("test_rest.txt").

setup_json_file() ->
    Input = "{ \"data\": \"hello world json file\" }",
    file:write_file("./input_data.json",Input).

remove_json_file() ->
    file:delete("./input_data.json").
