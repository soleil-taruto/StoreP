/*
	����

	�t�@�C���� Input.js -> KF_Input.js �̗��R�F
	�{�\�[�X�� @@_EACH() �� Gamepad.js, Keyboard.js �� *_EACH ����Ɏ��s����K�v������B
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
var<int> PadInputIndex_Pause = 9;

/*
	�e�{�^���̉�����ԃJ�E���^
*/
var<int> @@_Count_2 = 0;
var<int> @@_Count_4 = 0;
var<int> @@_Count_6 = 0;
var<int> @@_Count_8 = 0;
var<int> @@_Count_A = 0;
var<int> @@_Count_B = 0;
var<int> @@_Count_Pause = 0;

/*
	�e�{�^���̉�����ԃJ�E���^�̗�
*/
function* <int[]> @@_Counts()
{
	yield @@_Count_2;
	yield @@_Count_4;
	yield @@_Count_6;
	yield @@_Count_8;
	yield @@_Count_A;
	yield @@_Count_B;
	yield @@_Count_Pause;
}

function <void> @@_EACH()
{
	@@_Count_2     = @@_Check(@@_Count_2,     PadInputIndex_2,     [ 40, 74,  98 ]); // �J�[�\���� , J , �e���L�[2
	@@_Count_4     = @@_Check(@@_Count_4,     PadInputIndex_4,     [ 37, 72, 100 ]); // �J�[�\���� , H , �e���L�[4
	@@_Count_6     = @@_Check(@@_Count_6,     PadInputIndex_6,     [ 39, 76, 102 ]); // �J�[�\���E , L , �e���L�[6
	@@_Count_8     = @@_Check(@@_Count_8,     PadInputIndex_8,     [ 38, 75, 104 ]); // �J�[�\���� , K , �e���L�[8
	@@_Count_A     = @@_Check(@@_Count_A,     PadInputIndex_A,     [ 90 ]); // Z
	@@_Count_B     = @@_Check(@@_Count_B,     PadInputIndex_B,     [ 88 ]); // X
	@@_Count_Pause = @@_Check(@@_Count_Pause, PadInputIndex_Pause, [ 32 ]); // �X�y�[�X
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

var @@_FreezeInputUntilReleaseFlag = false;

function <int> @@_GetInput(<int> counter)
{
	if (@@_FreezeInputUntilReleaseFlag)
	{
		if (ToArray(@@_Counts()).some(counter => counter != 0))
		{
			return 0;
		}

		@@_FreezeInputUntilReleaseFlag = false;
	}

	return 1 <= FreezeInputFrame ? 0 : counter;
}

// ������ �{�^���E�L�[������ 1 �}�E�X������ -1 �Ŕ��肷��B

// ----
// GetInput_X ��������
// ----

function <int> GetInput_2()
{
	return @@_GetInput(@@_Count_2);
}

function <int> GetInput_4()
{
	return @@_GetInput(@@_Count_4);
}

function <int> GetInput_6()
{
	return @@_GetInput(@@_Count_6);
}

function <int> GetInput_8()
{
	return @@_GetInput(@@_Count_8);
}

/*
	����
	�W�����v
*/
function <int> GetInput_A()
{
	return @@_GetInput(@@_Count_A);
}

/*
	�L�����Z��
	�U��
*/
function <int> GetInput_B()
{
	return @@_GetInput(@@_Count_B);
}

/*
	�|�[�Y
*/
function <int> GetInput_Pause()
{
	return @@_GetInput(@@_Count_Pause);
}

// ----
// GetInput_X �����܂�
// ----

/*
	�L�[��{�^���̉������ςȂ���A�łƂ��Č��o����B

	�g�p��F
		if (IsPound(GetInput_A()))
		{
			// ...
		}
*/
function <boolean> IsPound(<int> counter)
{
	var<int> POUND_FIRST_DELAY = 17;
	var<int> POUND_DELAY = 4;

	return counter == 1 || POUND_FIRST_DELAY < counter && (counter - POUND_FIRST_DELAY) % POUND_DELAY == 1;
}

// ���͗}�~�t���[����
var<int> FreezeInputFrame = 0;

function @(UNQN)_EACH()
{
	FreezeInputFrame = CountDown(FreezeInputFrame);
}

function <void> FreezeInput_Frame(<int> frame) // frame: 1 == ���̃t���[���̂�, 2 == ���̃t���[���Ǝ��̃t���[�� ...
{
	ClearMouseDown();
	FreezeInputFrame = Math.max(FreezeInputFrame, frame); // frame ��蒷���t���[���������ɐݒ肳��Ă�����A�������D�悷��B
}

function <void> FreezeInput()
{
	FreezeInput_Frame(1);
}

function <void> FreezeInputUntilRelease()
{
	@@_FreezeInputUntilReleaseFlag = true;
}

function* <generatorForTask> WaitToReleaseButton()
{
	while (ToArray(@@_Counts()).some(counter => counter != 0))
	{
		yield 1;
	}
}
