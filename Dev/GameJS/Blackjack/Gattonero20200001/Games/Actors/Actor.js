/*
	�A�N�^�[ (�Q�[���E�I�u�W�F�N�g)
*/

/@(ASTR)

/// Actor_t
{
	<int> Kind // �A�N�^�[�̎��

	<double> X // X-�ʒu
	<double> Y // Y-�ʒu

	// �s���ƕ`��
	// �������ׂ����ƁF
	// -- �s��
	// -- �����蔻��̐ݒu
	// -- �`��
	// �U��Ԃ��Ƃ��̃A�N�^�[��j������B
	//
	<generatorForTask> Draw
}

@(ASTR)/

/*
	�s���ƕ`��
*/
function <boolean> DrawActor(<Actor_t> actor) // ret: ? ����
{
	return NextVal(actor.Draw);
}