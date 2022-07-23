/*
	“G‹¤’Ê
*/

function <void> EnemyCommon_Damaged(<Enemy_t> enemy, <int> damagePoint)
{
	SE(S_EnemyDamaged);
}

function <void> EnemyCommon_Dead(<Enemy_t> enemy)
{
	if (IsEnemyTama(enemy)) // ? “G’e
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
	var<Image> picture;

	if (IsEnemy_E0001(enemy)) { picture = P_Enemy0001; } else
	if (IsEnemy_E0002(enemy)) { picture = P_Enemy0002; } else
	if (IsEnemy_E0003(enemy)) { picture = P_Enemy0003; } else
	if (IsEnemy_E0004(enemy)) { picture = P_Enemy0004; } else
	if (IsEnemy_E0005(enemy)) { picture = P_Enemy0005; } else
	if (IsEnemy_E0006(enemy)) { picture = P_Enemy0006; } else
	if (IsEnemy_E0007(enemy)) { picture = P_Enemy0007; } else
	if (IsEnemy_E0008(enemy)) { picture = P_Enemy0008; } else { error(); }

	enemy.Crash = CreateCrash_Circle(enemy.X, enemy.Y, 50.0);

	Draw(picture, enemy.X, enemy.Y, 1.0, 0.0, 1.0);

	// HP •\¦
	{
		var<string> str = "" + enemy.HP;

		SetPrint(ToInt(enemy.X - str.length * 5), ToInt(enemy.Y - 30), 0);
		SetFSize(16);
		SetColor(enemy.Kind == Enemy_Kind_e_E0006 ? "#000000" : "#ffffff");
		PrintLine(str);
	}
}

function <void> EnemyCommon_AddScore(<int> scoreAdd)
{
	Score += scoreAdd;
}

/*
	w’è‚³‚ê‚½“G‚ÍuƒAƒCƒeƒ€v‚©”»’è‚·‚éB
*/
function <boolean> IsEnemyItem(<Enemy_t> enemy)
{
	var ret =
		IsEnemy_Item(enemy);

	return ret;
}

/*
	w’è‚³‚ê‚½“G‚Íu“G’ev‚©”»’è‚·‚éB
*/
function <boolean> IsEnemyTama(<Enemy_t> enemy)
{
	var ret =
		IsEnemy_Tama(enemy);

	return ret;
}
