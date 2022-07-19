/*
	�Q�[���E���C��
*/

// �G���X�g
var<Enemy_t[]> @@_Enemies = [];

// ���e���X�g
var<Shot_t[]> @@_Shots = [];

/*
	�X�R�A
*/
var<int> Score = 0;

function* <generatorForTask> GameMain()
{
	var<Func boolean> f_�S�~��� = Supplier(@@_T_�S�~���());

	// reset
	{
		@@_Enemies = [];
		@@_Shots = [];

		PlayerX = FIELD_L + FIELD_W / 2;
		PlayerY = FIELD_T + FIELD_H / 2;
		PlayerBornFrame = 0;
		PlayerInvincibleFrame = 0;
		PlayerAttackLv = 1;
		PlayerZankiNum = 3;

		Score = 0;
		BackgroundPhase = 0;
	}

	SetCurtain_FD(0, -1.0);
	SetCurtain();
	FreezeInput();

	var<Func boolean> f_scenarioTask   = Supplier(ScenarioTask());
	var<Func boolean> f_backgroundTask = Supplier(BackgroundTask());

gameLoop:
	for (; ; )
	{
		if (!f_scenarioTask())
		{
			break;
		}

		// ====
		// �`�悱������
		// ====

		@@_DrawWall();

		// �w�i�̕`��
		//
		if (!f_backgroundTask())
		{
			error();
		}

		DrawPlayer(); // �v���C���[�̕`��

		// �G�̕`��
		//
		for (var<int> index = 0; index < @@_Enemies.length; index++)
		{
			var<Enemy_t> enemy = @@_Enemies[index];

			if (enemy.HP == -1) // ? ���Ɏ��S
			{
				continue;
			}

			enemy.Crash = null; // reset

			if (!DrawEnemy(enemy))
			{
				enemy.HP = -1;
			}
		}

		// ���e�̕`��
		//
		for (var<int> index = 0; index < @@_Shots.length; index++)
		{
			var<Shot_t> shot = @@_Shots[index];

			if (shot.AttackPoint == -1) // ? ���Ɏ��S
			{
				continue;
			}

			shot.Crash = null; // reset

			if (!DrawShot(shot))
			{
				shot.AttackPoint = -1;
			}
		}

		@@_DrawFront();

		if (DEBUG && 1 <= GetKeyInput(17)) // ? �R���g���[�������� -> �����蔻��\�� (�f�o�b�O�p)
		{
			SetColor("#000000a0");
			PrintRect(0, 0, Screen_W, Screen_H);
			SetColor("#ffffffa0");

			DrawCrash(PlayerCrash);

			for (var<Enemy_t> enemy of @@_Enemies)
			{
				DrawCrash(enemy.Crash);
			}
			for (var<Shot_t> shot of @@_Shots)
			{
				DrawCrash(shot.Crash);
			}
		}

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
				if (enemy.HP == 0) // ? ���G -> ���e�Ƃ͏Փ˂��Ȃ��B
				{
					continue;
				}

				if (IsCrashed(enemy.Crash, shot.Crash)) // ? �Փ˂��Ă���B�G vs ���e
				{
					var<int> damagePoint = Math.min(enemy.HP, shot.AttackPoint);

					enemy.HP -= damagePoint;
					shot.AttackPoint -= damagePoint;

					if (enemy.HP <= 0) // ? ���S�����B
					{
						KillEnemy(enemy);
						break; // ���̓G�͎��S�����̂ŁA���̓G�֐i�ށB
					}

					EnemyDamaged(enemy, damagePoint);

					if (shot.AttackPoint <= 0) // ? �U���͂��g���ʂ������B
					{
						KillShot(shot);
						continue; // ���̎��e�͎��S�����̂ŁA���̎��e�֐i�ށB
					}
				}
			}

			if (enemy.HP == -1) // ? ���Ɏ��S (2���)
			{
				continue;
			}

			if (IsCrashed(enemy.Crash, PlayerCrash)) // ? �Փ˂��Ă���B�G vs ���@
			{
				if (enemy.Kind == Enemy_Kind_e_Item) // ? �A�C�e�� -> �擾
				{
					var<Enemy_Item_Kind_e> itemKind = GetEnemyItemKind(enemy);

					switch (itemKind)
					{
					case Enemy_Item_Kind_e_PowerUp:
						PlayerAttackLv = Math.min(PlayerAttackLv + 1, PLAYER_ATTACK_LV_MAX);
						break;

					case Enemy_Item_Kind_e_ZankiUp:
						PlayerZankiNum++;
						break;

					default:
						error();
					}

					KillEnemy(enemy);
					break; // ���̓G(�A�C�e��)�͎��S�����̂ŁA���̓G�֐i�ށB
				}
				else if (
					1 <= PlayerBornFrame && // ? �ēo�ꒆ
					1 <= PlayerInvincibleFrame // ? ���G��Ԓ�
					)
				{
					// ��e���Ȃ��B
				}
				else // ? ����ȊO(�G) -> ��e
				{
					yield* @@_PlayerDead();

					if (PlayerZankiNum < 1) // ? �c�@�[��
					{
						break gameLoop;
					}

					PlayerZankiNum--;
					PlayerBornFrame = 1;
					break; // ��e�����̂œ����蔻��I��
				}
			}
		}

		// ====
		// �����蔻�肱���܂�
		// ====

		f_�S�~���();

		RemoveAll(@@_Enemies, function <boolean> (<Enemy_t> enemy)
		{
			return enemy.HP == -1; // ? ���S
		});

		RemoveAll(@@_Shots, function <boolean> (<Shot_t> shot)
		{
			return shot.AttackPoint == -1; // ? ���S
		});

		yield 1;

		// ������ �Q�[�����[�v�̏I��� ������
	}

	Fadeout_F(90);

	for (var<Scene_t> scene of CreateScene(80)) // �]�C�̂悤��...
	{
		@@_DrawWall();

		// �w�i�̕`��
		//
		if (!f_backgroundTask())
		{
			error();
		}

		@@_DrawFront();

		yield 1;
	}

	SetCurtain_FD(30, -1.0);

	for (var<Scene_t> scene of CreateScene(40))
	{
		@@_DrawWall();

		// �w�i�̕`��
		//
		if (!f_backgroundTask())
		{
			error();
		}

		@@_DrawFront();

		yield 1;
	}

	ClearAllEffect(); // �������łł͂Ȃ��G�t�F�N�g���l�����āA�N���A�͕K�{�Ƃ���B
	FreezeInput();

	// ������ end of GameMain() ������
}

