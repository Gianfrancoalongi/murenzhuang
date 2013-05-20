.PHONY: test

all: test
	@echo "Done"

clean: clean-deps
	@rm src/*.o test/stdtest

clean-deps:
	@rm -fr libs/*
	@rm -fr files/cppunit-1.12.1

libs/lib/libcppunit.a:
	cd files;tar zxvf cppunit-1.12.1.tar.gz; cd cppunit-1.12.1;./configure --prefix=${CURDIR}/libs;make;make install

test: test/stdtest
	./test/stdtest


test/stdtest: libs/lib/libcppunit.a src/Std.o test/main.cpp test/StdTest.cpp
	g++ test/StdTest.cpp test/main.cpp src/Std.o libs/lib/libcppunit.a -I libs/include -I src -o test/stdtest


src/Std.o: src/Std.cpp
	g++ -c  src/Std.cpp -o src/Std.o
