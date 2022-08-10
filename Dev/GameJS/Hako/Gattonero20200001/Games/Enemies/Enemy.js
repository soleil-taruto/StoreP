/*
	�G
*/

/@(ASTR)

/// Enemy_t
{
	<int> Kind // �G�̎��

	<double> X // X-�ʒu
	<double> Y // Y-�ʒu

	// �̗�
	// 0 == ���G
	// -1 == ���S
	// 1�` == �c��̗�
	//
	<int> HP

	// �s���ƕ`��
	// �������ׂ����ƁF
	// -- �s��
	// -- �����蔻��̐ݒu
	// -- �`��
	// �U��Ԃ��Ƃ��̓G��j������B
	//
	<generatorForTask> Draw

	<Crash_t> Crash // ���t���[���̓����蔻��u����, null �ŏ��������邱�ƁBnull == �����蔻�薳��

	<Action Enemy_t int> Damaged // ��e�C�x���g
	<Action Enemy_t> Dead // ���S�C�x���g
}

@(ASTR)/

/*
	�s���ƕ`��
*/
function <boolean> DrawEnemy(<Enemy_t> enemy) // ret: ? ����
{
	return enemy.Draw.next().value;
}

/*
	���S
*/
function <void> KillEnemy(<Enemy_t> enemy)
{
	if (enemy.HP != -1) // ? �܂����S���Ă��Ȃ��B
	{
		enemy.HP = -1; // ���S������B
		@@_DeadEnemy(enemy);
	}
}

function <void> EnemyDamaged(<Enemy_t> enemy, <int> damagePoint)
{
	enemy.Damaged(enemy, damagePoint);
}

function <void> @@_DeadEnemy(<Enemy_t> enemy)
{
	enemy.Dead(enemy);
}
