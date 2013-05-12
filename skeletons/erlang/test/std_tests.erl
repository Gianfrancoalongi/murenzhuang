-module(std_tests).
-include_lib("eunit/include/eunit.hrl").
-define(STDOUT,"std_out_result").

all_test_() ->
    {foreach,
     fun setup/0,
     fun cleanup/1,
     [fun root_program/1]}.

setup() ->
    {ok,IoDevice} = file:open(?STDOUT,[write]),
    IoDevice.

cleanup(IoDevice) ->
    ok = file:close(IoDevice),
    ok = file:delete(?STDOUT).

root_program(IoDevice) ->
    fun() ->
	    group_leader(IoDevice, self()),
	    std:in("hello world"),
	    ?assertEqual("hello world", in_stdout())
    end.

in_stdout() ->
    {ok,Binary} = file:read_file(?STDOUT),
    binary_to_list(Binary).
