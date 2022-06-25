/*
	ƒQ[ƒ€EƒƒCƒ“
*/

// “GƒŠƒXƒg
var<Enemy_t[]> @@_Enemies = [];

// ©’eƒŠƒXƒg
var<Shot_t[]> @@_Shots = [];

function* <generatorForTask> GameMain()
{
	var<generatorForTask> gScenarioTask = ScenarioTask();

	for (; ; )
	{
		gScenarioTask.next();

		// ====
		// •`‰æ‚±‚±‚©‚ç
		// ====

		@@_DrawWall();

		// memo: €–S‚µ‚Ä‚¢‚é‚©ƒ`ƒFƒbƒN‚·‚é‚Ì‚Íu“–‚½‚è”»’èv‚©‚ç

		// “G‚Ì•`‰æ
		//
		for (var<int> index = 0; index < @@_Enemies.length; index++)
		{
			@@_Enemies[index].Crash = null; // reset

			if (!DrawEnemy(@@_Enemies[index]))
			{
				@@_Enemies[index].HP = -1;
			}
		}

		// ©’e‚Ì•`‰æ
		//
		for (var<int> index = 0; index < @@_Shots.length; index++)
		{
			@@_Shots[index].Crash = null; // reset

			if (!DrawShot(@@_Shots[index]))
			{
				@@_Shots[index].AttackPoint = -1;
			}
		}

		@@_DrawFront();

		// ====
		// •`‰æ‚±‚±‚Ü‚Å
		// ====

		// ====
		// “–‚½‚è”»’è‚±‚±‚©‚ç
		// ====

		for (var<int> enemyIndex = 0; enemyIndex < @@_Enemies.length; enemyIndex++)
		{
			var<Enemy_t> enemy = @@_Enemies[enemyIndex];

			if (enemy.HP == -1) // ? Šù‚É€–S
			{
				continue;
			}

			for (var<int> shotIndex = 0; shotIndex < @@_Shots.length; shotIndex++)
			{
				var<Shot_t> shot = @@_Shots[shotIndex];

				if (shot.AttackPoint == -1) // ? Šù‚É€–S
				{
					continue;
				}

				if (IsCrashed(enemy.Crash, shot.Crash)) // ? Õ“Ë‚µ‚Ä‚¢‚éB
				{
					var<int> damagePoint = Math.min(enemy.HP, shot.AttackPoint);

					enemy.HP -= damagePoint;
					shot.AttackPoint -= damagePoint;

					if (enemy.HP <= 0) // ? €–S‚µ‚½B
					{
						KillEnemy(enemy);
						break; // ‚±‚Ì“G‚Í€–S‚µ‚½‚Ì‚ÅAŸ‚Ì“G‚Öi‚ŞB
					}
					if (shot.AttackPoint <= 0) // ? UŒ‚—Í‚ğg‚¢‰Ê‚½‚µ‚½B
					{
						KillShot(shot);
						continue; // ‚±‚Ì©’e‚Í€–S‚µ‚½‚Ì‚ÅAŸ‚Ì©’e‚Öi‚ŞB
					}
				}
			}
		}

		// ====
		// “–‚½‚è”»’è‚±‚±‚Ü‚Å
		// ====

		RemoveAll(@@_Enemies, function <boolean> (<Enemy_t> enemy)
		{
			return enemy.HP == -1; // ? €–S
		});

		RemoveAll(@@_Shots, function <boolean> (<Shot_t> shot)
		{
			return shot.AttackPoint == -1; // ? €–S
		});

		yield 1;
	}
}

function <void> @@_DrawWall()
{
	SetColor(I3ColorToString(CreateI3Color(0, 0, 0)));
	PrintRect(0, 0, Screen_W, Screen_H);
}

function <void> @@_DrawFront()
{
	SetColor(I3ColorToString(CreateI3Color(80, 60, 40)));
	PrintRect(0, 0, FIELD_L, Screen_H);
	PrintRect(0, 0, Screen_W, FIELD_T);
	PrintRect(
		0,
		FIELD_B,
		Screen_W,
		Screen_H - FIELD_B
		);
	PrintRect(
		FIELD_R,
		0,
		Screen_W - FIELD_R,
		Screen_H
		);
}
