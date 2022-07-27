/*
	�Q�[���E���C��
*/

// �G���X�g
var<Enemy_t[]> @@_Enemies = [];

// ���e���X�g
var<Shot_t[]> @@_Shots = [];

// �J�����ʒu
var<D2Point_t> Camera = CreateD2Point(0.0, 0.0);

// �Q�[���p�^�X�N
var<TaskManager_t> GameTasks = CreateTaskManager();

/*
	�Q�[���I�����R
*/
var<GameEndReason_e> GameEndReason = GameEndReason_e_STAGE_CLEAR;

/*
	���[�U�[�ɂ��v���C���[����̗}�~
*/
var<boolean> UserInputDisabled = false;

/*
	�Q�[���I�����N�G�X�g(�^�C�g���֖߂�)
*/
var<boolean> GameRequestReturnToTitleMenu = false;

/*
	�Q�[���I�����N�G�X�g(�X�e�[�W�N���A)
*/
var<boolean> GameRequestStageClear = false;

var<int> @@_MapIndex = -1;
var<boolean> @@_RequestRestart = false;

function* <generatorForTask> GameMain(<int> mapIndex)
{
	// reset
	{
		@@_Enemies = [];
		@@_Shots = [];

		Camera = CreateD2Point(0.0, 0.0);
		ClearAllTask(GameTasks);
		GameEndReason = GameEndReason_e_STAGE_CLEAR;
		GameRequestReturnToTitleMenu = false;
		GameRequestStageClear = false;

		@@_MapIndex = mapIndex;
		@@_RequestRestart = false;

		ResetPlayer();
	}

//	var<Func boolean> f_�S�~��� = Supplier(@@_T_�S�~���()); // ���\�b�h��_�p�~
	AddTask(GameTasks, @@_T_�S�~���());

	LoadMap(mapIndex);
	LoadEnemyOfMap();
	MoveToStartPtOfMap();

	SetCurtain();
	FreezeInput();

	@@_�J�����ʒu����(true);

	yield* @@_StartMotion();

	PlayStageMusic(mapIndex);

gameLoop:
	for (; ; )
	{
		if (GetInput_Pause() == 1) // �|�[�Y
		{
			yield* @@_PauseMenu();
		}
		if (GameRequestReturnToTitleMenu)
		{
			GameEndReason = GameEndReason_e_RETURN_MENU;
			break;
		}
		if (GameRequestStageClear)
		{
			GameEndReason = GameEndReason_e_STAGE_CLEAR;
			break;
		}
		if (@@_RequestRestart)
		{
			yield* @@_DeadAndRestartMotion(true);

			continue gameLoop;
		}

		if (DEBUG && GetKeyInput(84) == 1) // ? T ���� -> �U���e�X�g
		{
			PlayerAttack = Supplier(CreateAttack_BDummy());
		}

		@@_�J�����ʒu����(false);

		// ====
		// �`�悱������
		// ====

		@@_DrawWall();
		@@_DrawMap();

		if (
			PlayerDamageFrame == 0 && // ��e�����瑦�I��
			PlayerAttack != null &&
			PlayerAttack()
			)
		{
			// noop
		}
		else
		{
			PlayerAttack = null;
			DrawPlayer(); // �v���C���[�̕`��
		}

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

		ExecuteAllTask(GameTasks);
		@@_DrawFront();

		if (DEBUG && 1 <= GetKeyInput(17)) // ? �R���g���[�������� -> �����蔻��\�� (�f�o�b�O�p)
		{
			var<double> dPlX = PlayerX - Camera.X;
			var<double> dPlY = PlayerY - Camera.Y;

			SetColor("#000000a0");
			PrintRect(0, 0, Screen_W, Screen_H);
			SetColor("#00ff0030");
			PrintRect_LTRB(
				dPlX - PLAYER_���ʔ���Pt_X,
				dPlY - PLAYER_���ʔ���Pt_YT,
				dPlX + PLAYER_���ʔ���Pt_X,
				dPlY + PLAYER_���ʔ���Pt_YB
				);
			PrintRect_LTRB(
				dPlX - PLAYER_�]�V����Pt_X,
				dPlY - PLAYER_�]�V����Pt_Y,
				dPlX + PLAYER_�]�V����Pt_X,
				dPlY
				);
			PrintRect_LTRB(
				dPlX - PLAYER_�ڒn����Pt_X,
				dPlY,
				dPlX + PLAYER_�ڒn����Pt_X,
				dPlY + PLAYER_�ڒn����Pt_Y
				);
			SetColor("#ff0000a0");
			DrawCrash(PlayerCrash);
			SetColor("#ffffffa0");

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
				if (enemy.HP == 0) // ? ���G
				{
					continue;
				}

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
				PlayerHP -= enemy.AttackPoint;

				if (1 <= PlayerHP) // ? �v���C���[����
				{
					PlayerDamageFrame = 1;
				}
				else // ? �v���C���[���S
				{
					PlayerHP = -1;

					yield* @@_DeadAndRestartMotion(false);

					continue gameLoop;
				}

				if (enemy.HitDie)
				{
					KillEnemy(enemy);
				}
			}
		}

		// ====
		// �����蔻�肱���܂�
		// ====

