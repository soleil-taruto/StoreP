/*
	�ŗL�G�t�F�N�g
*/

/*
	�_�~�[�G�t�F�N�g

	�ǉ����@�F
		AddEffect(Effect_Dummy(x, y));

	���T���v���Ƃ��ăL�[�v
*/
function* <generatorForTask> Effect_Dummy(<double> x, <double> y)
{
	for (var<Scene_t> scene of CreateScene(30))
	{
		Draw(P_Dummy, x, y, 1.0, scene.Rate * Math.PI, 1.0);

		yield 1;
	}
}
