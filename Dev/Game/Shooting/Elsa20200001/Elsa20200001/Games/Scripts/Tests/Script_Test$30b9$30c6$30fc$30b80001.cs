﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Charlotte.Commons;
using Charlotte.GameCommons;
using Charlotte.Games.Enemies;
using Charlotte.Games.Enemies.Tests;
using Charlotte.Games.Walls;
using Charlotte.Games.Walls.Tests;

namespace Charlotte.Games.Scripts.Tests
{
	public class Script_Testステージ0001 : Script
	{
		protected override IEnumerable<bool> E_EachFrame()
		{
			return DDUtils.Scripter(this.E_EachFrame2());
		}

		private IEnumerable<int> E_EachFrame2()
		{
			DDRandom rand = new DDRandom(1);
			DDRandom rand_Sub = new DDRandom(101);

			Ground.I.Music.Stage_01.Play();
			Game.I.Walls.Add(new Wall_Test0003());
			yield return 100;

			foreach (DDScene scene in DDSceneUtils.Create((2 * 60 + 35) * 60))
			{
				DDGround.EL.Add(() =>
				{
					DDPrint.SetDebug(GameConsts.FIELD_W - 180, 0);
					DDPrint.SetBorder(new I3Color(0, 0, 0));
					DDPrint.Print(scene.Numer + " / " + scene.Denom + " = " + scene.Rate.ToString("F3"));
					DDPrint.Reset();

					return false;
				});

				if (rand.Single() < scene.Rate * 0.1)
				{
					if (rand.Single() < 0.1)
					{
						Enemy_TestItem.効用_e 効用;

						if (rand_Sub.Single() < 0.1)
							効用 = Enemy_TestItem.効用_e.ZANKI_UP;
						else if (rand_Sub.Single() < 0.2)
							効用 = Enemy_TestItem.効用_e.BOMB_ADD;
						else
							効用 = Enemy_TestItem.効用_e.POWER_UP_WEAPON;

						Game.I.Enemies.Add(new Enemy_Test0002(GameConsts.FIELD_W + 50, rand.Single() * GameConsts.FIELD_H).AddKilled(enemy =>
						{
							Game.I.Enemies.Add(new Enemy_TestItem(enemy.X, enemy.Y, 効用));
						}
						));
					}
					else if (rand.Single() < 0.3)
					{
						Game.I.Enemies.Add(new Enemy_Test0002(GameConsts.FIELD_W + 50, rand.Single() * GameConsts.FIELD_H));
					}
					else
					{
						Game.I.Enemies.Add(new Enemy_Test0001(GameConsts.FIELD_W + 50, rand.Single() * GameConsts.FIELD_H));
					}
				}
				yield return 1;
			}

			Game.I.システム的な敵クリア();
			yield return 120;
			Ground.I.Music.Boss_01.Play();
			Game.I.Walls.Add(new Wall_Test0004());
			yield return 120;

			{
				Enemy boss = new Enemy_Testボス0001();

				Game.I.Enemies.Add(boss);

				while (!boss.DeadFlag)
				{
					DDGround.EL.Add(() =>
					{
						DDPrint.SetDebug(GameConsts.FIELD_W - 140, 0);
						DDPrint.SetBorder(new I3Color(0, 0, 0));
						DDPrint.Print("BOSS_HP = " + boss.HP);
						DDPrint.Reset();

						return false;
					});

					yield return 1;
				}
			}

			yield return 120;
			DDMusicUtils.Fade();
			yield return 120;

			Game.I.Script = new Script_Testステージ0002(); // 次のステージ

			yield return 1; // Script を差し替えた場合、最後に 1 以上を返す。-- 理由は Script.E_EachFrame に記述
		}
	}
}
