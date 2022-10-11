using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Charlotte.Tests
{
	public class Test0002
	{
		public void Test01()
		{
			for (double sps = 0.00001; sps <= 0.001; sps += 0.00001)
			{
				Test01_a(sps);
			}
		}

		private void Test01_a(double sps)
		{
			double m = 0;
			double s = 1.0;

			for (int t = 0; t < 3600; t++)
			{
				m += 1.0 / s;
				s += sps;
			}
			double m1 = m;

			for (int t = 0; t < 3600; t++)
			{
				m += 1.0 / s;
				s += sps;
			}
			double m2 = m;

			Console.WriteLine(sps.ToString("F5") + " ==> " + (m2 / m1).ToString("F3"));
		}

		public void Test02()
		{
			double l = 0.0;
			double r = 0.001;

			for (int c = 0; c < 100; c++)
			{
				double m = (l + r) / 2;
				double rate = Test02_a(m);

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
				double s = 1.0 / m;

				Console.WriteLine(s.ToString("F9"));

				DateTime t = new DateTime(2022, 1, 1, 12, 0, 0);
				t -= TimeSpan.FromSeconds(s);

				Console.WriteLine(t);
			}
		}

		private double Test02_a(double sps)
		{
			double m = 0;
			double s = 1.0;

			for (int t = 0; t < 3600; t++)
			{
				m += 1.0 / s;
				s += sps;
			}
			double m1 = m;

			for (int t = 0; t < 3600; t++)
			{
				m += 1.0 / s;
				s += sps;
			}
			double m2 = m;

			return m2 / m1;
		}
	}
}
