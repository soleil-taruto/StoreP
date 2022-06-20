/*
	���e
*/

/@(ASTR)

/// Shot_t
{
	<double> X // X-�ʒu
	<double> Y // Y-�ʒu

	// �U����
	// 0 == �s�g�p�E�\��
	// -1 == ���S
	// 1�` == �c��U����
	//
	<int> AttackPoint

	// �s���ƕ`��
	// �������ׂ����ƁF
	// -- �s��
	// -- �����蔻��̐ݒu
	// -- �`��
	// �U��Ԃ��ƃu���b�N��j������B
	//
	<generatorForTask> Draw // ���t���[���̓����蔻��u����

	<Crash_t> Crash; // �����蔻��

	<Action_Enemy_t> Dead // ���S�C�x���g
}

@(ASTR)/

function <boolean> DrawShot(<Shot_t> shot) // ret: ? ����
{
	return shot.Draw.next().value;
}

function <void> KillShot(<Shot_t> shot)
{
	if (shot.AttackPoint == -1) // ? �܂����S���Ă��Ȃ��B
	{
		shot.AttackPoint = -1; // ���S������B
		ShotDead(shot);
	}
}

// ���S�C�x���g���s
function <void> ShotDead(<Shot_t> shot)
{
	shot.Dead(shot);
}
