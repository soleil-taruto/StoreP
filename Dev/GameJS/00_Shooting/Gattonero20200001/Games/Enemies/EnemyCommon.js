/*
	敵共通
*/

function <void> EnemyCommon_Damaged(<Enemy_t> enemy, <int> damagePoint)
{
	SE(S_EnemyDamaged);
}

function <void> EnemyCommon_Dead(<Enemy_t> enemy, <boolean> destroyed) // destroyed: プレイヤー等(の攻撃行動)によって撃破されたか
{
	if (destroyed) // ? 自弾により撃破された。
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
	else // ? 自滅・消滅 etc.
	{
		// noop
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
		false;
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
		false;
//		enemy.Kind == EnemyKind_Boss_0001 ||
//		enemy.Kind == EnemyKind_Boss_0002 ||
//		enemy.Kind == EnemyKind_Boss_0003;

	return ret;
}
