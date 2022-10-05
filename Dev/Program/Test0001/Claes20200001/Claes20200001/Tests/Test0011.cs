﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;
using System.Security.Cryptography;
using Charlotte.Commons;

namespace Charlotte.Tests
{
	public class Test0011
	{
		public void Test01()
		{
			List<string> lines = new List<string>();

			foreach (char chr in Enumerable.Range(0, 65536))
			{
				string str = new string(new char[] { chr });
				string strL = str.ToLower();
				string strU = str.ToUpper();

				if (str != strL || str != strU)
				{
					Console.WriteLine(string.Join(", "
						, ((int)chr).ToString("x4")
						, ((int)strL[0]).ToString("x4")
						, ((int)strU[0]).ToString("x4")
						));

					lines.Add("[" + str + "] -> [" + strL + "] , [" + strU + "]");
				}
			}

			File.WriteAllLines(SCommon.NextOutputPath() + ".txt", lines, Encoding.UTF8);
		}

		public void Test02()
		{
			long testNumer = 0;
			long testDenom = 0;

			ulong rP2 = (ulong)uint.MaxValue * uint.MaxValue;

			for (; ; )
			{
				uint x = SCommon.CRandom.GetUInt();
				uint y = SCommon.CRandom.GetUInt();

				ulong xP2 = (ulong)x * x;
				ulong yP2 = (ulong)y * y;

				if (xP2 < rP2 - yP2)
				{
					testNumer++;
				}
				testDenom++;

				if (testDenom % 10000 == 0)
				{
					double rate = (double)testNumer / testDenom;

					Console.WriteLine(rate.ToString("F9") + " = " + testNumer + " / " + testDenom + " ==> " + (rate * 4.0).ToString("F9"));
				}
			}
		}

		public void Test03()
		{
			for (int d = 1; ; d++)
			{
				double m = 1.0;
				double x = 1.0 + 1.0 / d;

				for (int c = 0; c < d; c++)
					m *= x;

				Console.WriteLine(d + " ==> " + m.ToString("F9"));
			}
		}

		private RandomNumberGenerator Csprng = new RNGCryptoServiceProvider();

		private ulong GetULongRand()
		{
			byte[] data = new byte[8];
			ulong value = 0;

			Csprng.GetBytes(data);

			foreach (byte b in data)
			{
				value <<= 8;
				value |= b;
			}
			return value;
		}

		private ulong GetULongRandNonZero()
		{
			ulong value;

			do
			{
				value = GetULongRand();
			}
			while (value == 0);

			return value;
		}

		public void Test04()
		{
			for (int testcnt = 0; testcnt < 100; testcnt++)
			{
				ulong a = GetULongRand();
				ulong b = GetULongRand();
				ulong m = GetULongRandNonZero();
				ulong c = ModPow64(a, b, m);

				Console.WriteLine("ModPow ( " + a + " , " + b + " , " + m + " ) == " + c);
			}
		}

		private static ulong ModPow64(ulong b, ulong e, ulong m)
		{
			ulong a = 1;

			for (; 1 <= e; e >>= 1)
			{
				if ((e & 1) != 0)
					a = ModMul64(a, b, m);

				b = ModMul64(b, b, m);
			}
			return a;
		}

		private static ulong ModMul64(ulong b, ulong e, ulong m)
		{
			ulong a = 0;

			for (; 1 <= e; e >>= 1)
			{
				if ((e & 1) != 0)
					a = ModAdd64(a, b, m);

				b = ModAdd64(b, b, m);
			}
			return a;
		}

		private static ulong ModAdd64(ulong a, ulong b, ulong m)
		{
			ulong r = (ulong.MaxValue % m + 1) % m;

			while (ulong.MaxValue - a < b)
			{
				unchecked { a += b; }
				b = r;
			}
			return (a + b) % m;
		}
	}
}
