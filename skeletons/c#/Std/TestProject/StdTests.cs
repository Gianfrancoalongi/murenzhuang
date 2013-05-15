using System;
using System.Text;
using System.Collections.Generic;
using System.Linq;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.IO;
using StdLibrary;

[TestClass]
public class Std_Tests
{
    [TestMethod]
    public void StdTest1()
    {
        using (var writer = new StringWriter(new StringBuilder()))
        {
            Console.SetOut(writer);

            Std.input("Hello world!");

            Assert.AreEqual("Hello world!", writer.ToString());
        }
    }
}
