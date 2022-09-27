using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;
using Charlotte.Commons;
using Charlotte.GameCommons;
using Charlotte.Games;
using Charlotte.Games.Scripts.Tests;
using Charlotte.Games.Scripts;
using Charlotte.Novels;

namespace Charlotte.Games
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

		public void StartGame()
		{
			using (new Novel())
			{
				Novel.I.Status.Scenario = new Scenario("Start");
				Novel.I.Perform();
			}
			for (; ; )
			{
				using (new Game())
				{
					Game.I.Script = new Script_Testステージ0001();
					Game.I.Perform();

					if (Game.I.EndReason == Game.EndReason_e.RestartGame)
						continue;
				}
				break;
			}
		}

		public void ContinueGame(Func<Script> getScript)
		{
			for (; ; )
			{
				using (new Game())
				{
					Game.I.Script = getScript();
					Game.I.Perform();

					if (Game.I.EndReason == Game.EndReason_e.RestartGame)
						continue;
				}
				break;
			}
		}
	}
}
