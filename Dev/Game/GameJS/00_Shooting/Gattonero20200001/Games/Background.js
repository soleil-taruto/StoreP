/*
	�w�i
*/

function* <generatorForTask> BackgroundTask()
{
	// ���T���v�� -- �v�폜
	{
		for (; ; )
		{
			yield* Repeat(1, 60); // 60�t���[���҂B-- �E�F�C�g�͂��̗l�ɋL�q����B
		}
	}
}
