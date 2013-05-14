SHELL=/bin/bash
JUNIT=libs/junit-4.11.jar
HAMCREST=libs/hamcrest-core-1.3.jar
DIRS={src,test}
REMOVE={.class,~}

all: clean compile test

clean:
	@rm -f ${DIRS}/*${REMOVE} &> /dev/null

compile:
	@javac -Xlint -classpath ".:${JUNIT}:${HAMCREST}:" ${DIRS}/*.java

.PHONY: test
test:
	@java -classpath ".:${JUNIT}:${HAMCREST}:${DIRS}" org.junit.runner.JUnitCore test.MrzTests
