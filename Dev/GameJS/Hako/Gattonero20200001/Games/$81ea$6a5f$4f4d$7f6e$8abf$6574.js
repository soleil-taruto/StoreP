/*
	���@�ʒu����
*/

// �^�b�`���
// 0 == ����
// 1 == �V��
// 2 == �n��
//
var<boolean> @@_Touch = 0;

function <void> Do_���@�ʒu����()
{
	// reset
	{
		@@_Touch = 0;
	}

	// TODO ???
	// TODO ???
	// TODO ???
}

function <boolean> Is_���@�ʒu����_Touch_Roof()
{
	return @@_Touch == 1;
}

function <boolean> Is_���@�ʒu����_Touch_Ground()
{
	return @@_Touch == 2;
}
