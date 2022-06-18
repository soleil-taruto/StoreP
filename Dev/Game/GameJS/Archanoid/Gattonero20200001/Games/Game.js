/*
	�Q�[���E���C��
*/

var<Block_t[]> @@_Blocks = [];
var<Ball_t[]> @@_Balls = [];

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

		if (@@_ShootingFrame == 0) // ? �ˏo���ł͂Ȃ� -> �ˏo������`�悷��B�ˏo�����B
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
		else // ? �ˏo��
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

					@@_Balls.push(CreateBall(x, y, xAdd, yAdd));
				}
			}
			else // ? �ˏo����
			{
				if (@@_Balls.length == 0)
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

		// ====
		// �`�悱������H
		// ====

		// �u���b�N�`��
		for (var<int> index = 0; index < @@_Blocks.length; index++)
		{
			if (!DrawBlock(@@_Blocks[index]))
			{
				@@_Blocks[index] = null;
			}
		}
		RemoveFalse(@@_Blocks);

		// �{�[���`��
		for (var<int> index = 0; index < @@_Balls.length; index++)
		{
			if (!DrawBall(@@_Balls[index]))
			{
				@@_Balls[index] = null;
			}
		}
		RemoveFalse(@@_Balls);

		// �����蔻��
		{
			for (var<int> index = 0; index < @@_Balls.length; index++)
			{
				var<Ball_t> ball = @@_Balls[index];

				if (ball.X < 0.0)
				{
					ball.XAdd = Math.abs(ball.XAdd);
				}
				if (Screen_W < ball.X)
				{
					ball.XAdd = Math.abs(ball.XAdd) * -1;
				}
				if (ball.Y < 0.0)
				{
					ball.YAdd = Math.abs(ball.YAdd);
				}
			}
		}

		yield 1;
	}
}

function @@_DrawWall()
{
	SetColor(I3ColorToString(CreateI3Color(0, 0, 0)));
	PrintRect(0, 0, Screen_W, Screen_H);
}
