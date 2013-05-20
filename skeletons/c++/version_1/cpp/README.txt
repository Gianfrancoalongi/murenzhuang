To compile and use the tests

1. Unzip the gtest.zip. After zip the location of the contents should be in a folder cpp/libs/gtest/

2. In the cpp directory create a new folder named 'build'
3. From the 'build' folder run command "cmake .."
   This will create necessary build files for whatever platform you are running on and put these temporary files in the build directory. 

4. Next build step is platform dependent
  linux: cmake ..; make
  
  windows: cmake -G "Visual Studio 11" ..
           msbuild murenzhuang.sln


### Mac or Linux with Clang - not yet configured.
