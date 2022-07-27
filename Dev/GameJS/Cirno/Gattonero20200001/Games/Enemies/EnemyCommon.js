/*
	�G����
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
	�w�肳�ꂽ�G�́u�A�C�e���v�����肷��B
*/
function <boolean> IsEnemyItem(<Enemy_t> enemy)
{
	var ret =
		false;

	return ret;
}

/*
	�w�肳�ꂽ�G�́u�G�e�v�����肷��B
*/
function <boolean> IsEnemyTama(<Enemy_t> enemy)
{
	var ret =
		enemy.Kind == EnemyKind_Tama;

	return ret;
}

/*
	�w�肳�ꂽ�G�́u�{�X�v�����肷��B
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
