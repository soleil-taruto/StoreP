using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Charlotte.Utilities
{
	public class EditableString
	{
		private List<char> _chars;

		public EditableString(string str)
		{
			_chars = str.ToList();
		}

		public override string ToString()
		{
			return new string(_chars.ToArray());
		}

		private void CheckIndexForRef(int index)
		{
			if (index < 0 || _chars.Count <= index)
				throw new ArgumentException("Bad index: " + index);
		}

		private void CheckIndexForAdd(int index)
		{
			if (index < 0 || _chars.Count < index)
				throw new ArgumentException("Bad index: " + index);
		}

		private void CheckRange(int index, int count)
		{
			this.CheckIndexForAdd(index);

			if (count < 0 || _chars.Count - index < count)
				throw new ArgumentException("Bad count: " + count);
		}

		public char this[int index]
		{
			get
			{
				this.CheckIndexForRef(index);
				return _chars[index];
			}

			set
			{
				this.CheckIndexForRef(index);
				_chars[index] = value;
			}
		}

		public void Add(char chr)
		{
			_chars.Add(chr);
		}

		public void Add(string str)
		{
			_chars.AddRange(str);
		}

		public void Insert(int index, char chr)
		{
			this.CheckIndexForAdd(index);
			_chars.Insert(index, chr);
		}

		public void Insert(int index, string str)
		{
			this.CheckIndexForAdd(index);
			_chars.InsertRange(index, str);
		}

		public void Remove(int index)
		{
			this.CheckIndexForRef(index);
			_chars.RemoveAt(index);
		}

		public void Remove(int index, int count)
		{
			this.CheckRange(index, count);
			_chars.RemoveRange(index, count);
		}

		public string Substring(int index, int count)
		{
			this.CheckRange(index, count);
			return new string(_chars.GetRange(index, count).ToArray());
		}
	}
}
