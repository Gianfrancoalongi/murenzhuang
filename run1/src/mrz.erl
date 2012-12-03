-module(mrz).
-export([run/1]).

run([]) ->
    io:format("~s",[mrz_output:data()]);
run([rev2]) ->
    Output = mrz_transform:rev2(mrz_output:data()),
    io:format("~s",[Output]).
