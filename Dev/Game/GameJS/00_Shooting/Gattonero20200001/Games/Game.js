/*
	�Q�[���E���C��
*/

// �G���X�g
var<Enemy_t[]> @@_Enemies = [];

// ���e���X�g
var<Shot_t[]> @@_Shots = [];

function* <generatorForTask> GameMain()
{
	for (; ; )
	{
		if (GetMouseDown() == -1)
		{
			var<double> x = GetMouseX();
			var<double> y = GetMouseY();

			AddEffect_Explode(x, y);
		}

		// ====
		// �`�悱������
		// ====

		@@_DrawWall();

		// memo: ���S���Ă��邩�`�F�b�N����̂́u�����蔻��v����

		// �G�̕`��
		//
		for (var<int> index = 0; index < @@_Enemies.length; index++)
		{
			@@_Enemies[index].Crash = null; // reset

			if (!DrawEnemy(@@_Enemies[index]))
			{
				@@_Enemies[index].HP = -1;
			}
		}

		// ���e�̕`��
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
		// �`�悱���܂�
		// ====

		// ====
		// �����蔻�肱������
		// ====

		for (var<int> enemyIndex = 0; enemyIndex < @@_Enemies.length; enemyIndex++)
		{
			var<Enemy_t> enemy = @@_Enemies[enemyIndex];

			if (enemy.HP == -1) // ? ���Ɏ��S
			{
				continue;
			}

			for (var<int> shotIndex = 0; shotIndex < @@_Shots.length; shotIndex++)
			{
				var<Shot_t> shot = @@_Shots[shotIndex];

				if (shot.AttackPoint == -1) // ? ���Ɏ��S
				{
					continue;
				}

				if (IsCrashed(enemy.Crash, shot.Crash)) // ? �Փ˂��Ă���B
				{
				}
			}
		}

		// ====
		// �����蔻�肱���܂�
		// ====

		RemoveAll(@@_Enemies, function <boolean> (<Enemy_t> enemy)
		{
			return enemy.HP == -1; // ? ���S
		});

		RemoveAll(@@_Shots, function <boolean> (<Shot_t> shot)
		{
			return shot.AttackPoint == -1; // ? ���S
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
		FIELD_T,
		Screen_W,
		Screen_H - FIELD_T
		);
	PrintRect(
		FIELD_L,
		0,
		Screen_W - FIELD_L,
		Screen_H
		);
}
