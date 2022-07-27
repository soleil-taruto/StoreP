/*
	敵共通
*/

function <void> EnemyCommon_Damaged(<Enemy_t> enemy, <int> damagePoint)
{
	SE(S_EnemyDamaged);
}

function <void> EnemyCommon_Dead(<Enemy_t> enemy)
{
	AddEffect_Explode(enemy.X, enemy.Y);
	SE(S_EnemyDead);
}

/*
	指定された敵は「アイテム」か判定する。
*/
function <boolean> IsEnemyItem(<Enemy_t> enemy)
{
	var ret =
		false;

	return ret;
}

/*
	指定された敵は「敵弾」か判定する。
*/
function <boolean> IsEnemyTama(<Enemy_t> enemy)
{
	var ret =
		enemy.Kind == EnemyKind_Tama;

	return ret;
}

/*
	指定された敵は「ボス」か判定する。
*/
function <boolean> IsEnemyBoss(<Enemy_t> enemy)
{
	var ret =
		enemy.Kind == EnemyKind_Boss01;
//		enemy.Kind == EnemyKind_Boss01 ||
//		enemy.Kind == EnemyKind_Boss02 ||
//		enemy.Kind == EnemyKind_Boss03;

	return ret;
}
