/*
	�A�v���P�[�V�����p���C�����W���[��
*/

var<string> APP_IDENT = "{c9e92c41-52cf-44fe-8c46-b5139531e666}";

window.onload = function()
{
	Main();
};

function <void> Main()
{
	ProcMain(@@_Main());
}

function* <generatorForTask> @@_Main()
{
	// ���\�[�X�ǂݍ��ݒ��͑ҋ@
	while (1 <= Loading)
	{
		SetColor("#ffffff");
		PrintRect(0, 0, Screen_W, Screen_H);

		SetColor("#000000");
		SetPrint(10, 25, 50);
		SetFSize(16);
		PrintLine("���\�[�X��ǂݍ���ł��܂� ...�@�c�� " + Loading + " ��");

		yield 1;
	}

	if (DEBUG)
	{
		// -- choose one --

//		yield* Test01(); // �e�X�e�[�W���v���C
//		yield* Test02();
//		yield* Test03();
		yield* @@_Main2();

		// --
	}
	else
	{
		yield* @@_Main2();
	}
}

// �{�ԗp���C��
function* <generatorForTask> @@_Main2()
{
	yield* TitleMain();
}
