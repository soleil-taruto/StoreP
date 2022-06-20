/*
	ゲーム・メイン
*/

// 敵リスト
var<Enemy_t[]> @@_Enemies = [];

// 自弾リスト
var<Shot_t[]> @@_Shots = [];

/*
	射出可能ボール数
*/
var<int> @@_BallStockNum = 10;

/*
	射出中フレーム
	0 == 無効
	1～ == 射出中
*/
var<boolean> @@_ShootingFrame = 0;

/*
	射出角度
*/
var<double> @@_ShootingAngle;

/*
	射出する X-位置
*/
var<double> @@_Shooter_X = Screen_W / 2;

/*
	帰ってきたボールの X-位置
	null == 無効
*/
var<double> @@_Return_X = null;

function* <generatorForTask> GameMain()
{
	for (; ; )
	{
		@@_DrawWall();

		var<double> mx = GetMouseX();
		var<double> my = GetMouseY();

		if (@@_ShootingFrame == 0) // ? 射出中ではない -> 射出方向を描画する。射出可能
		{
			var<double> sx = @@_Shooter_X;
			var<double> sy = Screen_H;

			var<double> shootRad = GetAngle(mx - sx, my - sy);

			if (shootRad < Math.PI / 2)
			{
				shootRad += Math.PI * 2;
			}
			var<double> RAD_LMT = 0.4;

			shootRad = ToRange(shootRad, Math.PI + RAD_LMT, Math.PI * 2 - RAD_LMT);

			for (var<int> c = 1; c <= 5; c++)
			{
				var<D2Point_t> pt = AngleToPoint(shootRad, c * 32.0);

				pt.X += sx;
				pt.Y += sy;

				Draw(P_弾道, pt.X, pt.Y, 0.5, 0.0, 1.0);
			}

			if (GetMouseDown() == -1)
			{
				@@_ShootingFrame = 1;
				@@_ShootingAngle = shootRad;
			}
		}
		else // ? 射出中 -- 射出不可
		{
			var<int> SHOOT_PER_FRAME = 10;
			var<boolean> completed = false;

			if (@@_ShootingFrame / SHOOT_PER_FRAME <= @@_BallStockNum) // ? 射出未完了
			{
				if (@@_ShootingFrame % SHOOT_PER_FRAME == 0)
				{
					var<double> x = @@_Shooter_X;
					var<double> y = Screen_H;

					var<D2Point_t> speed = AngleToPoint(@@_ShootingAngle, 8.0);

					var<double> xAdd = speed.X;
					var<double> yAdd = speed.Y;

					@@_Shots.push(CreateShot_Ball(x, y, xAdd, yAdd));
				}
			}
			else // ? 射出完了
			{
				if (@@_Shots.length == 0)
				{
					completed = true;
				}
			}

			if (completed)
			{
				@@_ShootingFrame = 0;
			}
			else
			{
				@@_ShootingFrame++;
			}
		}

		if (GetRand1() < 0.01) // 暫定
		{
			var<double> x = GetRand1() * Screen_W;
			var<double> y = -30.0;

			@@_Enemies.push(CreateEnemy_SquareBlock(x, y, 10, 2));
		}

		// ====
		// 描画ここから
		// ====

		// memo: 死亡しているかチェックするのは「当たり判定」から

		// 敵の描画
		//
		for (var<int> index = 0; index < @@_Enemies.length; index++)
		{
			if (!DrawEnemy(@@_Enemies[index]))
			{
				@@_Enemies[index] = null;
			}
		}
		RemoveFalse(@@_Enemies);

		// 自弾の描画
		//
		for (var<int> index = 0; index < @@_Shots.length; index++)
		{
			if (!DrawShot(@@_Shots[index]))
			{
				@@_Shots[index] = null;
			}
		}
		RemoveFalse(@@_Shots);

		// ====
		// 描画ここまで
		// ====

		// ====
		// 当たり判定ここから
		// ====

		for (var<int> enemyIndex = 0; enemyIndex < @@_Enemies.length; enemyIndex++)
		{
			var<Enemy_t> enemy = @@_Enemies[enemyIndex];

			if (enemy.HP == -1) // ? 既に死亡
			{
				continue;
			}

			for (var<int> shotIndex = 0; shotIndex < @@_Shots.length; shotIndex++)
			{
				var<Shot_t> shot = @@_Shots[shotIndex];

				if (IsCrashed(enemy.Crashed, shot.Crashed)) // ? 衝突している。
				{
					enemy.HP -= shot.AttackPoint;

					if (enemy.HP <= 0) // ? 死亡した。
					{
						enemy.HP = 0; // 削りすぎを解消

						KillEnemy(enemy);

						break; // この敵は死亡したので、以降の自弾については判定不要、次の敵へ。
					}
				}
			}
		}

		for (var<int> index = 0; index < @@_Shots.length; index++) // 側面・上部反射
		{
			var<Shot_t> shot = @@_Shots[index];

			if (shot.X < 0.0)
			{
				shot.XAdd = Math.abs(shot.XAdd);
			}
			if (Screen_W < shot.X)
			{
				shot.XAdd = Math.abs(shot.XAdd) * -1;
			}
			if (shot.Y < 0.0)
			{
				shot.YAdd = Math.abs(shot.YAdd);
			}
		}

		// ====
		// 当たり判定ここまで
		// ====

		RemoveAll(@@_Enemies, function <boolean> (<Enemy_t> enemy)
		{
			return enemy.HP == -1; // ? 死亡
		});

		RemoveAll(@@_Shots, function <boolean> (<Shot_t> shot)
		{
			return shot.AttackPoint == -1; // ? 死亡
		});

		yield 1;
	}
}

function @@_DrawWall()
{
	SetColor(I3ColorToString(CreateI3Color(0, 0, 0)));
	PrintRect(0, 0, Screen_W, Screen_H);
}
