/*
	���e
*/

/@(ASTR)

/// Shot_t
{
	<int> Kind // ���e�̎��

	<double> X // X-�ʒu
	<double> Y // Y-�ʒu

	<generatorForTask> Draw // �s���ƕ`��

	<Crash_t> Crash; // ���t���[���̓����蔻��u����, null �ŏ��������邱�ƁBnull == �����蔻�薳��
}

@(ASTR)/

/*
	�s���ƕ`��
*/
function <boolean> DrawShot(<Shot_t> shot) // ret: ? ����
{
	return shot.Draw.next().value;
}
