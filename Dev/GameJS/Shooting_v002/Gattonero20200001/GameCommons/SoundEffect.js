/*
	���ʉ��Đ�
*/

var<SE_t[]> @@_SEBuff = [];

function <void> SE(<SE_t> se)
{
	// �d���`�F�b�N
	{
		var<int> count = 0;

		for (var<SE_t> elem_se of @@_SEBuff)
		{
			if (elem_se == se)
			{
				count++;

				if (2 <= count)
				{
					return;
				}
			}
		}
	}

	@@_SEBuff.push(se);
}

function <void> @(UNQN)_EACH()
{
	if (ProcFrame % 2 == 0 && 1 <= @@_SEBuff.length)
	{
		var<SE_t> se = @@_SEBuff.shift();

		se.Handles[se.Index].Handle.volume = 1.0;
		se.Handles[se.Index].Handle.play();

		se.Index++;
		se.Index %= 5;
	}
}
