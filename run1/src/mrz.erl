-module(mrz).
-export([run/1]).

run(Options) ->
    X = choose_X(Options),
    O = choose_O(Options),
    io:format("~s",[O(X())]).

choose_X([{input_json,File}]) -> 
    {ok,R} = file:read_file(File),
    fun() -> 
	    mrz_data:from_json(R) 
    end;
choose_X(_) -> 
    fun mrz_data:hello_world/0.

choose_O(Options) ->
    O_lookup = [
		{[rev2],fun mrz_transform:rev2/1},
		{[rev2H],fun mrz_transform:rev2H/1},
		{[cap2H],fun mrz_transform:cap2H/1},
		{[cap1H],fun mrz_transform:cap1H/1}
	       ],
    case proplists:get_value(Options,O_lookup) of
	undefined ->
	    fun mrz_transform:id/1;
	X ->
	    X
    end.
