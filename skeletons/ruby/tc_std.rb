require "./std"
require "test/unit"

class TestMRZ < Test::Unit::TestCase

  def test_root_program
    old_stdout = $stdout.clone
    $stdout.reopen("std_out_result", "w+")    
    stdin("hello world")
    $stdout.reopen old_stdout
    assert_equal("hello world\n", from_stdin())
  end

  def teardown
    File.delete("std_out_result")
  end

end

def from_stdin
  File.read("std_out_result")
end
