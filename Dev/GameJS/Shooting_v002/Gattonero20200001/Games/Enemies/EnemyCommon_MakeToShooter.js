/*
	�G���� - �G���G�̃V���[�^�[��
*/

/*
	Enemy_t �ǉ��t�B�[���h
	{
		<generatorForTask> @@_ShooterFlag // �V���[�^�[�������� -- HACK: �s�g�p
	}
*/

/*
	�G���G�̃V���[�^�[��

	�g�p��F
		var<Enemy_t> enemy = CreateEnemy_XXX();
		EnemyCommon_MakeToShooter(enemy);
*/
function <void> EnemyCommon_MakeToShooter(<Enemy_t> enemy)
{
	enemy.@@_ShooterFlag = true; // HACK: �s�g�p

	AddEffect(@@_Each(enemy));
}

/*
	�^�X�N
*/
function* <generatorForTask> @@_Each(<Enemy_t> enemy)
{
	for (var<int> frame = 0; ; frame++)
	{
		if (enemy.HP == -1) // ? ���Ɏ��S -> �I��
		{
			break;
		}

		if (1 <= frame && frame % 30 == 0)
		{
			@@_Shoot(enemy);
		}

		yield 1;
	}
}

/*
	�ˌ�_���s
*/
function <void> @@_Shoot(<Enemy_t> enemy)
{
	var<D2Point_t> speed = MakeXYSpeed(enemy.X, enemy.Y, PlayerX, PlayerY, 5.0);

	GetEnemies().push(CreateEnemy_Tama(enemy.X, enemy.Y, speed.X, speed.Y));
}
