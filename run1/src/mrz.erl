-module(mrz).
-export([run/1]).

run(Options) ->    
    Lookup = [{[],fun mrz_transform:id/1},
	      {[rev2],fun mrz_transform:rev2/1},
	      {[rev2H],fun mrz_transform:rev2H/1},
	      {[cap2H],fun mrz_transform:cap2H/1},
	      {[cap1H],fun mrz_transform:cap1H/1}
	     ],
    Fun = proplists:get_value(Options,Lookup),
    io:format("~s",[Fun(mrz_output:data())]).
