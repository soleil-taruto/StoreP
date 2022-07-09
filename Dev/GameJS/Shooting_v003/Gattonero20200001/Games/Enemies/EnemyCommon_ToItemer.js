/*
	敵共通 - 雑魚敵のアイテム所持化
*/

/*
	Enemy_t 追加フィールド
	{
		<Enemy_Item_Kind_e> @@_ItemKind // アイテムの種類
	}
*/

/*
	雑魚敵のシューター化

	使用例：
		var<Enemy_t> enemy = EnemyCommon_ToItemer(CreateEnemy_XXX());
		----
		var<Enemy_t> enemy = CreateEnemy_XXX();
		EnemyCommon_ToItemer(enemy);
*/
function <Enemy_t> EnemyCommon_ToItemer(<Enemy_t> enemy, <Enemy_Item_Kind_e> itemKind)
{
	enemy.@@_ItemKind = itemKind;

	AddEffect(@@_Each(enemy));

	return enemy;
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

		yield 1;
	}

	@@_DropItem(enemy);
}

/*
	アイテム投下_実行
*/
function <void> @@_DropItem(<Enemy_t> enemy)
{
	// ? 画面外 -> アイテムを落とさない。
	if (IsOut(
		CreateD2Point(enemy.X, enemy.Y),
		CreateD4Rect(0.0, 0.0, FIELD_W, FIELD_H),
		0.0
		))
	{
		return;
	}

	GetEnemies().push(CreateEnemy_Item(enemy.X, enemy.Y, enemy.@@_ItemKind));
}
