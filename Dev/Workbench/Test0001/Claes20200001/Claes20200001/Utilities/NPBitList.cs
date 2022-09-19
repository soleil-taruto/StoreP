using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Charlotte.Utilities
{
	public class NPBitList
	{
		private BitList NegList = new BitList();
		private BitList PstList = new BitList();

		public bool this[long index]
		{
			get
			{
				if (index < 0)
					return this.NegList[-1 - index];
				else
					return this.PstList[index];
			}

			set
			{
				if (index < 0)
					this.NegList[-1 - index] = value;
				else
					this.PstList[index] = value;
			}
		}
	}
}
