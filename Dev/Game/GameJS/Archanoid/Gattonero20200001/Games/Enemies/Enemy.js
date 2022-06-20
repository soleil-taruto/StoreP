/*
	�G
*/

/@(ASTR)

/// Enemy_t
{
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
	// �U��Ԃ��ƃu���b�N��j������B
	//
	<generatorForTask> Draw

	<Crash_t> Crash // ���t���[���̓����蔻��u����

	<Action_Enemy_t> Dead // ���S�C�x���g

	<string> Name // �G�̖��O(���)
}

@(ASTR)/

function <boolean> DrawEnemy(<Enemy_t> enemy) // ret: ? ����
{
	return enemy.Draw.next().value;
}

function <void> KillEnemy(<Enemy_t> enemy)
{
	if (enemy.HP != -1) // ? �܂����S���Ă��Ȃ��B
	{
		enemy.HP = -1; // ���S������B
		EnemyDead(enemy);
	}
}

// ���S�C�x���g���s
function <void> EnemyDead(<Enemy_t> enemy)
{
	enemy.Dead(enemy);
}
