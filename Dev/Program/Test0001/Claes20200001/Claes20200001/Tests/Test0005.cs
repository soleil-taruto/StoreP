using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Charlotte.Tests
{
	public class Test0005
	{
		public void Test01()
		{
			Test01_a(Enumerable.Range(1, 1).ToArray());
			Test01_a(Enumerable.Range(1, 2).ToArray());
			Test01_a(Enumerable.Range(1, 3).ToArray());
			Test01_a(Enumerable.Range(1, 4).ToArray());
			Test01_a(Enumerable.Range(1, 5).ToArray());
			Test01_a(Enumerable.Range(1, 6).ToArray());
			Test01_a(Enumerable.Range(1, 7).ToArray());
			Test01_a(Enumerable.Range(1, 8).ToArray());
			Test01_a(Enumerable.Range(1, 9).ToArray());
		}

		private void Test01_a(int[] parts)
		{
			GameStatusInfo gameStatus = new GameStatusInfo()
			{
				TurnWho = Player_e.Alice,
				Parts = parts.ToArray(), // Clone
			};

			Player_e winner = Judge(gameStatus);

			Console.WriteLine(string.Join(", ", parts) + " -> " + winner);
		}

		private enum Player_e
		{
			Alice,
			Bob,
		}

		private class GameStatusInfo
		{
			public Player_e TurnWho;
			public int[] Parts;
		}

		private Player_e Judge(GameStatusInfo gameStatus)
		{
			if (gameStatus.Parts.Length == 0)
			{
				if (gameStatus.TurnWho == Player_e.Alice)
				{
					return Player_e.Bob;
				}
				else
				{
					return Player_e.Alice;
				}
			}

			bool canAliceWin = false;
			bool canBobWin = false;

			for (int index = 0; index < gameStatus.Parts.Length; index++)
			{
				for (int start = 0; start < gameStatus.Parts[index]; start++)
				{
					for (int end = start + 1; end <= gameStatus.Parts[index]; end++)
					{
						List<int> nextParts = gameStatus.Parts.ToList(); // Clone

						nextParts[index] = 0;
						nextParts.Add(start);
						nextParts.Add(gameStatus.Parts[index] - end);
						nextParts.RemoveAll(v => v == 0);

						GameStatusInfo nextGameStatus = new GameStatusInfo()
						{
							TurnWho = gameStatus.TurnWho == Player_e.Alice ? Player_e.Bob : Player_e.Alice,
							Parts = nextParts.ToArray(),
						};

						Player_e nextWinner = Judge(nextGameStatus);

						if (nextWinner == Player_e.Alice)
						{
							canAliceWin = true;
						}
						else
						{
							canBobWin = true;
						}
					}
				}
			}

			if (gameStatus.TurnWho == Player_e.Alice)
			{
				return canAliceWin ? Player_e.Alice : Player_e.Bob;
			}
			else
			{
				return canBobWin ? Player_e.Bob : Player_e.Alice;
			}
		}
	}
}
