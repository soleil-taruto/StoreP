/*
	“G - Houdai
*/

var<int> EnemyKind_Houdai = @(AUTO);

function <Enemy_t> CreateEnemy_Houdai(<double> x, <double> y)
{
	var ret =
	{
		Kind: EnemyKind_Houdai,
		X: x,
		Y: y,
		HP: 1,
		Crash: null,

		// ‚±‚±‚©‚çŒÅ—L
	};

	ret.Draw = @@_Draw(ret);
	ret.Damaged = @@_Damaged;
	ret.Dead = @@_Dead;

	return ret;
}

function* <generatorForTask> @@_Draw(<Enemy_t> enemy)
{
	AddEffectWhile(@@_AttackTask(enemy), () => enemy.HP != -1);

	for (; ; )
	{
		enemy.Crash = CreateCrash_Rect(CreateD4Rect_XYWH(enemy.X, enemy.Y, 50.0, 50.0));

		Draw(P_Enemy_Houdai, enemy.X - Camera.X, enemy.Y - Camera.Y, 1.0, 0.0, 1.0);

		yield 1;
	}
}

function* <generatorForTask> @@_AttackTask(<Enemy_t> enemy)
{

}

function <void> @@_Damaged(<Enemy_t> enemy, <int> damagePoint)
{
	EnemyCommon_Damaged(enemy, damagePoint);
}

function <void> @@_Dead(<Enemy_t> enemy)
{
	EnemyCommon_Dead(enemy);
}
