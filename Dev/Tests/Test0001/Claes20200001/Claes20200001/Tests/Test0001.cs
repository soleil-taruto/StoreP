using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Drawing;
using Charlotte.Commons;
using Charlotte.Utilities;

namespace Charlotte.Tests
{
	public class Test0001
	{
		public void Test01()
		{
			BitList bits = new BitList();

			Console.WriteLine("[" + new string(bits.Iterate().Select(bit => bit ? '1' : '0').ToArray()) + "]");

			bits[5] = true;
			bits[10] = true;
			bits[15] = true;
			bits[20] = true;
			bits[25] = true;
			bits[30] = true;
			bits[35] = true;

			Console.WriteLine("[" + new string(bits.Iterate().Select(bit => bit ? '1' : '0').ToArray()) + "]");

			bits = new BitList();
			bits[31] = true;
			bits[32] = true;

			Console.WriteLine("[" + new string(bits.Iterate().Select(bit => bit ? '1' : '0').ToArray()) + "]");

			bits[32] = false;

			Console.WriteLine("[" + new string(bits.Iterate().Select(bit => bit ? '1' : '0').ToArray()) + "]");

			bits[31] = false;

			Console.WriteLine("[" + new string(bits.Iterate().Select(bit => bit ? '1' : '0').ToArray()) + "]");
		}
	}
}
