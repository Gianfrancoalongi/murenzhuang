-module(mrz).
-export([run/1]).

run([]) ->
    io:format("~s",[mrz_output:data()]);
run([X]) when X == rev2 orelse X == rev2H ->
    Output = mrz_transform:rev2(mrz_output:data()),
    io:format("~s",[Output]).
