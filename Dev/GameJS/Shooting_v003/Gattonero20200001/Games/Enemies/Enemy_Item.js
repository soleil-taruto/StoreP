/*
	敵 - アイテム
*/

/// Enemy_Item_Kind_e
//
var<int> Enemy_Item_Kind_e_PowerUp = @(AUTO);
var<int> Enemy_Item_Kind_e_ZankiUp = @(AUTO);

function <Enemy_t> CreateEnemy_Item(<double> x, <double> y, <Enemy_Item_Kind_e> itemKind)
{
	var ret =
	{
		Kind: @(SRCN),
		X: x,
		Y: y,
		HP: 0,
		Crash: null,

		// ここから固有

		<Enemy_Item_Kind_e> ItemKind: itemKind,
		<double> YAdd: -3.0,
	};

	ret.Draw = @@_Draw(ret);
	ret.Damaged = @@_Damaged;
	ret.Dead = @@_Dead;

	return ret;
}

function <boolean> IsEnemy_Item(<Enemy_t> enemy)
{
	return enemy.Kind == @(SRCN);
}

function* <generatorForTask> @@_Draw(<Enemy_t> enemy)
{
	var<double> Y_ADD_ADD = 0.1;

	for (; ; )
	{
		enemy.YAdd += Y_ADD_ADD;
		enemy.Y += enemy.YAdd;

		if (FIELD_B < enemy.Y)
		{
			break;
		}

		enemy.Crash = CreateCrash_Rect(CreateD4Rect_XYWH(enemy.X, enemy.Y, 200.0, 140.0));

		{
			var<Image> picture;

			switch (enemy.ItemKind)
			{
			case Enemy_Item_Kind_e_PowerUp: picture = P_PowerUpItem; break;
			case Enemy_Item_Kind_e_ZankiUp: picture = P_ZankiUpItem; break;

			default:
				error();
			}

			Draw(picture, enemy.X, enemy.Y, 1.0, 0.0, 1.0);
		}

		yield 1;
	}
}

function <void> @@_Damaged(<Enemy_t> enemy, <int> damagePoint)
{
	// noop
}

function <void> @@_Dead(<Enemy_t> enemy)
{
	EnemyCommon_AddScore(50);
//	EnemyCommon_Dead(enemy); // 敵ではないので、通常の敵_死亡イベントは適用しない。

//	AddEffect_PlayerPowerUp(PlayerX, PlayerY); // TODO
	SE(S_PowerUp);
}

function <Enemy_Item_Kind_e> GetEnemyItemKind(<Enemy_t> enemy)
{
	return enemy.ItemKind;
}