//		f_�S�~���(); // ���\�b�h��_�p�~

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

	if (GameEndReason == GameEndReason_e_STAGE_CLEAR)
	{
		ClearAllEffect();

		yield* @@_GoalMotion();

		ClearAllEffect();
	}
	else if (GameEndReason == GameEndReason_e_RETURN_MENU)
	{
		// noop
	}
	else
	{
		error(); // never -- �s���� GameEndReason
	}

	SetCurtain_FD(30, -1.0);
//	Fadeout();

	for (var<Scene_t> scene of CreateScene(40))
	{
		@@_DrawWall();
		@@_DrawMap();
//		@@_DrawFront();

		yield 1;
	}

	ClearAllEffect(); // �������łł͂Ȃ��G�t�F�N�g���l�����āA�N���A�͕K�{�Ƃ���B
	FreezeInput();

	// ������ end of GameMain() ������
}

function <void> @@_�J�����ʒu����(<boolean> ��u��)
{
	var<double> targCamX = PlayerX - Screen_W / 2;
	var<double> targCamY = PlayerY - Screen_H / 2;

	targCamX = ToRange(targCamX, 0.0, TILE_W * Map.W - Screen_W);
	targCamY = ToRange(targCamY, 0.0, TILE_H * Map.H - Screen_H);

	Camera.X = Approach(Camera.X, targCamX, ��u�� ? 0.0 : 0.8);
	Camera.Y = Approach(Camera.Y, targCamY, ��u�� ? 0.0 : 0.8);
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
			TILE_W * Map.W + Screen_W * MGN_SCREEN_NUM,
			TILE_H * Map.H + Screen_H * MGN_SCREEN_NUM
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
	var<double> SLIDE_RATE = 0.1;

	var<Image> wallImg = GetStageWallPicture(@@_MapIndex);
	var<int> wallImg_w = wallImg.naturalWidth;
	var<int> wallImg_h = wallImg.naturalHeight;

	var<int> cam_w = Map.W * TILE_W - Screen_W;
	var<int> cam_h = Map.H * TILE_H - Screen_H;

	var<double> slide_w = cam_w * SLIDE_RATE;
	var<double> slide_h = cam_h * SLIDE_RATE;

	var<double> wall_w = slide_w + Screen_W;
	var<double> wall_h = slide_h + Screen_H;

	var<D4Rect_t> wallRect = AdjustRectExterior(
		CreateD2Size(wallImg_w, wallImg_h),
		CreateD4Rect(0.0, 0.0, wall_w, wall_h)
		);

	var<double> x = cam_w == 0 ? 0.0 : Camera.X / cam_w;
	var<double> y = cam_h == 0 ? 0.0 : Camera.Y / cam_h;

	x *= slide_w;
	y *= slide_h;

	var<D4Rect_t> drRect = CreateD4Rect(
		wallRect.L - x,
		wallRect.T - y,
		wallRect.W,
		wallRect.H
		);

	var<double> dx = drRect.L + drRect.W / 2.0;
	var<double> dy = drRect.T + drRect.H / 2.0;
	var<double> dz = drRect.W / wallImg_w;
//	var<double> dz = drRect.H / wallImg_h;

	Draw(wallImg, dx, dy, 1.0, 0.0, dz);

	DrawCurtain(-0.5);
}

/*
	�}�b�v�`��
*/
function <void> @@_DrawMap()
{
	var<I2Point_t> lt = ToTablePoint(Camera);
	var<I2Point_t> rb = ToTablePoint_XY(Camera.X + Screen_W, Camera.Y + Screen_H);
	var<int> l = lt.X;
	var<int> t = lt.Y;
	var<int> r = rb.X;
	var<int> b = rb.Y;

	// �}�[�W���t�^
	{
		var<int> MARGIN = 2; // �}�[�W���E�Z����

		l -= MARGIN;
		t -= MARGIN;
		r += MARGIN;
		b += MARGIN;
	}

	for (var<int> x = l; x <= r; x++)
	for (var<int> y = t; y <= b; y++)
	{
		var<MapCell_t> cell = GetMapCell_XY(x, y);
		var<Tile_t> tile = cell.Tile;

		var<D2Point> dPt = ToFieldPoint_XY(x, y);
		var<double> dx = dPt.X;
		var<double> dy = dPt.Y;

		DrawTile(tile, dx - Camera.X, dy - Camera.Y);
	}
}

