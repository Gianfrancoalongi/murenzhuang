-module(mrz_plugin_loader_tests).
-include_lib("eunit/include/eunit.hrl").

plugin_loader_sees_plugins_test() ->
    Plugins_path = "../priv/plugins/",
    Res = mrz_plugin_loader:find_plugins(Plugins_path),
    ?assertEqual({["x_plugin_A.erl","x_plugin_B.erl"],
		  ["o_plugin_E.erl","o_plugin_F.erl"],
		  ["y_plugin_C.erl","y_plugin_D.erl"]},
		 Res).
    
plugin_name_test() ->
    ?assertEqual('Name',mrz_plugin_loader:plugin_to_feature_name(x_plugin_Name)).

plugin_correlation_test_() ->	
    {setup,
     fun create_priv_ebin/0,
     fun cleanup_priv_ebin/1,
     fun load_plugins_test/1
     }.

create_priv_ebin() ->
    Src_path = "../priv/plugins/",
    Beam_path = filename:join(Src_path,"ebin"),
    ok = file:make_dir(Beam_path),
    {Src_path,Beam_path}.

cleanup_priv_ebin({_,Beam_path}) ->
    Beams = filelib:wildcard(filename:join(Beam_path,"*.beam")),
    lists:foreach(fun file:delete/1,Beams),
    file:del_dir(Beam_path).

load_plugins_test({Src_path,Beam_path}) ->
    fun() ->
	    ?assertEqual({[],[],[]},mrz_plugin_loader:load_plugins(Src_path)),
	    compile_src_and_put_into_beam_dir(Src_path,Beam_path),
	    code:add_patha(Beam_path),
	    Res = mrz_plugin_loader:load_plugins(Src_path),
	    ?assertEqual({[x_plugin_A,x_plugin_B]
			  ,[o_plugin_E,o_plugin_F]
			  ,[y_plugin_C,y_plugin_D]}
			 ,Res)
    end.

compile_src_and_put_into_beam_dir(SourcePath,BeamPath) ->
    Src_files = filelib:wildcard(filename:join(SourcePath,"*.erl")),
    lists:foreach(
      fun(File) ->
	      compile:file(File,[{outdir,BeamPath}])
      end,
      Src_files).
