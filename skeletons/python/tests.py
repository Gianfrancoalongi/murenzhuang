import unittest
import sys
import os
import std

class MyTest(unittest.TestCase):
    
    def test_root_program(self):
        sys.stdout = open('std_out_result', 'w')
        std.input("hello world")
        sys.stdout.close()
        self.assertEqual( in_stdout(), "hello world\n")
        
    def tearDown(self):
        os.remove('std_out_result')

def in_stdout():
    return open('std_out_result', 'r').read()

def main():
    unittest.main()

if __name__ == '__main__':
    main()
