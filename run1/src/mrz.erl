-module(mrz).
-export([run/1]).

run(Options) ->
    X = choose_X(Options),
    Os = choose_Os(Options),
    Result = seq_apply(Os,X()),
    io:format("~s",[Result]).    

seq_apply([],X) -> 
    X;
seq_apply([F|T],X) ->
    seq_apply(T,F(X)).

choose_X([]) ->
    fun mrz_data:hello_world/0;
choose_X([_|T]) ->
    choose_X(T).

choose_Os([]) -> 
    [fun mrz_transform:id/1];
choose_Os(Options) ->
    O_lookup = [
		{rev2,fun mrz_transform:rev2/1},
		{rev2H,fun mrz_transform:rev2H/1},
		{cap2H,fun mrz_transform:cap2H/1},
		{cap1H,fun mrz_transform:cap1H/1}
	       ],
    [ proplists:get_value(Opt,O_lookup) || Opt <- Options].

