/*
	敵
*/

/@(ASTR)

/// Enemy_t
{
	<double> X // X-位置
	<double> Y // Y-位置
	<int> HP // 体力
	<boolean> Crashed // 自弾と衝突したか
	<double> 当たり判定_R
	<generatorForTask> Each
}

@(ASTR)/

/*
	敵リスト
*/
var<Enemy_t> Enemies = [];

/*
	敵生成
*/
function <Enemy_t> CreateEnemy(<double> x, <double> y)
{
	var ret =
	{
		// 位置
		X: x,
		Y: y,

		// 体力
		HP: 10,

		// 自弾と衝突したか
		Crashed: false,

		当たり判定_R: 45.0,
	};

	ret.Each = @@_Each(ret);

	return ret;
}

/*
	ret: ? 生存
*/
function <boolean> Enemy_Each(<Enemy_t> enemy)
{
	return enemy.Each.next().value;
}

function* <generatorForTask> @@_Each(<Enemy_t> enemy)
{
	var<double> speedX = GetRand1() * 2.0 - 3.0;
	var<double> speedY = GetRand2() * 3.0;

	for (; ; )
	{
		enemy.X += speedX;
		enemy.Y += speedY;

		if (enemy.Y < 0 && speedY < 0)
		{
			speedY = Math.abs(speedY);
		}
		else if (GetField_H() < enemy.Y && 0 < speedY)
		{
			speedY = -Math.abs(speedY);
		}

		// 画面外に出たので退場
		if (enemy.X < -100.0)
		{
			break;
		}

		if (enemy.Crashed)
		{
			enemy.HP--;

			// 敵・死亡
			if (enemy.HP <= 0)
			{
				Score += 100;
				SE(S_Explode);
				AddEffect(Effect_Explode(GetField_L() + enemy.X, GetField_T() + enemy.Y));
				break;
			}
		}

		// 弾を撃つ
		if (GetRand(100) == 0)
		{
			// HACK: 画面外・自機に近い場合は撃たないようにするべきか。

			Tamas.push(CreateTama(enemy.X, enemy.Y));
		}

		// 描画
		Draw(P_Enemy_0001, GetField_L() + enemy.X, GetField_T() + enemy.Y, 1.0, 0.0, 1.0);

		// 描画 test
//		SetColor("#00ff00");
//		PrintRect_XYWH(GetField_L() + enemy.X, GetField_T() + enemy.Y, 20, 20);

		yield 1;
	}
}
