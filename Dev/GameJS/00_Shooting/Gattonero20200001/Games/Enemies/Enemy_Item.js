/*
	敵 - アイテム
*/

var<int> EnemyKind_Item = @(AUTO);

/// EnemyItemType_e
//
var<int> EnemyItemType_e_Dummy = @(AUTO);
//var<int> EnemyItemType_e_0001 = @(AUTO);
//var<int> EnemyItemType_e_0002 = @(AUTO);
//var<int> EnemyItemType_e_0003 = @(AUTO);

function <Enemy_t> CreateEnemy_Item(<double> x, <double> y, <EnemyItemType_e> itemType)
{
	var ret =
	{
		Kind: EnemyKind_Item,
		X: x,
		Y: y,
		HP: 0,
		Crash: null,

		// ここから固有

		<EnemyItemType_e> ItemType: itemType,
	};

	ret.Draw = @@_Draw(ret);
	ret.Damaged = @@_Damaged;
	ret.Dead = @@_Dead;

	return ret;
}

function* <generatorForTask> @@_Draw(<Enemy_t> enemy)
{
	for (; ; )
	{
		enemy.Y += 0.5;

		if (FIELD_B < enemy.Y)
		{
			break;
		}

		if (GetDistanceLessThan(enemy.X - PlayerX, enemy.Y - PlayerY, 100.0)) // ? 衝突 -> アイテム取得
		{
			// アイテム取得_処理

			SE(S_PowerUp);

			break;
		}

		Draw(P_Dummy, enemy.X, enemy.Y, 1.0, 0.0, 1.0);

		yield 1;
	}
}

function <void> @@_Damaged(<Enemy_t> enemy, <int> damagePoint)
{
	// noop
}

function <void> @@_Dead(<Enemy_t> enemy, <boolean> destroyed)
{
	// noop
}

function <EnemyItemType_e> GetEnemyItemType(<Enemy_t> enemy)
{
	return enemy.ItemType;
}
