/*
	�Q�[���p���C�����W���[��
*/

// *_INIT �C�x���g�̃��X�g
var<Action[]> @@_INIT_Events = [ @(INIT) ];

// *_EACH �C�x���g�̃��X�g
var<Action[]> @@_EACH_Events = [ @(EACH) ];

// �A�v���P�[�V�������̏���
// �W�F�l���[�^�֐��ł��邱�ƁB
var<generatorForTask> @@_AppMain;

// �`���Canvas�^�O
var<Tag_Canvas> Canvas;

// Canvas�����Ă���Div�^�O
var<Tag_Div> CanvasBox;

// �Q�[���p���C��
// appMain: �A�v���P�[�V�������̏���
// -- �W�F�l���[�^�֐��ł��邱�ƁB
function <void> ProcMain(<generatorForTask> appMain)
{
	@@_AppMain = appMain;

	Canvas = document.createElement("canvas");
	Canvas.width  = Screen_W;
	Canvas.height = Screen_H;

	CanvasBox = document.getElementById("Gattonero20200001-CanvasBox");
	CanvasBox.style.width  = Screen_W;
	CanvasBox.style.height = Screen_H;
	CanvasBox.innerHTML = "";
	CanvasBox.appendChild(Canvas);

	for (var<Action> event of @@_INIT_Events)
	{
		LOGPOS();
		event();
		LOGPOS();
	}

	@@_Anime();
}

function <void> @@_Resized()
{
	var sw = window.innerWidth;
	var sh = window.innerHeight;

	var w = sw;
	var h = ToInt((Screen_H * sw) / Screen_W);

	if (sh < h)
	{
		h = sh;
		w = ToInt((Screen_W * sh) / Screen_H);
	}
	var<int> l = ToInt((sw - w) / 2);
	var<int> t = ToInt((sh - h) / 2);

	Canvas.style.left   = l + "px";
	Canvas.style.top    = t + "px";
	Canvas.style.width  = w + "px";
	Canvas.style.height = h + "px";

	CanvasBox.style.left   = l + "px";
	CanvasBox.style.top    = t + "px";
	CanvasBox.style.width  = w + "px";
	CanvasBox.style.height = h + "px";
}

// ���t���b�V�����[�g���߂����m�p����
var<int> @@_HzChaserTime = 0;

// �v���Z�X�t���[���J�E���^
var<int> ProcFrame = 0;

// �`���R���e�L�X�g(�`���X�N���[��)
var<Context2d> Context = null;

function <void> @@_Anime()
{
	var<int> currTime = new Date().getTime();

	@@_HzChaserTime = Math.max(@@_HzChaserTime, currTime - 100);
	@@_HzChaserTime = Math.min(@@_HzChaserTime, currTime + 100);

	if (@@_HzChaserTime < currTime)
	{
		Context = Canvas.getContext("2d");
		@@_AppMain.next();

		for (var<Action> event of @@_EACH_Events)
		{
			event();
		}

		Context = null;
		@@_HzChaserTime += 16;
		ProcFrame++;
	}
	requestAnimationFrame(@@_Anime);
}