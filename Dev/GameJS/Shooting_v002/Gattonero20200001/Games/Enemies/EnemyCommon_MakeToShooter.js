/*
	敵共通 - 雑魚敵のシューター化
*/

/*
	Enemy_t 追加フィールド
	{
		<generatorForTask> @@_Each
	}
*/

function <void> EnemyCommon_MakeToShooter(<Enemy_t> enemy)
{
	enemy.@@_Each = @@_Each(enemy);
}

function <void> EnemyCommon_ShooterEach(<Enemy_t> enemy)
{
	if (enemy.@@_Each) // ? シューター化されている。
	{
		if (!enemy.@@_Each.next().value) // ? タスク終了 -> 想定外
		{
			error();
		}
	}
}

function* <generatorForTask> @@_Each(<Enemy_t> enemy)
{
	for (var<int> c = 0; ; c++)
	{
		if (1 <= c && c % 30 == 0)
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
