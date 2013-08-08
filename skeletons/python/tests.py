import unittest
from cStringIO import StringIO

import mock

import std


class MyTest(unittest.TestCase):
    def setUp(self):
        self.stdout = mock.patch('sys.stdout', new_callable=StringIO).start()

    def tearDown(self):
        mock.patch.stopall()

    def test_root_program(self):
        std.input("hello world")
        self.assertEqual('hello world\n', self.stdout.getvalue())


def main():
    unittest.main()

if __name__ == '__main__':
    main()
