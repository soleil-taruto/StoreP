/*
	敵 - アイテム
*/

function <Enemy_t> CreateEnemy_Item(<double> x, <double> y, <Enemy_Item_Kind_e> itemKind)
{
	var ret =
	{
		Kind: Enemy_Kind_e_Item,
		X: x,
		Y: y,
		HP: 0,
		Crash: null,

		// ここから固有

		<Enemy_Item_Kind_e> ItemKind: itemKind,
		<double> YAdd: -3.0,
	};

	ret.Draw = @@_Draw(ret);
	ret.Dead = @@_Dead;

	return ret;
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

		enemy.Crash = CreateCrash_Circle(enemy.X, enemy.Y, 90.0);

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

function <void> @@_Dead(<Enemy_t> enemy)
{
	EnemyCommon_Dead(enemy);
}

function <Enemy_Item_Kind_e> GetEnemyItemKind(<Enemy_t> enemy)
{
	return enemy.ItemKind;
}
