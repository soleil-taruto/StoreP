using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Charlotte.Tests
{
	public class Test0013
	{
		public void Test01()
		{
			"ASAHI-ROKKA".ForEach(chr => Console.WriteLine(chr));
		}

		public void Test02()
		{
			for (double snowCoverPerSec = 0.000445; snowCoverPerSec < 0.000455; snowCoverPerSec += 0.000000001)
			{
				double snow = 1.0;
				double m1 = 0.0;
				double m2 = 0.0;

				for (int sec = 0; sec < 3600 * 2; sec++)
				{
					double mPerSec = 1.0 / snow;

					if (sec < 3600)
						m1 += mPerSec;
					else
						m2 += mPerSec;

					snow += snowCoverPerSec;
				}

				Console.WriteLine(snowCoverPerSec.ToString("F9") + " ==> " + (m1 / m2).ToString("F3"));

				// snowCoverPerSec == 0.00045 あたりで m1 / m2 == 2.0 になるっぽい。
			}
		}

		public void Test03()
		{
			double l = 0.000445;
			double r = 0.000455;

			for (int c = 0; c < 100; c++)
			{
				double snowCoverPerSec = (l + r) / 2;
				double snow = 1.0;
				double m1 = 0.0;
				double m2 = 0.0;

				for (int sec = 0; sec < 3600 * 2; sec++)
				{
					double mPerSec = 1.0 / snow;

					if (sec < 3600)
						m1 += mPerSec;
					else
						m2 += mPerSec;

					snow += snowCoverPerSec;
				}

				if (m1 / m2 < 2.0)
					l = snowCoverPerSec;
				else
					r = snowCoverPerSec;
			}

			{
				double snowCoverPerSec = (l + r) / 2;

				Console.WriteLine(snowCoverPerSec.ToString("F20"));

				// ----

				int t = 12 * 3600;
				int ss = (int)(1.0 / snowCoverPerSec);

				t -= ss;

				int h = t / 3600;
				int m = (t / 60) % 60;
				int s = t % 60;

				Console.WriteLine(string.Format("{0:D2}:{1:D2}:{2:D2}", h, m, s));
			}
		}
	}
}
