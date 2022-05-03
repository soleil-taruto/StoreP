/*
	�Q�[���p���C�����W���[��
*/

// ��ʂ̕�
var<int> Screen_W = 960;

// ��ʂ̍���
var<int> Screen_H = 540;

// �A�v���P�[�V�������̏���
// �W�F�l���[�^�ł��邱�ƁB
var<generator> @@_AppMain;

// *_INIT �C�x���g�̃��X�g
var<FUNC[]> @@_INIT_Events = [ @(INIT) ];

// *_EACH �C�x���g�̃��X�g
var<FUNC[]> @@_EACH_Events = [ @(EACH) ];

// �`���Canvas�^�O
var Canvas;

// Canvas�����Ă���Div�^�O
var CanvasBox;

// �Q�[���p���C��
// appMain: �A�v���P�[�V�������̏���
// -- �W�F�l���[�^�ł��邱�ƁB
function <void> ProcMain(<generator> appMain)
{
	@@_AppMain = appMain;

	Canvas = document.createElement("canvas");
	Canvas.style.position = "fixed";
	Canvas.width  = Screen_W;
	Canvas.height = Screen_H;

	CanvasBox = document.createElement("div");
	CanvasBox.style.position = "fixed";
	CanvasBox.appendChild(Canvas);
	document.body.appendChild(CanvasBox);

	AddResized(@@_Resized);
	@@_Resized();

	for (var event of @@_INIT_Events)
	{
		LOGPOS;
		event();
		LOGPOS;
	}

	@@_Anime();
}

function <void> @@_Resized()
{
	var<int> sw = window.innerWidth;
	var<int> sh = window.innerHeight;

	var<int> w = sw;
	var<int> h = Math.round((Screen_H * sw) / Screen_W);

	if (sh < h)
	{
		h = sh;
		w = Math.round((Screen_W * sh) / Screen_H);
	}
	var<int> l = Math.round((sw - w) / 2);
	var<int> t = Math.round((sh - h) / 2);

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
var Context = null;

function <void> @@_Anime()
{
	var<int> currTime = new Date().getTime();

	@@_HzChaserTime = ToRange(
		@@_HzChaserTime,
		currTime - 100,
		currTime + 100
		);

	if (@@_HzChaserTime < currTime)
	{
		Context = Canvas.getContext("2d");
		@@_AppMain.next();

		for (var event of @@_EACH_Events)
		{
			event();
		}

		Context = null;
		@@_HzChaserTime += 16;
		ProcFrame++;
	}
	requestAnimationFrame(@@_Anime);
}
