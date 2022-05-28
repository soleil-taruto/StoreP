﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;
using Charlotte.Commons;

namespace Charlotte.WebServices
{
	public class HTTPBodyOutputStream : IDisposable
	{
#if true
		public void Write(byte[] data)
		{
			throw new Exception("REJECT-BODY");
		}

		public readonly int Count = 0;

		public void Dispose()
		{
			// noop
		}
#else
		private class InnerInfo : IDisposable
		{
			public WorkingDir WD = new WorkingDir();
			public string BufferFile;
			public long WroteSize = 0;
			public CtrCipher CtrCipher = CtrCipher.CreateTemporary();

			public InnerInfo()
			{
				this.BufferFile = this.WD.MakePath();
			}

			public void Write(byte[] data, int offset = 0)
			{
				this.Write(data, offset, data.Length - offset);
			}

			public void Write(byte[] data, int offset, int count)
			{
				this.CtrCipher.Mask(data, offset, count);

				using (FileStream writer = new FileStream(this.BufferFile, FileMode.Append, FileAccess.Write))
				{
					writer.Write(data, offset, count);
				}
				this.WroteSize += count;
			}

			public long Count
			{
				get
				{
					return this.WroteSize;
				}
			}

			public byte[] ToByteArray()
			{
				byte[] data = File.ReadAllBytes(this.BufferFile);
				SCommon.DeletePath(this.BufferFile);
				this.WroteSize = 0;

				this.CtrCipher.Reset();
				this.CtrCipher.Mask(data);
				this.CtrCipher.Reset();

				return data;
			}

			public void ToFile(string destFile)
			{
				this.CtrCipher.Reset();

				using (FileStream reader = new FileStream(this.BufferFile, FileMode.Open, FileAccess.Read))
				using (FileStream writer = new FileStream(destFile, FileMode.Create, FileAccess.Write))
				{
					SCommon.ReadToEnd(reader.Read, (buff, offset, count) =>
					{
						this.CtrCipher.Mask(buff, offset, count);
						writer.Write(buff, offset, count);
					});
				}

				SCommon.DeletePath(this.BufferFile);
				this.WroteSize = 0;

				this.CtrCipher.Reset();
			}

			public void ReadToEnd(SCommon.Write_d writer)
			{
				this.CtrCipher.Reset();

				using (FileStream reader = new FileStream(this.BufferFile, FileMode.Open, FileAccess.Read))
				{
					SCommon.ReadToEnd(reader.Read, (buff, offset, count) =>
					{
						this.CtrCipher.Mask(buff, offset, count);
						writer(buff, offset, count);
					});
				}

				SCommon.DeletePath(this.BufferFile);
				this.WroteSize = 0;

				this.CtrCipher.Reset();
			}

			public void Dispose()
			{
				if (this.WD != null)
				{
					this.WD.Dispose();
					this.WD = null;

					this.CtrCipher.Dispose();
					this.CtrCipher = null;
				}
			}
		}

		private InnerInfo Inner = null;

		public void Write(byte[] data, int offset = 0)
		{
			this.Write(data, offset, data.Length - offset);
		}

		public void Write(byte[] data, int offset, int count)
		{
			if (this.Inner == null)
				this.Inner = new InnerInfo();

			this.Inner.Write(data, offset, count);
		}

		public long Count
		{
			get
			{
				return this.Inner == null ? 0 : this.Inner.WroteSize;
			}
		}

		/// <summary>
		/// 書き出されたデータをバイト列に変換して返し、
		/// この出力ストリームをリセットする。
		/// </summary>
		/// <returns>バイト列</returns>
		public byte[] ToByteArray()
		{
			return this.Inner == null ? SCommon.EMPTY_BYTES : this.Inner.ToByteArray();
		}

		/// <summary>
		/// 書き出されたデータを出力ファイルに書き出し、
		/// この出力ストリームをリセットする。
		/// </summary>
		/// <param name="destFile">出力ファイル</param>
		public void ToFile(string destFile)
		{
			if (this.Inner == null)
				File.WriteAllBytes(destFile, SCommon.EMPTY_BYTES);
			else
				this.Inner.ToFile(destFile);
		}

		public void Dispose()
		{
			if (this.Inner != null)
			{
				this.Inner.Dispose();
				this.Inner = null;
			}
		}
#endif
	}
}
