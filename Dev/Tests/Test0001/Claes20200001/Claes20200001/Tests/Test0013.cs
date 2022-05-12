﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;
using Charlotte.Commons;

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

				Console.WriteLine(snowCoverPerSec.ToString("F30"));

				// ----

				int t = 12 * 3600;
				int ss = (int)(1.0 / snowCoverPerSec);

				t -= ss;

				int h = t / 3600;
				int m = (t / 60) % 60;
				int s = t % 60;

				Console.WriteLine(string.Format("雪が降り始めた時刻 ⇒ {0:D2}:{1:D2}:{2:D2} a.m.", h, m, s));
			}
		}

		public void Test04()
		{
			const double snowCoverPerSec = 0.0001;

			int l = 0;
			int r = 3600 * 12;

			while (l + 1 < r)
			{
				int snowBeganSec = (l + r) / 2;
				double m1 = 0.0;
				double m2 = 0.0;

				for (int sec = 0; sec < 3600 * 2; sec++)
				{
					double snow = (snowBeganSec + sec) * snowCoverPerSec;
					double m = 1.0 / snow;

					if (sec < 3600)
						m1 += m;
					else
						m2 += m;
				}

				if (m1 / m2 < 2.0)
					r = snowBeganSec;
				else
					l = snowBeganSec;
			}

			{
				int snowBeganSec = (l + r) / 2;

				Console.WriteLine(snowBeganSec);

				// ----

				int t = 12 * 3600 - snowBeganSec;

				int h = t / 3600;
				int m = (t / 60) % 60;
				int s = t % 60;

				Console.WriteLine(string.Format("雪が降り始めた時刻 ⇒ {0:D2}:{1:D2}:{2:D2} a.m.", h, m, s));
			}
		}

		public void Test05()
		{
			const double snowCoverPerSec = 0.0001;

			double[] ms = new double[3600 * 14];

			for (int sec = 0; sec < ms.Length; sec++)
			{
				double snow = sec * snowCoverPerSec;
				double m = 1.0 / snow;

				Console.WriteLine(sec + " ==> " + m.ToString("F9"));

				ms[sec] = m;
			}
			for (int sec = 0; sec < ms.Length - 3600 * 2; sec++)
			{
				double m1 = 0.0;
				double m2 = 0.0;

				for (int c = 0; c < 3600; c++)
				{
					m1 += ms[sec + c];
					m2 += ms[sec + 3600 + c];
				}

				Console.WriteLine(sec + " ==> " + (m1 / m2).ToString("F3"));
			}

			// ----

			for (int sec = 0; sec < ms.Length - 3600 * 2; sec++)
			{
				double m1 = 0.0;
				double m2 = 0.0;

				for (int c = 0; c < 3600; c++)
				{
					m1 += ms[sec + c];
					m2 += ms[sec + 3600 + c];
				}

				double rateOfM1M2 = m1 / m2;

				// 目指すレートは rateOfM1M2 == 2.0
				//
				if (1.995 < rateOfM1M2 && rateOfM1M2 < 2.005)
				{
					int t = 12 * 3600 - sec;

					int h = t / 3600;
					int m = (t / 60) % 60;
					int s = t % 60;

					Console.WriteLine(string.Format("雪が降り始めた時刻 {0:D2}:{1:D2}:{2:D2} a.m. のとき ⇒ {3:F6}", h, m, s, rateOfM1M2));
				}
			}
		}

		public void Test06()
		{
			using (WorkingDir wd = new WorkingDir())
			{
				string file = wd.MakePath();

				Console.WriteLine(file);

				File.WriteAllBytes(file, SCommon.EMPTY_BYTES);
				//SCommon.DeletePath(file);

				Common.Pause();
			}
		}

		public void Test07()
		{
			for (int c = 0; c < 5; c++)
			{
				using (WorkingDir wd = new WorkingDir())
				{
					for (int d = 0; d < 5; d++)
					{
						Console.WriteLine(wd.MakePath());
					}
				}
			}
		}

		public void Test08()
		{
			Console.WriteLine("Hello, Happy World!");
		}
	}
}
