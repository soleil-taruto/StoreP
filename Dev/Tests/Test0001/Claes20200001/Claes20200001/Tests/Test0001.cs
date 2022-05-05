﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Drawing;
using Charlotte.Commons;
using Charlotte.Utilities;
using System.IO;

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

		public void Test02()
		{
			Canvas canvas = new Canvas(1000, 1000);

			canvas.Fill(new I4Color(255, 255, 160, 255));
			canvas.FillRect(new I4Color(255, 255, 128, 255), new I4Rect(250, 250, 500, 500));
			canvas.DrawString("CD", 1000, "Impact", FontStyle.Regular, new I3Color(0, 0, 255), new I4Rect(250, 250, 500, 500), 10);

			canvas.Save(Common.NextOutputPath() + ".png");
		}

		public void Test03()
		{
			Test03_a(@"

{
	Integer: 123,
	Float: -123.456,
	String: ""ABC"",
	Boolean: true,
	Map: {
		aaa: 1,
		bbb: 2,
		ccc: 3
	},
	Array: [ 1, 2, 3 ]
}

");

			Test03_a("[[[[[[[[[[ 123 ]]]]]]]]]]");
			Test03_a("{ a: { a: { a: { a: { a: { a: { a: { a: { a: { a: 123 }}}}}}}}}}");
		}

		private void Test03_a(string json)
		{
			JsonNode root = JsonNode.Load(json);

			root.WriteToFile(Common.NextOutputPath() + ".json");
		}

		public void Test04()
		{
			Test04_a(@"

<root>
	<Integer>123</Integer>
	<Float>-123.456</Float>
	<String>ABC</String>
	<Boolean>true</Boolean>
	<Map>
		<Value>1</Value>
		<Value>2</Value>
		<Value>3</Value>
	</Map>
	<Array><Element>1</Element><Element>2</Element><Element>3</Element></Array>
</root>

");

			Test04_a("<a/>");
			Test04_a("<a></a>");
		}

		private void Test04_a(string xml)
		{
			using (WorkingDir wd = new WorkingDir())
			{
				string file = wd.MakePath();
				File.WriteAllText(file, xml, Encoding.UTF8);

				XMLNode root = XMLNode.LoadFromFile(file);

				root.WriteToFile(Common.NextOutputPath() + ".xml");
			}
		}
	}
}
