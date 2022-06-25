/*
	����
*/

/*
	�Q�[���p�b�h�̃{�^���E�C���f�b�N�X
	�ύX�\
*/
var<int> PadInputIndex_2 = 102;
var<int> PadInputIndex_4 = 104;
var<int> PadInputIndex_6 = 106;
var<int> PadInputIndex_8 = 108;
var<int> PadInputIndex_A = 0;
var<int> PadInputIndex_B = 3;

/*
	�e�{�^���̉�����ԃJ�E���^
*/
var<int> @@_Count_2 = 0;
var<int> @@_Count_4 = 0;
var<int> @@_Count_6 = 0;
var<int> @@_Count_8 = 0;
var<int> @@_Count_A = 0;
var<int> @@_Count_B = 0;

function <void> @@_EACH()
{
	@@_Count_2 = @@_Check(@@_Count_2, PadInputIndex_2, [ 40, 74,  98 ]); // �J�[�\���� , J , �e���L�[2
	@@_Count_4 = @@_Check(@@_Count_4, PadInputIndex_4, [ 37, 72, 100 ]); // �J�[�\���� , H , �e���L�[4
	@@_Count_6 = @@_Check(@@_Count_6, PadInputIndex_6, [ 39, 76, 102 ]); // �J�[�\���E , L , �e���L�[6
	@@_Count_8 = @@_Check(@@_Count_8, PadInputIndex_8, [ 38, 75, 104 ]); // �J�[�\���� , K , �e���L�[8
	@@_Count_A = @@_Check(@@_Count_A, PadInputIndex_A, [ 90 ]); // Z
	@@_Count_B = @@_Check(@@_Count_B, PadInputIndex_B, [ 88 ]); // X
}

function <int> @@_Check(<int> counter, <int> padInputIndex, <int[]> keyCodes)
{
	var<boolean> statusPad = GetPadInput(padInputIndex);
	var<boolean> statusKey = false;

	for (var<int> keyCode of keyCodes)
	{
		if (1 <= GetKeyInput(keyCode))
		{
			statusKey = true;
		}
	}
	var<boolean> status = statusPad || statusKey;

	if (status) // ? �����Ă���B
	{
		// �O�� �� ����
		// -1   ��  1
		//  0   ��  1
		//  1�` ��  2�`

		counter = Math.max(counter + 1, 1);
	}
	else // ? �����Ă��Ȃ��B
	{
		// �O�� �� ����
		// -1   ��  0
		//  0   ��  0
		//  1�` �� -1

		counter = Math.max(Math.max(counter, 0) * -1, -1);
	}
	return counter;
}

function <int> GetInput_2()
{
	return @@_Count_2;
}

function <int> GetInput_4()
{
	return @@_Count_4;
}

function <int> GetInput_6()
{
	return @@_Count_6;
}

function <int> GetInput_8()
{
	return @@_Count_8;
}

/*
	����
	�W�����v
*/
function <int> GetInput_A()
{
	return @@_Count_A;
}

/*
	�L�����Z��
	�U��
*/
function <int> GetInput_B()
{
	return @@_Count_B;
}
