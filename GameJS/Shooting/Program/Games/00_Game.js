/*
	�Q�[���E���C��
*/

function* GameMain(room)
{
	// �J�n���[�����Z�b�g����B
	//
//	NextRoom = StartRoom(); // �{�ԗp
//	NextRoom = TestRoom(); // �e�X�g�E���[��
//	NextRoom = TestRoomB(); // �e�X�g�E���[��B

	switch (room)
	{
	case 1:
		NextRoom = TestRoom();
		break;

	case 2:
		NextRoom = TestRoomB();
		break;

	default:
		error;
	}

	for (; ; )
	{
		yield* NextRoom;
	}
}

// �������o��O�Ɏ��̕����̃W�F�l���[�^���Z�b�g���邱�ƁB
var NextRoom = null;

function EnterRoom()
{
	ClearMouseDown();
	NextRoom = null; // reset
}

function LeaveRoom()
{
	ClearMouseDown();
}

function StartDrawRoom()
{
	// none
}

function EndDrawRoom()
{
	// none
}
