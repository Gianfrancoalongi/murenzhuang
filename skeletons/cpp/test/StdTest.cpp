#include <cppunit/config/SourcePrefix.h>
#include "StdTest.h"
#include "Std.h"

#include <iostream>
#include <streambuf>

CPPUNIT_TEST_SUITE_REGISTRATION( StdTestCase );


void StdTestCase::in()
{
  std::streambuf* oldCoutStreamBuf = std::cout.rdbuf();
  std::ostringstream output;

  std::cout.rdbuf( output.rdbuf() );

  Std::in("Hello World");

  std::cout.rdbuf( oldCoutStreamBuf);

  CPPUNIT_ASSERT_EQUAL( std::string(output.str()), std::string("Hello World"));
}
