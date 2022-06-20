/*
	�Q�[���E���C��
*/

// �G���X�g
var<Enemy_t[]> @@_Enemies = [];

// ���e���X�g
var<Shot_t[]> @@_Shots = [];

/*
	�ˏo�\�{�[����
*/
var<int> @@_BallStockNum = 10;

/*
	�ˏo���t���[��
	0 == ����
	1�` == �ˏo��
*/
var<boolean> @@_ShootingFrame = 0;

/*
	�ˏo�p�x
*/
var<double> @@_ShootingAngle;

/*
	�ˏo���� X-�ʒu
*/
var<double> @@_Shooter_X = Screen_W / 2;

/*
	�A���Ă����{�[���� X-�ʒu
	null == ����
*/
var<double> @@_Return_X = null;

function* <generatorForTask> GameMain()
{
	for (; ; )
	{
		@@_DrawWall();

		var<double> mx = GetMouseX();
		var<double> my = GetMouseY();

		if (@@_ShootingFrame == 0) // ? �ˏo���ł͂Ȃ� -> �ˏo������`�悷��B�ˏo�\
		{
			var<double> sx = @@_Shooter_X;
			var<double> sy = Screen_H;

			var<double> shootRad = GetAngle(mx - sx, my - sy);

			if (shootRad < Math.PI / 2)
			{
				shootRad += Math.PI * 2;
			}
			var<double> RAD_LMT = 0.4;

			shootRad = ToRange(shootRad, Math.PI + RAD_LMT, Math.PI * 2 - RAD_LMT);

			for (var<int> c = 1; c <= 5; c++)
			{
				var<D2Point_t> pt = AngleToPoint(shootRad, c * 32.0);

				pt.X += sx;
				pt.Y += sy;

				Draw(P_�e��, pt.X, pt.Y, 0.5, 0.0, 1.0);
			}

			if (GetMouseDown() == -1)
			{
				@@_ShootingFrame = 1;
				@@_ShootingAngle = shootRad;
			}
		}
		else // ? �ˏo�� -- �ˏo�s��
		{
			var<int> SHOOT_PER_FRAME = 10;
			var<boolean> completed = false;

			if (@@_ShootingFrame / SHOOT_PER_FRAME <= @@_BallStockNum) // ? �ˏo������
			{
				if (@@_ShootingFrame % SHOOT_PER_FRAME == 0)
				{
					var<double> x = @@_Shooter_X;
					var<double> y = Screen_H;

					var<D2Point_t> speed = AngleToPoint(@@_ShootingAngle, 8.0);

					var<double> xAdd = speed.X;
					var<double> yAdd = speed.Y;

					@@_Shots.push(CreateShot_Ball(x, y, xAdd, yAdd));
				}
			}
			else // ? �ˏo����
			{
				if (@@_Shots.length == 0)
				{
					completed = true;
				}
			}

			if (completed)
			{
				@@_ShootingFrame = 0;
			}
			else
			{
				@@_ShootingFrame++;
			}
		}

		if (GetRand1() < 0.01) // �b��
		{
			var<double> x = GetRand1() * Screen_W;
			var<double> y = -30.0;

			@@_Enemies.push(CreateEnemy_SquareBlock(x, y, 10, 2));
		}

		// ====
		// �`�悱������
		// ====

		// memo: ���S���Ă��邩�`�F�b�N����̂́u�����蔻��v����

		// �G�̕`��
		//
		for (var<int> index = 0; index < @@_Enemies.length; index++)
		{
			if (!DrawEnemy(@@_Enemies[index]))
			{
				@@_Enemies[index] = null;
			}
		}
		RemoveFalse(@@_Enemies);

		// ���e�̕`��
		//
		for (var<int> index = 0; index < @@_Shots.length; index++)
		{
			if (!DrawShot(@@_Shots[index]))
			{
				@@_Shots[index] = null;
			}
		}
		RemoveFalse(@@_Shots);

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

				if (IsCrashed(enemy.Crashed, shot.Crashed)) // ? �Փ˂��Ă���B
				{
					enemy.HP -= shot.AttackPoint;

					if (enemy.HP <= 0) // ? ���S�����B
					{
						enemy.HP = 0; // ��肷��������

						KillEnemy(enemy);

						break; // ���̓G�͎��S�����̂ŁA�ȍ~�̎��e�ɂ��Ă͔���s�v�A���̓G�ցB
					}
				}
			}
		}

		for (var<int> index = 0; index < @@_Shots.length; index++) // ���ʁE�㕔����
		{
			var<Shot_t> shot = @@_Shots[index];

			if (shot.X < 0.0)
			{
				shot.XAdd = Math.abs(shot.XAdd);
			}
			if (Screen_W < shot.X)
			{
				shot.XAdd = Math.abs(shot.XAdd) * -1;
			}
			if (shot.Y < 0.0)
			{
				shot.YAdd = Math.abs(shot.YAdd);
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

function @@_DrawWall()
{
	SetColor(I3ColorToString(CreateI3Color(0, 0, 0)));
	PrintRect(0, 0, Screen_W, Screen_H);
}
