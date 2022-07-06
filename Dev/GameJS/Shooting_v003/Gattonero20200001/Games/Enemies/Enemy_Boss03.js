/*
	敵 - Boss03
*/

function <Enemy_t> CreateEnemy_Boss03(<double> x, <double> y, <int> hp)
{
	var ret =
	{
		Kind: Enemy_Kind_e_Boss03,
		X: x,
		Y: y,
		HP: hp,
		Crash: null,

		// ここから固有

		<double> DestX: undefined,
		<double> DestY: undefined,

		<double> Speed: 0.0,
	};

	ret.Draw = @@_Draw(ret);
	ret.Dead = @@_Dead;

	return ret;
}

function* <generatorForTask> @@_Draw(<Enemy_t> enemy)
{
	var<Func boolean> f_move   = Supplier(@@_Move(enemy));
	var<Func boolean> f_attack = Supplier(@@_Attack(enemy));

	for (; ; )
	{
		f_move();
		f_attack();

		enemy.Crash = CreateCrash_Circle(enemy.X, enemy.Y, 100.0);

		Draw(P_Enemy0003, enemy.X, enemy.Y, 1.0, 0.0, 2.0);

		yield 1;
	}
}

function* <generatorForTask> @@_Move(<Enemy_t> enemy)
{
	var<Func boolean> f_moveDest = Supplier(function* <generatorForTask> ()
	{
		enemy.DestX = FIELD_L + FIELD_W / 2;
		enemy.DestY = FIELD_T + FIELD_H / 2;

		yield* Wait(300);

		for (; ; )
		{
			enemy.DestX = FIELD_L + 150.0;
			enemy.DestY = FIELD_T + 150.0;

			yield* Wait(300);

			enemy.DestX = FIELD_L + 350.0;
			enemy.DestY = FIELD_T + 550.0;

			yield* Wait(300);

			enemy.DestX = FIELD_L + 550.0;
			enemy.DestY = FIELD_T + 150.0;

			yield* Wait(300);
		}
	}());

	for (; ; )
	{
		f_moveDest();

		// change enemy.Speed
		{
			var<double> d = GetDistance(
				enemy.DestX - enemy.X,
				enemy.DestY - enemy.Y
				);

			enemy.Speed = Approach(enemy.Speed, 3.0, 0.9);
			enemy.Speed = Math.min(enemy.Speed, d / 10.0);
		}

		// 移動
		{
			var<D2Point_t> speedXY = MakeXYSpeed(
				enemy.X,
				enemy.Y,
				enemy.DestX,
				enemy.DestY,
				enemy.Speed
				);

			enemy.X += speedXY.X;
			enemy.Y += speedXY.Y;
		}

		yield 1;
	}
}

function* <generatorForTask> @@_Attack(<Enemy_t> enemy)
{
	yield* Wait(120);

	for (; ; )
	{
		for (var<int> c = 0; c < 3; c++)
		{
			var<double> angle = GetAngle(PlayerX - enemy.X, PlayerY - enemy.Y);

			for (var<int> c = -2; c <= 2; c++)
			{
				var<D2Point_t> speed = AngleToPoint(angle + c * 0.25, 6.0);

				GetEnemies().push(CreateEnemy_Tama(enemy.X, enemy.Y, speed.X, speed.Y));
			}

			yield* Wait(20);
		}

		yield* Wait(60);
	}
}

function <void> @@_Dead(<Enemy_t> enemy)
{
	EnemyCommon_AddScore(10000);
	EnemyCommon_Dead(enemy);
}
