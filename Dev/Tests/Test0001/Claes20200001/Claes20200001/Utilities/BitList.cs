using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Charlotte.Utilities
{
	public class BitList
	{
		private List<uint> Inner = new List<uint>();

		public BitList()
		{ }

		public BitList(IEnumerable<bool> data)
		{
			uint index = 0u;

			foreach (bool value in data)
			{
				this[index++] = value;
			}
		}

		public bool this[uint index]
		{
			get
			{
				if (this.Inner.Count <= index / 32)
					return false;

				return (this.Inner[(int)(index / 32)] & (1u << (int)(index % 32))) != 0u;
			}

			set
			{
				while (this.Inner.Count <= index / 32)
					this.Inner.Add(0u);

				if (value)
					this.Inner[(int)(index / 32)] |= 1u << (int)(index % 32);
				else
					this.Inner[(int)(index / 32)] &= ~(1u << (int)(index % 32));
			}
		}

		public IEnumerable<bool> Iterate()
		{
			this.P_Trim();

			for (int index = 0; index < this.Inner.Count; index++)
			{
				for (int bit = 0; bit < 32; bit++)
				{
					yield return (this.Inner[index] & (1u << bit)) != 0u;
				}
			}
		}

		private void P_Trim()
		{
			while (1 <= this.Inner.Count && this.Inner[this.Inner.Count - 1] == 0u)
			{
				this.Inner.RemoveAt(this.Inner.Count - 1);
			}
		}
	}
}
