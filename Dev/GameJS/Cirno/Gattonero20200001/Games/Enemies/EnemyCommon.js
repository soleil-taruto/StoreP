/*
	敵共通
*/

function <void> EnemyCommon_Damaged(<Enemy_t> enemy, <int> damagePoint)
{
	SE(S_EnemyDamaged);
}

function <void> EnemyCommon_Dead(<Enemy_t> enemy, <Shot_t> shot) // shot: この敵を撃破した自弾が無い(不明な)場合 null になる。
{
	if (shot == null) // ? 自滅 etc.
	{
		AddEffect(Effect_Explode_M(enemy.X, enemy.Y));
	}
	else // ? 自弾により撃破された。
	{
		AddEffect_Explode(enemy.X, enemy.Y);
		SE(S_EnemyDead);
	}
}

/*
	指定された敵は「アイテム」か判定する。
*/
function <boolean> IsEnemyItem(<Enemy_t> enemy)
{
	var ret =
		false;
//		enemy.Kind == EnemyKind_Item_0001 ||
//		enemy.Kind == EnemyKind_Item_0002 ||
//		enemy.Kind == EnemyKind_Item_0003;

	return ret;
}

/*
	指定された敵は「敵弾」か判定する。
*/
function <boolean> IsEnemyTama(<Enemy_t> enemy)
{
	var ret =
		enemy.Kind == EnemyKind_Tama;
//		enemy.Kind == EnemyKind_Tama_0001 ||
//		enemy.Kind == EnemyKind_Tama_0002 ||
//		enemy.Kind == EnemyKind_Tama_0003;

	return ret;
}

/*
	指定された敵は「ボス」か判定する。
*/
function <boolean> IsEnemyBoss(<Enemy_t> enemy)
{
	var ret =
		enemy.Kind == EnemyKind_Boss01;
//		enemy.Kind == EnemyKind_Boss_0001 ||
//		enemy.Kind == EnemyKind_Boss_0002 ||
//		enemy.Kind == EnemyKind_Boss_0003;

	return ret;
}
