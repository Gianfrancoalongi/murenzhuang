-module(mrz_tests).
-include_lib("eunit/include/eunit.hrl").

mrz_run_nooptions_test_() ->
    {setup,
     fun setup/0,
     fun cleanup/1,
     fun no_option_test_function/1}.

no_option_test_function(FileHandle) ->
    fun() ->
	    group_leader(FileHandle,self()),
	    mrz:run([]),
	    {ok,Res} = file:read_file("test_res.txt"),
	    ?assertEqual(<<"hello world">>,Res)
    end.

setup() ->
    {ok,F} = file:open("test_res.txt",[write]),
    F.

cleanup(FileHandle) ->
    file:close(FileHandle),
    file:delete("test_rest.txt").
