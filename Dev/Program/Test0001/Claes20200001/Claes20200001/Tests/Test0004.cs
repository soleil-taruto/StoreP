using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Charlotte.Tests
{
	public class Test0004
	{
		public void Test01()
		{
			double l = 0.0;
			double r = 1.0;

			for (int c = 0; c < 50; c++)
			{
				double m = (l + r) / 2;
				double rate = GetDistanceRate(m);

				if (1.5 < rate)
				{
					l = m;
				}
				else
				{
					r = m;
				}
			}

			{
				double m = (l + r) / 2;
				double millis = 1.0 / m;

				DateTime t = new DateTime(2022, 1, 1, 12, 0, 0);
				t -= TimeSpan.FromMilliseconds(millis);

				Console.WriteLine(t.ToString("HH:mm:ss.fff"));
			}
		}

		private static double GetDistanceRate(double snowPerMillis)
		{
			double snow = 1.0;
			double d = 0.0;

			for (int t = 0; t < 3600000; t++)
			{
				d += 1.0 / snow;
				snow += snowPerMillis;
			}
			double d1 = d;

			for (int t = 0; t < 3600000; t++)
			{
				d += 1.0 / snow;
				snow += snowPerMillis;
			}
			double d2 = d;

			return d2 / d1;
		}
	}
}
