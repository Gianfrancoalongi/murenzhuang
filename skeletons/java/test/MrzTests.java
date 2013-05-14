package test;

import src.*;
import org.junit.*;
import org.hamcrest.*;
import java.io.*;
import static org.junit.Assert.*;

public class MrzTests
{
    @Test
    public void root_program()
    {	
	ByteArrayOutputStream bas = new ByteArrayOutputStream();
	System.setOut(new PrintStream(bas));
	Std.in("hello world");
	System.setOut(new PrintStream(new FileOutputStream(FileDescriptor.out)));
	assertTrue(bas.toString().equals("hello world\n"));
    }

}