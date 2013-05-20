#include <gtest/gtest.h>
#include <iostream>

int main(int argc, char *argv[])
{
  testing::InitGoogleTest(&argc, argv);
  int return_value = RUN_ALL_TESTS();
  return return_value;
}
