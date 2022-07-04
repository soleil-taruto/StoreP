/*
	���e
*/

/@(ASTR)

/// Shot_t
{
	<Shot_Kind_e> Kind // ���e�̎��

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
	<generatorForTask> Draw

	<Crash_t> Crash; // ���t���[���̓����蔻��u����, null �ŏ��������邱�ƁB

	<Action Enemy_t> Dead // ���S�C�x���g
}

@(ASTR)/

/*
	�s���ƕ`��
*/
function <boolean> DrawShot(<Shot_t> shot) // ret: ? ����
{
	return shot.Draw.next().value;
}

/*
	���S
*/
function <void> KillShot(<Shot_t> shot)
{
	if (shot.AttackPoint != -1) // ? �܂����S���Ă��Ȃ��B
	{
		shot.AttackPoint = -1; // ���S������B
		@@_DeadShot(shot);
	}
}

function <void> @@_DeadShot(<Shot_t> shot)
{
	shot.Dead(shot);
}