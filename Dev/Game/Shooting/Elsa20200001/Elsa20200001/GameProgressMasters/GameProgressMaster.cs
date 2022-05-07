using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;
using Charlotte.Commons;
using Charlotte.GameCommons;
using Charlotte.Games;
using Charlotte.Games.Scripts.Tests;

namespace Charlotte.GameProgressMasters
{
	public class GameProgressMaster : IDisposable
	{
		public static GameProgressMaster I;

		public GameProgressMaster()
		{
			I = this;
		}

		public void Dispose()
		{
			I = null;
		}

		public void Perform()
		{
			using (new Game())
			{
				Game.I.Script = new Script_Testステージ0001();
				Game.I.Perform();
			}
		}

		public void Perform_コンテニュー()
		{
			using (new Game())
			{
				Game.I.Script = new Script_Testステージ0001();
				Game.I.Perform();
			}
		}
	}
}
