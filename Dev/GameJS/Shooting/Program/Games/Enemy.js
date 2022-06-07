/*
	�G
*/

/@(ASTR)

/// Enemy_t
{
	<double> X // X-�ʒu
	<double> Y // Y-�ʒu
	<int> HP // �̗�
	<boolean> Crashed // ���e�ƏՓ˂�����
	<double> �����蔻��_R
	<generatorForTask> Each
}

@(ASTR)/

/*
	�G���X�g
*/
var<Enemy_t> Enemies = [];

/*
	�G����
*/
function <Enemy_t> CreateEnemy(<double> x, <double> y)
{
	var ret =
	{
		// �ʒu
		X: x,
		Y: y,

		// �̗�
		HP: 10,

		// ���e�ƏՓ˂�����
		Crashed: false,

		�����蔻��_R: 45.0,
	};

	ret.Each = @@_Each(ret);

	return ret;
}

/*
	ret: ? ����
*/
function <boolean> Enemy_Each(<Enemy_t> enemy)
{
	return enemy.Each.next().value;
}

function* <generatorForTask> @@_Each(<Enemy_t> enemy)
{
	var speedX = Math.random() * -2.0 - 1.0;
	var speedY = (Math.random() - 0.5) * 6.0;

	for (; ; )
	{
		enemy.X += speedX;
		enemy.Y += speedY;

		if (enemy.Y < 0 && speedY < 0)
		{
			speedY = Math.abs(speedY);
		}
		else if (GetField_H() < enemy.Y && 0 < speedY)
		{
			speedY = -Math.abs(speedY);
		}

		// ��ʊO�ɏo���̂őޏ�
		if (enemy.X < -100.0)
		{
			break;
		}

		if (enemy.Crashed)
		{
			enemy.HP--;

			// �G�E���S
			if (enemy.HP <= 0)
			{
				Score += 100;
				SE(S_Explode);
				AddCommonEffect(Effect_Explode(GetField_L() + enemy.X, GetField_T() + enemy.Y));
				break;
			}
		}

		// �e������
		if (GetRand(100) == 0)
		{
			// TODO ��ʊO�E���@�ɋ߂��ꍇ�͌����Ȃ��B

			Tamas.push(CreateTama(enemy.X, enemy.Y));
		}

		// �`��
		Draw(P_Enemy_0001, GetField_L() + enemy.X, GetField_T() + enemy.Y, 1.0, 0.0, 1.0);

		// �`�� test
//		SetColor("#00ff00");
//		PrintRectCenter(GetField_L() + enemy.X, GetField_T() + enemy.Y, 20, 20);

		yield 1;
	}
}
