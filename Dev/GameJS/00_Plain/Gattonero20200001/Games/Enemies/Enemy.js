/*
	�G
*/

/@(ASTR)

/// Enemy_t
{
	<int> Kind // �G�̎��

	<double> X // X-�ʒu
	<double> Y // Y-�ʒu

	<generatorForTask> Draw // �s���ƕ`��

	<Crash_t> Crash // ���t���[���̓����蔻��u����, null �ŏ��������邱�ƁBnull == �����蔻�薳��
}

@(ASTR)/

/*
	�s���ƕ`��
*/
function <boolean> DrawEnemy(<Enemy_t> enemy) // ret: ? ����
{
	return enemy.Draw.next().value;
}
