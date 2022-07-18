using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Charlotte.Commons;
using Charlotte.GameCommons;
using Charlotte.Games.Shots;

namespace Charlotte.Games.Enemies
{
	public static class EnemyCommon
	{
		/// <summary>
		/// 汎用・被弾イベント
		/// </summary>
		/// <param name="enemy">敵</param>
		/// <param name="shot">被弾した自弾</param>
		/// <param name="damagePoint">食らったダメージ</param>
		public static void Damaged(Enemy enemy, Shot shot, int damagePoint)
		{
			int count = damagePoint;

			DDGround.EL.Add(() =>
			{
				Ground.I.SE.EnemyDamaged.Play();
				return 0 < --count;
			});
		}

		/// <summary>
		/// 汎用・消滅イベント
		/// </summary>
		/// <param name="enemy">敵</param>
		public static void Killed(Enemy enemy)
		{
			DDGround.EL.Add(SCommon.Supplier(Effects.EnemyKilled(enemy.X, enemy.Y)));
			Ground.I.SE.EnemyKilled.Play();
		}
	}
}
