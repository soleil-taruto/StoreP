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
	<generatorForTask> Draw

	<Crash_t> Crash; // �����蔻��
}

@(ASTR)/

function <boolean> DrawShot(<Shot_t> shot) // ret: ? ����
{
	return shot.Draw.next().value;
}
