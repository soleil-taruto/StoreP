/*
	敵共通 - 雑魚敵のシューター化
*/

/*
	Enemy_t 追加フィールド
	{
		<generatorForTask> @@_ShooterFlag // シューター化したか -- HACK: 不使用
	}
*/

/*
	雑魚敵のシューター化

	使用例：
		var<Enemy_t> enemy = CreateEnemy_XXX();
		EnemyCommon_MakeToShooter(enemy);
*/
function <void> EnemyCommon_MakeToShooter(<Enemy_t> enemy)
{
	enemy.@@_ShooterFlag = true; // HACK: 不使用

	AddEffect(@@_Each(enemy));
}

/*
	タスク
*/
function* <generatorForTask> @@_Each(<Enemy_t> enemy)
{
	for (var<int> frame = 0; ; frame++)
	{
		if (enemy.HP == -1) // ? 既に死亡 -> 終了
		{
			break;
		}

		if (1 <= frame && frame % 30 == 0)
		{
			@@_Shoot(enemy);
		}

		yield 1;
	}
}

/*
	射撃_実行
*/
function <void> @@_Shoot(<Enemy_t> enemy)
{
	var<D2Point_t> speed = MakeXYSpeed(enemy.X, enemy.Y, PlayerX, PlayerY, 5.0);

	GetEnemies().push(CreateEnemy_Tama(enemy.X, enemy.Y, speed.X, speed.Y));
}
