-module(mrz_tests).
-include_lib("eunit/include/eunit.hrl").

mrz_options_test_() ->
    {foreach,
     fun setup/0,
     fun cleanup/1,
     [
      fun basic_program_test_function/1,
      fun rev2_test_function/1,
      fun lowerwhole_test_function/1,
      fun lower2_test_function/1,
      fun cap2H_test_function/1,
      fun cap1H_test_function/1
     ]}.

cap1H_test_function(FileHandle) ->
    fun() ->
	    group_leader(FileHandle,self()),
	    mrz:run([helloworld,cap1H,stdout]),
	    {ok,Res} = file:read_file("test_res.txt"),
	    ?assertEqual(<<"HELLO world">>,Res)
    end.	    

cap2H_test_function(FileHandle) ->
    fun() ->
	    group_leader(FileHandle,self()),
	    mrz:run([helloworld,cap2H,stdout]),
	    {ok,Res} = file:read_file("test_res.txt"),
	    ?assertEqual(<<"hello WORLD">>,Res)
    end.

lower2_test_function(FileHandle) ->
    fun() ->
	    group_leader(FileHandle,self()),
	    mrz:run([helloworld,lower2,stdout]),
	    {ok,Res} = file:read_file("test_res.txt"),
	    ?assertEqual(<<"hello world">>,Res)
    end.
    
lowerwhole_test_function(FileHandle) ->
    fun() ->
	    group_leader(FileHandle,self()),
	    mrz:run([helloworld,lowerwhole,stdout]),
	    {ok,Res} = file:read_file("test_res.txt"),
	    ?assertEqual(<<"hello world">>,Res)
    end.

rev2_test_function(FileHandle) ->
    fun() ->
	    group_leader(FileHandle,self()),
	    mrz:run([helloworld,rev2,stdout]),
	    {ok,Res} = file:read_file("test_res.txt"),
	    ?assertEqual(<<"hello dlrow">>,Res)
    end.


basic_program_test_function(FileHandle) ->
    fun() ->
	    group_leader(FileHandle,self()),
	    mrz:run([helloworld,id,stdout]),
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
