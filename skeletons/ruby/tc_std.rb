require "./std"
require "test/unit"

class TestMRZ < Test::Unit::TestCase

  def test_root_program
    with_stdout_redirected { stdin("hello world") }
    assert_equal("hello world\n", from_stdin())
  end

  def teardown
    File.delete("std_out_result")
  end

end

def from_stdin
  File.read("std_out_result")
end

def with_stdout_redirected
  old_stdout = $stdout.clone
  $stdout.reopen("std_out_result", "w+")    
  yield
  $stdout.reopen old_stdout
end