function* <generatorForTask> @@_T_�S�~���()
{
	for (; ; )
	{
		for (var<int> index = 0; index < @@_Enemies.length; index++)
		{
			var<Enemy_t> enemy = @@_Enemies[index];

			if (@@_IsProbablyEvacuated(enemy.X, enemy.Y))
			{
				enemy.HP = -1;
			}

			yield 1;
		}

		for (var<int> index = 0; index < @@_Shots.length; index++)
		{
			var<Shot_t> shot = @@_Shots[index];

			if (@@_IsProbablyEvacuated(shot.X, shot.Y))
			{
				shot.AttackPoint = -1;
			}

			yield 1;
		}

		yield 1; // @@_Enemies, @@_Shots ����̏ꍇ�A���[�v���� yield �͎��s����Ȃ��̂ŁA�����ɂ� yield ��ݒu���Ă����B
	}
}

function <boolean> @@_IsProbablyEvacuated(<double> x, <double> y)
{
	var<int> MGN_SCREEN_NUM = 3;

	var<boolean> ret = IsOut(
		CreateD2Point(x, y),
		CreateD4Rect_LTRB(
			-Screen_W * MGN_SCREEN_NUM,
			-Screen_H * MGN_SCREEN_NUM,
			Screen_W * (MGN_SCREEN_NUM + 1),
			Screen_H * (MGN_SCREEN_NUM + 1)
			),
		0.0
		);

	return ret;
}

function <Enemy_t[]> GetEnemies()
{
	return @@_Enemies;
}

function <Shot_t[]> GetShots()
{
	return @@_Shots;
}

/*
	�w�ʕ`��
*/
function <void> @@_DrawWall()
{
	SetColor(I3ColorToString(CreateI3Color(0, 0, 0)));
	PrintRect(FIELD_L, FIELD_T, FIELD_W, FIELD_H);
}

/*
	�O�ʕ`��
*/
function <void> @@_DrawFront()
{
	SetColor(I3ColorToString(CreateI3Color(50, 100, 150)));
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

	var<string> strPower;

	switch (PlayerAttackLv)
	{
	case 1: strPower = "������"; break;
	case 2: strPower = "������"; break;
	case 3: strPower = "������"; break;

	default:
		error();
	}

	SetColor(I3ColorToString(CreateI3Color(255, 255, 255)));
	SetPrint(10, 25, 0);
	SetFSize(16);
	PrintLine("Zanki: " + PlayerZankiNum + "�@Power: " + strPower + "�@Score: " + Score);
}

/*
	�v���C���[�̔�e���[�V����
*/
function* <generatorForTask> @@_PlayerDead()
{
	var<generatorForTask[]> bk_effects = EjectEffects(); // �G�t�F�N�g�S�ď���

	SetColor("#ff000040");
	PrintRect(0, 0, Screen_W, Screen_H);

	for (var<Scene_t> scene of CreateScene(20))
	{
		yield 1;
	}

	SetEffects(bk_effects); // �G�t�F�N�g����

	// �G�N���A
	//
	for (var<Enemy_t> enemy of @@_Enemies)
	{
		// �A�C�e���͏��O
		if (IsEnemyItem(enemy))
		{
			// noop
		}
		// �{�X�N���X�̓G�����O
		else if (IsEnemyBoss(enemy))
		{
			// noop
		}
		else
		{
			KillEnemy(enemy);
		}
	}

	// ���e�N���A
	//
	for (var<Shot_t> shot of @@_Shots)
	{
		KillShot(shot);
	}
}
