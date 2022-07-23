/*
	�G - E0007
*/

function <Enemy_t> CreateEnemy_E0007(<double> x, <double> y, <int> hp)
{
	var ret =
	{
		Kind: "@@",
		X: x,
		Y: y,
		HP: hp,
		Crash: null,

		// ��������ŗL
	};

	ret.Draw = @@_Draw(ret);
	ret.Damaged = @@_Damaged;
	ret.Dead = @@_Dead;

	return ret;
}

function <boolean> IsEnemy_E0007(<Enemy_t> enemy)
{
	return enemy.Kind == "@@";
}

function* <generatorForTask> @@_Draw(<Enemy_t> enemy)
{
	var<double> angle = GetAngle(PlayerX - enemy.X, PlayerY - enemy.Y);
	var<double> speed = 10.0;

	for (; ; )
	{
		{
			var<double> ANGLE_ADD = 0.02;
			var<double> a = GetAngle(PlayerX - enemy.X, PlayerY - enemy.Y);

			while (a < angle) a += Math.PI * 2;
			while (a > angle) a -= Math.PI * 2;

			if (a + Math.PI < angle)
			{
				angle += ANGLE_ADD;
			}
			else
			{
				angle -= ANGLE_ADD;
			}
		}

		speed -= 0.07;

		var<D2Point_t> speedXY = AngleToPoint(angle, Math.abs(speed));

		enemy.X += speedXY.X;
		enemy.Y += speedXY.Y;

		// ? ��ʊO�ɏo�� -> �I��(���S������)
		if (IsOut(
			CreateD2Point(enemy.X, enemy.Y),
			CreateD4Rect(FIELD_L, FIELD_T, FIELD_W, FIELD_H),
			50.0
			))
		{
			break;
		}

		EnemyCommon_Draw(enemy);

		yield 1;
	}
}

function <void> @@_Damaged(<Enemy_t> enemy, <int> damagePoint)
{
	EnemyCommon_Damaged(enemy, damagePoint);
}

function <void> @@_Dead(<Enemy_t> enemy)
{
	EnemyCommon_AddScore(700);
	EnemyCommon_Dead(enemy);
}
