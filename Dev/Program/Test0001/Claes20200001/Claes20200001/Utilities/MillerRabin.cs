﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Charlotte.Utilities
{
	public static class MillerRabin
	{
		public static bool IsPrime(ulong n)
		{
			if (n <= 61)
				return new uint[] { 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61 }.Contains((uint)n);

			if (n % 2 == 0)
				return false;

			// if n < 4759123141, it is enough to test a = 2, 7, and 61.
			// if n < 2^64, it is enough to test a = 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, and 37.

			ulong d = n;
			int r;
			for (r = 0; ((d >>= 1) & 1) == 0; r++) ;

			if (n <= uint.MaxValue)
				return !new uint[] { 2, 7, 61 }
					.Any(x => !MillerRabinTest32(x, (uint)d, r, (uint)n));
			else
				return !new uint[] { 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37 }
					.Any(x => !MillerRabinTest64((ulong)x, d, r, n));
		}

		private static bool MillerRabinTest32(uint x, uint d, int r, uint n)
		{
			x = ModPow32(x, d, n);

			if (x != 1 && x != n - 1)
			{
				for (int s = r; ; s--)
				{
					if (s <= 0)
						return false;

					x = (uint)(((ulong)x * x) % n);

					if (x == n - 1)
						break;
				}
			}
			return true;
		}

		private static uint ModPow32(uint b, uint e, uint m)
		{
			uint a = 1;

			for (; 1 <= e; e >>= 1)
			{
				if ((e & 1) != 0)
					a = (uint)(((ulong)a * b) % m);

				b = (uint)(((ulong)b * b) % m);
			}
			return a;
		}

		private static bool MillerRabinTest64(ulong x, ulong d, int r, ulong n)
		{
			x = ModPow64(x, d, n);

			if (x != 1 && x != n - 1)
			{
				for (int c = r; ; c--)
				{
					if (c <= 0)
						return false;

					x = ModPow64(x, 2, n);

					if (x == n - 1)
						break;
				}
			}
			return true;
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

		private static ulong ModMul64(ulong a, ulong b, ulong m)
		{
			throw new NotImplementedException();
		}
	}
}
