#  Build instructions:
#  --------------------
#  From directory cpp/build
#  linux: cmake ..; make
#  windows: cmake -G "Visual Studio 11" .. 
#           msbuild murenzhuang.sln

cmake_minimum_required(VERSION 2.8)
project(murenzhuang)

if(UNIX)
   set(CMAKE_CXX_FLAGS "-std=c++11 -Wall -Werror -Wunused  ${CMAKE_CXX_FLAGS_DEBUG} -pthread")
endif()

if (MSVC)
    # VC11 bug for gtest: http://code.google.com/p/googletest/issues/detail?id=408
    #                     https://github.com/anhstudios/swganh/pull/186/files
    ADD_DEFINITIONS (/D_VARIADIC_MAX=10)
    MESSAGE(STATUS "- MSVC: Set variadic max to 10 for MSVC compatibility")
    # Remember to set these 2 target properties if using GTEST similar to done below on the gtest enabled unit-test-binary
    #  i.e 1) set_target_properties(whatever_unit_binary  PROPERTIES COMPILE_DEFINITIONS "_VARIADIC_MAX=10")
    #      2) set_target_properties(whatever_unit_binary  PROPERTIES COMPILE_DEFINITIONS "GTEST_USE_OWN_TR1_TUPLE=0")
   endif ()
   
   
set(GTEST_DIR  libs/gtest)
set(GTEST_INCLUDE_DIRECTORIES ${GTEST_DIR}/include ${GTEST_DIR} ${GTEST_DIR}/src)
include_directories(${GTEST_INCLUDE_DIRECTORIES})
add_library(gtest_160_lib ${GTEST_DIR}/src/gtest-all.cc ${GTEST_DIR}/src/gtest_main.cc)
enable_testing(true)


set(SRC_FILES      src/std.cpp)
set(HEADER_FILES   src/std.hpp)
include_directories(src)


set(TEST_SRC  test/test_main.cpp 
              test/mrztests.cpp)


add_executable(murenzhuang    ${SRC_FILES} ${HEADER_FILES} ${TEST_SRC})
if(MSVC)
    # VC11 BUGFIX : see above
    set_target_properties(murenzhuang  PROPERTIES COMPILE_DEFINITIONS "_VARIADIC_MAX=10")
    set_target_properties(murenzhuang  PROPERTIES COMPILE_DEFINITIONS "GTEST_USE_OWN_TR1_TUPLE=0")
endif()

target_link_libraries(murenzhuang  gtest_160_lib)


