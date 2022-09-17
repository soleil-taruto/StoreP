using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Charlotte.Commons;

namespace Charlotte.Tests
{
	public class Test0005
	{
		/// <summary>
		/// 足し算
		/// </summary>
		public void Test01()
		{
			for (int testcnt = 0; testcnt < 1000000; testcnt++)
			{
				ulong a = SCommon.CRandom.GetULong();
				ulong b = SCommon.CRandom.GetULong();

				ulong ans1 = Test01_b1(a, b);
				ulong ans2 = Test01_b2(a, b);

				if (ans1 != ans2)
					throw null;
			}
			Console.WriteLine("OK!");
		}

		private ulong Test01_b1(ulong a, ulong b)
		{
			while (b != 0)
			{
				ulong na = a ^ b;
				b = (a & b) << 1;
				a = na;
			}
			return a;
		}

		private ulong Test01_b2(ulong a, ulong b)
		{
			unchecked
			{
				return a + b;
			}
		}

		/// <summary>
		/// 掛け算
		/// </summary>
		public void Test02()
		{
			for (int testcnt = 0; testcnt < 1000000; testcnt++)
			{
				ulong a = SCommon.CRandom.GetULong();
				ulong b = SCommon.CRandom.GetULong();

				ulong ans1 = Test02_b1(a, b);
				ulong ans2 = Test02_b2(a, b);

				if (ans1 != ans2)
					throw null;
			}
			Console.WriteLine("OK!");
		}

		private ulong Test02_b1(ulong s, ulong e)
		{
			ulong a = 0;

			for (; e != 0; e >>= 1)
			{
				if ((e & 1) != 0)
				{
					ulong b = s;

					while (b != 0)
					{
						ulong na = a ^ b;
						b = (a & b) << 1;
						a = na;
					}
				}
				s <<= 1;
			}
			return a;
		}

		private ulong Test02_b2(ulong a, ulong b)
		{
			unchecked
			{
				return a * b;
			}
		}

		/// <summary>
		/// 引き算
		/// </summary>
		public void Test03()
		{
			for (int testcnt = 0; testcnt < 1000000; testcnt++)
			{
				ulong a = SCommon.CRandom.GetULong();
				ulong b = SCommon.CRandom.GetULong();

				ulong ans1 = Test03_b1(a, b);
				ulong ans2 = Test03_b2(a, b);

				if (ans1 != ans2)
					throw null;
			}
			Console.WriteLine("OK!");
		}

		private ulong Test03_b1(ulong a, ulong b)
		{
			throw new NotImplementedException();
		}

		private ulong Test03_b2(ulong a, ulong b)
		{
			throw new NotImplementedException();
		}
	}
}
