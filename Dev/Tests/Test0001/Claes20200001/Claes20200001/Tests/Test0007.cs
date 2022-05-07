using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Charlotte.WebServices;

namespace Charlotte.Tests
{
	/// <summary>
	/// HTTPServer.cs テスト
	/// </summary>
	public class Test0007
	{
		public void Test01()
		{
			new HTTPServer()
			{
				HTTPConnected = channel =>
				{
					//channel.ResStatus = 200;
					channel.ResHeaderPairs.Add(new string[] { "Content-Type", "text/plain; charset=US-ASCII" });
					//channel.ResHeaderPairs.Add(new string[] { "X-Key-01", "Value-01" });
					//channel.ResHeaderPairs.Add(new string[] { "X-Key-02", "Value-02" });
					//channel.ResHeaderPairs.Add(new string[] { "X-Key-03", "Value-03" });
					channel.ResBody = new byte[][] { Encoding.ASCII.GetBytes("Hello, Happy World!") };
				},
				//PortNo = 80,
				//Backlog = 300,
				//ConnectMax = 100,
				//Interlude = () => !Console.KeyAvailable,
			}
			.Perform();
		}
	}
}
