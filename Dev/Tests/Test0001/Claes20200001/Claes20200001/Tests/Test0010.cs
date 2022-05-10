using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Charlotte.Commons;

namespace Charlotte.Tests
{
	public class Test0010
	{
		public void Test01()
		{
			for (int count = 1; count < 10000; count++)
			{
				Test01_a(count);
			}

			Console.WriteLine("OK!");
		}

		private void Test01_a(int count)
		{
			string[] lines = new string[count];

			lines[0] = "Ines";

			// ----

			int range;
			for (range = 2; range <= count; range *= 2)
			{
				CopyRangeToPoint(lines, 0, range / 2, range / 2);
			}
			range /= 2;
			if (range < count)
			{
				CopyRangeToPoint(lines, 0, count - range, range);
			}

			// ----

			if (lines.Any(v => v == null)) throw null; // assert
		}

		private void CopyRangeToPoint<T>(T[] list, int startPoint, int endPoint, int outputStartPoint)
		{
			for (int c = 0; ; c++)
			{
				int p = startPoint + c;
				int q = outputStartPoint + c;

				if (endPoint <= p)
					break;

				if (list[p] == null) throw null; // assert
				if (list[q] != null) throw null; // assert

				list[q] = list[p];
			}
		}
	}
}
