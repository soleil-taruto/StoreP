/*
	���e
*/

/@(ASTR)

/// Shot_t
{
	<int> Kind // ���e�̎��

	<double> X // X-�ʒu
	<double> Y // Y-�ʒu

	// �U����
	// -1 == ���S
	// 0�` == �c��U���� -- �[���̏ꍇ�A��e���[�V�����͎��s����邯�Ǒ̗͂�����Ȃ��B
	//
	<int> AttackPoint

	// �s���ƕ`��
	// �������ׂ����ƁF
	// -- �s��
	// -- �����蔻��̐ݒu
	// -- �`��
	// �U��Ԃ��Ƃ��̎��e��j������B
	//
	<generatorForTask> Draw

	<Crash_t> Crash; // ���t���[���̓����蔻��u����, null �ŏ��������邱�ƁBnull == �����蔻�薳��

	<Action Shot_t> Dead // ���S�C�x���g
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