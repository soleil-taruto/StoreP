/*
	�Q�[���E���C��
*/

// �G���X�g
var<Enemy_t[]> @@_Enemies = [];

// ���e���X�g
var<Shot_t[]> @@_Shots = [];

/*
	���j���[�֖߂�{�^���̈ʒu
*/
var<int> @@_RETURN_MENU_L = 580;
var<int> @@_RETURN_MENU_T = 20;
var<int> @@_RETURN_MENU_W = 200;
var<int> @@_RETURN_MENU_H = 60;

var<GameEndReason_e> GameEndReason = GameEndReason_e_STAGE_CLEAR;
var<int> GameLastPlayedStageIndex = 0;

function* <generatorForTask> GameMain(<int> mapIndex)
{
	// reset
	{
		GameEndReason = GameEndReason_e_STAGE_CLEAR;
		GameLastPlayedStageIndex = 0;

		@@_Enemies = [];
		@@_Shots = [];

		ResetPlayer();
	}

	LoadMap(mapIndex);

	PlayerX = Map.StartPt.X;
	PlayerY = Map.StartPt.Y;

	GameLastPlayedStageIndex = Map.Index;

	SetCurtain();
	FreezeInput();

	yield* @@_StartMotion();

	Play(M_Field);

gameLoop:
	for (; ; )
	{
		if (
			GetMouseDown() == -1 &&
			@@_RETURN_MENU_L < GetMouseX() && GetMouseX() < @@_RETURN_MENU_L + @@_RETURN_MENU_W &&
			@@_RETURN_MENU_T < GetMouseY() && GetMouseY() < @@_RETURN_MENU_T + @@_RETURN_MENU_H
			)
		{
			GameEndReason = GameEndReason_e_RETURN_MENU;
			break;
		}

		// ====
		// �`�悱������
		// ====

		@@_DrawWall();

		DrawPlayer(); // �v���C���[�̕`��

		// �G�̕`��
		//
		for (var<int> index = 0; index < @@_Enemies.length; index++)
		{
			if (@@_Enemies[index].HP == -1) // ? ���Ɏ��S
			{
				continue;
			}

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
			if (@@_Shots[index].AttackPoint == -1) // ? ���Ɏ��S
			{
				continue;
			}

			@@_Shots[index].Crash = null; // reset

			if (!DrawShot(@@_Shots[index]))
			{
				@@_Shots[index].AttackPoint = -1;
			}
		}

		@@_DrawFront();

		if (1 <= GetKeyInput(17)) // ? �R���g���[�������� -> �����蔻��\�� (�f�o�b�O�p)
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
				if (enemy.Kind == Enemy_Kind_e_Goal) // ? �S�[�����B -> ���̃X�e�[�W��
				{
					yield* @@_GoalMotion();

					break gameLoop;
				}
				else
				{
					yield* @@_DeadAndRestartMotion();

					continue gameLoop;
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

	SetCurtain_FD(30, -1.0);
//	Fadeout();

	for (var<Scene_t> scene of CreateScene(40))
	{
		@@_DrawWall();
		@@_DrawFront();

		yield 1;
	}

	ClearAllEffect(); // �������łł͂Ȃ��G�t�F�N�g���l�����āA�N���A�͕K�{�Ƃ���B
	FreezeInput();
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

	for (var<int> x = 0; x < MAP_W; x++)
	for (var<int> y = 0; y < MAP_H; y++)
	{
		var<double> dx = FIELD_L + x * TILE_W + TILE_W / 2;
		var<double> dy = FIELD_T + y * TILE_H + TILE_H / 2;

		if (Map.Table[x][y].WallFlag)
		{
			Draw(P_Wall, dx, dy, 1.0, 0.0, 1.0);

			if (IsMapCellType_EnemyGreen(Map.Table[x][y].Type)) // �G�΂̒��S
			{
				SetColor("#00ff0080");
				PrintRect_XYWH(dx, dy, 20.0, 20.0);
			}
		}
		else
		{
			Draw(P_�w�i, dx, dy, 1.0, 0.0, 1.0);
		}

		/*
		if (Map.Table[x][y].NarrowFlag) // test
		{
			SetColor("#ff00ff80");
			PrintCircle(dx, dy, 20.0);
		}
		*/
	}
}

/*
	�O�ʕ`��
*/
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

	SetColor("#ffffff");
	SetPrint(20, 80, 0);
	SetFSize(80);
	PrintLine("STAGE " + Map.Index);

	SetPrint(20, Screen_W - 65, 40);
	SetFSize(16);
	PrintLine("������@�F�@���E�L�[���ړ��@���L�[�����ɗ�����@�`�{�^�����W�����v�@�a�{�^�����ᑬ�ړ�");
	PrintLine("�L�[�{�[�h�F�@�����L�[���J�[�\���L�[�E�e���L�[2468�EHJKL�@AB�{�^����ZX�L�[");

	SetColor("#ffffff");
	PrintRect(@@_RETURN_MENU_L, @@_RETURN_MENU_T, @@_RETURN_MENU_W, @@_RETURN_MENU_H);
	SetColor("#000000");
	SetPrint(@@_RETURN_MENU_L + 15, @@_RETURN_MENU_T + 40, 0);
	SetFSize(24);
	PrintLine("���j���[�֖߂�");
}

/*
	�Q�[���J�n���[�V����
*/
function* <generatorForTask> @@_StartMotion()
{
	for (var<Scene_t> scene of CreateScene(40))
	{
		@@_DrawWall();

		Draw(
			P_Player,
			PlayerX,
			PlayerY,
			0.5 + 0.5 * scene.Rate,
			10.0 * scene.RemRate * scene.RemRate,
			1.0 + 29.0 * scene.RemRate
			);

		@@_DrawFront();

		yield 1;
	}
}

/*
	���S���ăX�^�[�g�E���[�V����
*/
function* <generatorForTask> @@_DeadAndRestartMotion()
{
	SetColor("#ff000040");
	PrintRect(0, 0, Screen_W, Screen_H);

	SE(S_Crashed);

	for (var<Scene_t> scene of CreateScene(30))
	{
		yield 1;
	}

	AddEffect_Explode(PlayerX, PlayerY);
	SE(S_Dead);

	// ���X�^�[�g�̂��߂̏���
	{
		@@_Enemies = [];
		@@_Shots = [];

		ResetPlayer();

		LoadEnemyOfMap();

		PlayerX = Map.StartPt.X;
		PlayerY = Map.StartPt.Y;
	}

	yield* @@_StartMotion();
}

/*
	�Q�[���I�����[�V����
	-- �S�[�������B
*/
function* <generatorForTask> @@_GoalMotion()
{
	for (var<Scene_t> scene of CreateScene(30))
	{
		yield 1;
	}

	for (var<Scene_t> scene of CreateScene(40))
	{
		@@_DrawWall();

		Draw(
			P_Player,
			PlayerX,
			PlayerY,
			0.5 + 0.5 * scene.RemRate,
			10.0 * scene.Rate * scene.Rate,
			1.0 + 29.0 * scene.Rate
			);

		@@_DrawFront();

		yield 1;
	}
}
