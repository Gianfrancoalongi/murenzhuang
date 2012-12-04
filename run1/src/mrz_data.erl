-module(mrz_data).
-export([hello_world/0,
	 from_json/1
	]).

hello_world() ->
    "hello world".

from_json(String) ->
    {struct,Proplist} = mochijson2:decode(String),
    binary_to_list(proplists:get_value(<<"data">>,Proplist)).
    
