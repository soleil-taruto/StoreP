/*
	�G����
*/

function <void> EnemyCommon_Damaged(<Enemy_t> enemy, <int> damagePoint)
{
	SE(S_EnemyDamaged);
}

function <void> EnemyCommon_Dead(<Enemy_t> enemy)
{
	if (IsEnemyTama(enemy)) // ? �G�e
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
	var<Image> picture = @@_EnemyToPicture(enemy);

	enemy.Crash = CreateCrash_Circle(enemy.X, enemy.Y, 50.0);

	Draw(picture, enemy.X, enemy.Y, 1.0, 0.0, 1.0);

	// HP �\��
	{
		var<string> str = "" + enemy.HP;

		SetPrint(ToInt(enemy.X - str.length * 5), ToInt(enemy.Y - 30), 0);
		SetFSize(16);
		SetColor(IsEnemy_E0006(enemy) ? "#000000" : "#ffffff");
		PrintLine(str);
	}
}

function <void> EnemyCommon_AddScore(<int> scoreAdd)
{
	Score += scoreAdd;
}

/*
	�w�肳�ꂽ�G�́u�A�C�e���v�����肷��B
*/
function <boolean> IsEnemyItem(<Enemy_t> enemy)
{
	var ret =
		IsEnemy_Item(enemy);

	return ret;
}

/*
	�w�肳�ꂽ�G�́u�G�e�v�����肷��B
*/
function <boolean> IsEnemyTama(<Enemy_t> enemy)
{
	var ret =
		IsEnemy_Tama(enemy);

	return ret;
}
