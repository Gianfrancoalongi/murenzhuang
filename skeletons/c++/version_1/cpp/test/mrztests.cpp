#include <gtest/gtest.h>

#include <string>
#include <iostream>
#include "std.hpp"

using namespace std;
class ScopedCout
{
   streambuf*  _old_cout;
   public:
    explicit ScopedCout(stringstream*  buffer) : _old_cout(cout.rdbuf())
    { cout.rdbuf(buffer->rdbuf()); }

    ~ScopedCout() { cout.rdbuf(_old_cout); }
};




TEST(Std, Input_is_Hello_____ExpectingSmoothSailing)
{
   stringstream buffer;   
   ScopedCout guard(&buffer);

   StdLibrary::input("Hello World");
   ASSERT_STREQ(buffer.str().c_str(), "Hello World");
} 



TEST(Std, NonEmptyCout_Clearing__ExpectingEmpty)
{
   stringstream buffer;   
   ScopedCout guard(&buffer);
   StdLibrary::input("Hello World");
   ASSERT_STREQ(buffer.str().c_str(), "Hello World");
   ASSERT_STREQ(buffer.str().c_str(), "Hello World");
   buffer.str("");
   ASSERT_STREQ(buffer.str().c_str(), "");
} 
