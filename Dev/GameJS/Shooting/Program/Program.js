/*
	�A�v���P�[�V�����p���C�����W���[��
*/

var APP_IDENT = "{c496ce16-4117-4315-8d03-282dc4842266}";

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
		SetFSize(16);
		SetPrint(10, 25, 0);
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
