﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;
using Charlotte.Commons;
using Charlotte.GameCommons;
using Charlotte.Games;
using Charlotte.Games.Scripts.Tests;
using Charlotte.Games.Scripts;

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
			using (new Game())
			{
				Game.I.Script = new Script_Testステージ0001();
				Game.I.Perform();
			}
		}

		public void ContinueGame(Script script)
		{
			using (new Game())
			{
				Game.I.Script = script;
				Game.I.Perform();
			}
		}
	}
}
