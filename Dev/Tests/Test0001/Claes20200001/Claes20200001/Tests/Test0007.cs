﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Charlotte.Commons;
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
			HTTPServer hs = new HTTPServer()
			{
				//PortNo = 80,
				//Backlog = 300,
				//ConnectMax = 100,
				//Interlude = () => !Console.KeyAvailable,
				HTTPConnected = channel =>
				{
					ProcMain.WriteLog(channel.FirstLine);
					ProcMain.WriteLog(channel.Method);
					ProcMain.WriteLog(channel.PathQuery);
					ProcMain.WriteLog(channel.HTTPVersion);
					ProcMain.WriteLog(string.Join(", ", channel.HeaderPairs.Select(pair => pair[0] + "=" + pair[1])));
					ProcMain.WriteLog(SCommon.Hex.ToString(channel.Body));

					//channel.ResStatus = 200;
					channel.ResHeaderPairs.Add(new string[] { "Content-Type", "text/plain; charset=US-ASCII" });
					//channel.ResHeaderPairs.Add(new string[] { "X-Key-01", "Value-01" });
					//channel.ResHeaderPairs.Add(new string[] { "X-Key-02", "Value-02" });
					//channel.ResHeaderPairs.Add(new string[] { "X-Key-03", "Value-03" });
					channel.ResBody = new byte[][] { Encoding.ASCII.GetBytes("Hello, Happy World!") };
				},
			};

			//SockChannel.ThreadTimeoutMillis = 100;

			//HTTPServer.KeepAliveTimeoutMillis = 5000;

			//HTTPServerChannel.RequestTimeoutMillis = -1;
			//HTTPServerChannel.ResponseTimeoutMillis = -1;
			//HTTPServerChannel.FirstLineTimeoutMillis = 2000;
			//HTTPServerChannel.IdleTimeoutMillis = 180000; // 3 min
			//HTTPServerChannel.BodySizeMax = 300000000; // 300 MB

			//SockCommon.TimeWaitMonitor.CTR_ROT_SEC = 60;
			//SockCommon.TimeWaitMonitor.COUNTER_NUM = 5;
			//SockCommon.TimeWaitMonitor.COUNT_LIMIT = 10000;

			// サーバーの設定ここまで

			hs.Perform();
		}

		public void Test02()
		{
			HTTPServer hs = new HTTPServer()
			{
				HTTPConnected = channel =>
				{
					channel.ResHeaderPairs.Add(new string[] { "Content-Type", "application/octet-stream" });
					channel.ResBody = E_TextBody();
				},
			};

			hs.Perform();
		}

		private IEnumerable<byte[]> E_TextBody()
		{
			List<byte[]> buff = new List<byte[]>();
			int size = 0;

			foreach (byte[] part in E_TextBody_P())
			{
				buff.Add(part);
				size += part.Length;

				if (1000000 < size)
				{
					yield return SCommon.Join(buff);
					size = 0;
				}
			}
			yield return SCommon.Join(buff);
		}

		private IEnumerable<byte[]> E_TextBody_P()
		{
			for (int count = 1; count <= SCommon.IMAX; count++)
			{
				yield return Encoding.ASCII.GetBytes(count + "\r\n");
			}
		}

		public void Test03()
		{
			HTTPServer hs = new HTTPServer()
			{
				HTTPConnected = channel =>
				{
					List<string> lines = new List<string>();

					lines.Add(channel.FirstLine);
					lines.Add(channel.Method);
					lines.Add(channel.PathQuery);
					lines.Add(channel.HTTPVersion);

					foreach (string[] headerPair in channel.HeaderPairs)
						lines.Add(headerPair[0] + " ==> " + headerPair[1]);

					lines.Add("" + channel.Body.Length);

					channel.ResHeaderPairs.Add(new string[] { "Content-Type", "text/plain; charset=US-ASCII" });
					channel.ResBody = new byte[][] { Encoding.ASCII.GetBytes(SCommon.LinesToText(lines)) };
				},
			};

			hs.Perform();
		}
	}
}
