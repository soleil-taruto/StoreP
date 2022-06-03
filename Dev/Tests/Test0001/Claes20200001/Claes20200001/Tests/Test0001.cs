using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Drawing;
using Charlotte.Commons;

namespace Charlotte.Tests
{
	public class Test0001
	{
		public void Test01()
		{
			Console.WriteLine(((int)'\0').ToString()); // 0

			Console.WriteLine(((int)'\b').ToString()); // 8
			Console.WriteLine(((int)'\t').ToString()); // 9
			Console.WriteLine(((int)'\n').ToString()); // 10
			Console.WriteLine(((int)'\v').ToString()); // 11
			Console.WriteLine(((int)'\f').ToString()); // 12
			Console.WriteLine(((int)'\r').ToString()); // 13

			Console.WriteLine(((int)'"').ToString()); // 34
			Console.WriteLine(((int)'\'').ToString()); // 39
			Console.WriteLine(((int)'\\').ToString()); // 92
			Console.WriteLine(((int)'`').ToString()); // 96
		}
	}
}
