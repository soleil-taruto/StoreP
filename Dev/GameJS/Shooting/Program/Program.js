/*
	�A�v���P�[�V�����p���C�����W���[��
*/

var<string> APP_IDENT = "{38e2fd96-2424-4de8-a020-88d6cfbebef9}"; // �A�v�����ɕύX����B

window.onload = function() { Main(); }; // �G���g���[�|�C���g�Ăяo��

// �G���g���[�|�C���g
function <void> Main()
{
	ProcMain(@@_Main());
}

// ���C��
function* <generatorForTask> @@_Main()
{
	// ���\�[�X�ǂݍ��ݒ��͑ҋ@
	while (1 <= Loading)
	{
		SetColor("#ffffff");
		PrintRect(0, 0, Screen_W, Screen_H);

		SetColor("#000000");
		SetPrint(10, 25, 50);
		SetFont("16px '���C���I'");
		PrintLine("���\�[�X��ǂݍ���ł��܂� ...�@�c�� " + Loading + " ��");

		yield 1;
	}

	// -- choose one --

	yield* @@_Main2();
//	yield* Test01();
//	yield* Test02();
//	yield* Test03();

	// --
}

// �{�ԗp���C��
function* <generatorForTask> @@_Main2()
{
	yield* TitleMain();
}
