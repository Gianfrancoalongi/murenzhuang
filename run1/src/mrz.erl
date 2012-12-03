-module(mrz).
-export([run/1]).

run([]) ->
    io:format("~s",[mrz_output:data()]).
