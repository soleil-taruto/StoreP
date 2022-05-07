using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;
using Charlotte.Utilities;
using Charlotte.Commons;

namespace Charlotte.Tests
{
	/// <summary>
	/// HTTPClient.cs テスト
	/// </summary>
	public class Test0006
	{
		public void Test01()
		{
			Test01a("https://www.google.com");
			Test01a("https://www.youtube.com");
			Test01a("https://www.amazon.co.jp");
		}

		private void Test01a(string url)
		{
			using (WorkingDir wd = new WorkingDir())
			{
				string resFile = wd.MakePath();

				HTTPClient hc = new HTTPClient(url, resFile)
				{
					//ConnectTimeoutMillis = 60000, // 1 min
					//TimeoutMillis = 86400000, // 1 day
					//IdleTimeoutMillis = 180000, // 3 min
					//ResBodySizeMax = 1500000000000, // 1.5 TB
				};

				hc.Get();

				File.Copy(resFile, Common.NextOutputPath() + ".txt");
			}
		}
	}
}
