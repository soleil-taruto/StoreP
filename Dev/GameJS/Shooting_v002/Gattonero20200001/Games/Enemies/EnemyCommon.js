/*
	敵共通
*/

function <void> EnemyCommon_Damaged(<Enemy_t> enemy, <int> damagePoint)
{
	SE(S_EnemyDamaged);
}

function <void> EnemyCommon_Dead(<Enemy_t> enemy)
{
	if (IsEnemyTama(enemy)) // ? 敵弾
	{
		AddEffect_TamaExplode(enemy.X, enemy.Y);
	}
	else
	{
		AddEffect_Explode(enemy.X, enemy.Y);
		SE(S_EnemyDead);
	}
}

function <void> EnemyCommon_Draw(<Enemy_t> enemy)
{
	var<Image> picture;

	switch (enemy.Kind)
	{
	case Enemy_Kind_e_E0001: picture = P_Enemy0001; break;
	case Enemy_Kind_e_E0002: picture = P_Enemy0002; break;
	case Enemy_Kind_e_E0003: picture = P_Enemy0003; break;
	case Enemy_Kind_e_E0004: picture = P_Enemy0004; break;
	case Enemy_Kind_e_E0005: picture = P_Enemy0005; break;
	case Enemy_Kind_e_E0006: picture = P_Enemy0006; break;
	case Enemy_Kind_e_E0007: picture = P_Enemy0007; break;
	case Enemy_Kind_e_E0008: picture = P_Enemy0008; break;

	default:
		error();
	}

	enemy.Crash = CreateCrash_Circle(enemy.X, enemy.Y, 50.0);

	Draw(picture, enemy.X, enemy.Y, 1.0, 0.0, 1.0);

	// HP 表示
	{
		var<string> str = "" + enemy.HP;

		SetPrint(ToInt(enemy.X - str.length * 5), ToInt(enemy.Y - 30), 0);
		SetFSize(16);
		SetColor(enemy.Kind == Enemy_Kind_e_E0006 ? "#000000" : "#ffffff");
		PrintLine(str);
	}
}

function <void> EnemyCommon_AddScore(<int> scoreAdd)
{
	Score += scoreAdd;
}

/*
	指定された敵は「アイテム」か判定する。
*/
function <boolean> IsEnemyItem(<Enemy_t> enemy)
{
	var ret =
		enemy.Kind == Enemy_Kind_e_Item;

	return ret;
}

/*
	指定された敵は「敵弾」か判定する。
*/
function <boolean> IsEnemyTama(<Enemy_t> enemy)
{
	var ret =
		enemy.Kind == Enemy_Kind_e_Tama;

	return ret;
}
