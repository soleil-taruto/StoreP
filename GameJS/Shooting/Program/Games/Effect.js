/*
	�ŗL�G�t�F�N�g
*/

/*
	�G�t�F�N�g�E�e�X�g (���T���v���Ƃ��ăL�[�v)

	���s��F
		AddCommonEffect(Effect_Test(400, 300));

	x: ���S-X
	y: ���S-Y
*/
function* Effect_Test(x, y)
{
	for (var scene of CreateScene(30))
	{
		Draw(P_Dummy, x, y, 1.0, scene.Rate * Math.PI * 2.0, 1.0);

		yield 1;
	}
}
