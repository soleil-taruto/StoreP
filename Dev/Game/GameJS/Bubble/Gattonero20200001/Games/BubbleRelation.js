/*
	爆発処理
*/

/*
	Enemy_t 追加フィールド
	{
		<boolean> @@_Reached
	}
*/

var<double> @@_EXPLODE_R = 33.0;

function <void> BubbleRelation_着弾マーク(<Enemy_t> enemy)
{
	enemy.@@_Reached = true;
}

function <void> BubbleRelation_着弾による爆発(<Enemy_t[]> enemies)
{
	for (var<Enemy_t> enemy of enemies)
	{
		if (enemy.@@_Reached)
		{
			@@_爆発(enemies, enemy);
			return;
		}
	}
}

function <void> @@_爆発(<Enemy_t[]> enemies, <Enemy_t> baseEnemy)
{
	for (var<Enemy_t> enemy of enemies)
	{
		if (
			Math.abs(enemy.X - baseEnemy.X) < @@_EXPLODE_R &&
			Math.abs(enemy.Y - baseEnemy.Y) < @@_EXPLODE_R &&
			GetDistance(enemy.X - baseEnemy.X, enemy.Y - baseEnemy.Y) < @@_EXPLODE_R
			)
		{
			enemy.@@_Reached = true;
		}
	}
}