/*
	�O�ʕ`��
*/
function <void> @@_DrawFront()
{
	// none -- �X�e�[�^�X�Ȃǂ�\������B
}

/*
	�Q�[���J�n���[�V����
*/
function* <generatorForTask> @@_StartMotion()
{
	for (var<Scene_t> scene of CreateScene(60))
	{
		@@_�J�����ʒu����(false);

		@@_DrawWall();
		@@_DrawMap();

		for (var<int> c = 0; c < 4; c++)
		{
			var<double> dx = PlayerX - Camera.X;
			var<double> dy = PlayerY - Camera.Y;

			dy -= 14; // �ڒn�����Ƃ���ɉ����o����鋗��

			var<D2Point_t> pt = AngleToPoint(
				scene.RemRate * scene.RemRate * 10.0 + (Math.PI / 2.0) * c,
				scene.RemRate * scene.RemRate * 500.0
				);

			dx += pt.X;
			dy += pt.Y;

			Draw(P_PlayerStand, dx, dy, 0.5, 0.0, 1.0 + scene.RemRate * 2.0);
		}

		yield 1;
	}
}

/*
	���S���ăX�^�[�g�E���[�V����

	restartRequested: ? �ăX�^�[�g�̗v���ɂ����s���ꂽ
*/
function* <generatorForTask> @@_DeadAndRestartMotion(<boolean> restartRequested)
{
	if (!restartRequested)
	{
		// �ԃJ�[�e��
		SetColor("#ff000040");
		PrintRect(0, 0, Screen_W, Screen_H);

		SE(S_Crashed);

		yield* Wait(30);

		AddEffect(Effect_Explode_L(PlayerX, PlayerY));
		SE(S_Dead);

		for (var<Scene_t> scene of CreateScene(30))
		{
			@@_DrawWall();
			@@_DrawMap();

			yield 1;
		}
	}

	// �ăX�^�[�g�̂��߂̏���
	{
		@@_Enemies = [];
		@@_Shots = [];
		@@_RequestRestart = false;

		ResetPlayer();

		ClearAllTask(GameTasks);
		LoadEnemyOfMap();
		MoveToStartPtOfMap();
	}

	yield* @@_StartMotion();
}

/*
	�Q�[���I�����[�V����
	-- �S�[�������B
*/
function* <generatorForTask> @@_GoalMotion()
{
	yield* Wait(30);

	SE(S_Clear);

	for (var<int> c = 0; c < 50; c++)
	{
		AddEffect(function* <generatorForTask> ()
		{
			var<double> x = PlayerX;
			var<double> y = PlayerY;
			var<D2Point_t> speed = AngleToPoint(Math.PI * 2.0 * GetRand1(), GetRand3(5.0, 15.0));

			var<double> r = Math.PI * 2.0 * GetRand1();
			var<double> rAdd = 0.3 * GetRand2();

			for (; ; )
			{
				x += speed.X;
				y += speed.Y;
				r += rAdd;

				if (IsOutOfCamera(CreateD2Point(x, y), 50.0))
				{
					break;
				}

				Draw(P_PlayerStand, x - Camera.X, y - Camera.Y, 0.7, r, 2.0);

				yield 1;
			}
		}());
	}

	for (var<Scene_t> scene of CreateScene(60))
	{
		@@_DrawWall();
		@@_DrawMap();

		yield 1;
	}
}

/*
	�|�[�Y���
*/
function* <generatorForTask> @@_PauseMenu()
{
	var<int> selectIndex = 0;

	FreezeInput();

gameLoop:
	for (; ; )
	{
		@@_DrawWall();
		@@_DrawMap();

		selectIndex = DrawSimpleMenu(
			selectIndex,
			100,
			200,
			100,
			[
				"�ăX�^�[�g",
				"�^�C�g���ɖ߂�",
				"�Q�[���ɖ߂�",
			]);

		if (DSM_Desided)
		switch (selectIndex)
		{
		case 0:
			@@_RequestRestart = true;
			break gameLoop;

		case 1:
			GameRequestReturnToTitleMenu = true;
			break gameLoop;

		case 2:
			break gameLoop;

		default:
			error(); // never
		}
		yield 1;
	}
	FreezeInput();
	FreezeInputUntilRelease();
}
