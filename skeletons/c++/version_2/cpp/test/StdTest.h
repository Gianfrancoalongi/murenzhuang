#ifndef CPP_UNIT_EXAMPLETESTCASE_H
#define CPP_UNIT_EXAMPLETESTCASE_H

#include <cppunit/extensions/HelperMacros.h>

/* 
 * A test case that is designed to produce
 * example errors and failures
 *
 */

class StdTestCase : public CPPUNIT_NS::TestFixture
{
  CPPUNIT_TEST_SUITE( StdTestCase );
  CPPUNIT_TEST( in );
  CPPUNIT_TEST_SUITE_END();

protected:
  void in();
};


#endif
