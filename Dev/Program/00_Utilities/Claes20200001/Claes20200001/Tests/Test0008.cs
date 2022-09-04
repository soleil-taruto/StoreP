using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Charlotte.Commons;
using Charlotte.Utilities;

namespace Charlotte.Tests
{
	public class Test0008
	{
		public void Test01()
		{
			EditableString es = new EditableString("ABC");

			Console.WriteLine(es);
			es.Add('D');
			Console.WriteLine(es);
			es.Add("EF");
			Console.WriteLine(es);
			es.Insert(3, "123");
			Console.WriteLine(es);
			es.Insert(0, '(');
			Console.WriteLine(es);
			es.Insert(10, ')');
			Console.WriteLine(es);
			es.Remove(4);
			Console.WriteLine(es);
			es.Remove(4, 2);
			Console.WriteLine(es);
			es.Remove(0);
			Console.WriteLine(es);
			es.Remove(6);
			Console.WriteLine(es);

			SCommon.ToThrowPrint(() => es.Insert(7, "xxx"));
			SCommon.ToThrowPrint(() => es.Remove(6));
			SCommon.ToThrowPrint(() => es.Remove(5, 1));
		}
	}
}
