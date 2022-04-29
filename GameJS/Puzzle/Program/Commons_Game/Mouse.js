/*
	�}�E�X�E��ʃ^�b�`����
*/

var @@_Down = false;
var @@_X = 0;
var @@_Y = 0;

function @@_ScreenPosToCanvasPos()
{
	var canvasRect = Canvas.getBoundingClientRect();

	@@_X -= canvasRect.left;
	@@_Y -= canvasRect.top;
	@@_X *= Screen_W / canvasRect.width;
	@@_Y *= Screen_H / canvasRect.height;
}

function @@_TouchStart(x, y)
{
	@@_Down = true;
	@@_X = x;
	@@_Y = y;

	@@_ScreenPosToCanvasPos();
}

function @@_TouchMove(x, y)
{
	@@_X = x;
	@@_Y = y;

	@@_ScreenPosToCanvasPos();
}

function @@_TouchEnd(x, y)
{
	@@_Down = false;
	@@_X = x;
	@@_Y = y;

	@@_ScreenPosToCanvasPos();
}

function @@_GetEvTouch(touch)
{
	var ret = function(event)
	{
		touch(event.changedTouches[0].pageX, event.changedTouches[0].pageY);
	};

	return ret;
}

function @@_GetEvMouse(touch)
{
	var ret = function(event)
	{
		touch(event.x, event.y);
	};

	return ret;
}

function @@_INIT()
{
	if (window.ontouchstart === null)
	{
		CanvasBox.ontouchstart = @@_GetEvTouch(@@_TouchStart);
		CanvasBox.ontouchmove  = @@_GetEvTouch(@@_TouchMove);
		CanvasBox.ontouchend   = @@_GetEvTouch(@@_TouchEnd);
	}
	else
	{
		CanvasBox.onmousedown  = @@_GetEvMouse(@@_TouchStart);
		CanvasBox.onmousemove  = @@_GetEvMouse(@@_TouchMove);
		CanvasBox.onmouseup    = @@_GetEvMouse(@@_TouchEnd);
		CanvasBox.onmouseleave = @@_GetEvMouse(@@_TouchEnd);
	}
}

var @@_DownCount;

function @@_EACH()
{
	if (1 <= @@_DownCount) // ? �O��_����
	{
		if (@@_Down)
		{
			@@_DownCount++;
		}
		else
		{
			@@_DownCount = -1;
		}
	}
	else // ? �O��_�������Ă��Ȃ��B
	{
		if (@@_Down)
		{
			@@_DownCount = 1;
		}
		else
		{
			@@_DownCount = 0;
		}
	}
}

/*
	�}�E�X�{�^���̉���(�X�N���[���E�^�b�`)��Ԃ𓾂�B
	�߂�l�F
		-1  == �������B(�O��͉���, ����͉������Ă��Ȃ�)
		0   == �����Ă��Ȃ��B(�O���������������Ă��Ȃ�)
		1   == �������B(�O��͉������Ă��Ȃ�, ����͉���)
		2�` == �����Ă���B�l�͉����������Ă��钷��(�t���[����)
*/
function GetMouseDown()
{
	return @@_DownCount;
}

/*
	�}�E�X�{�^���̉���(�X�N���[���E�^�b�`)��Ԃ��N���A����B
*/
function ClearMouseDown()
{
	@@_DownCount = 0;
}

/*
	�}�E�X�J�[�\���̈ʒu��Ԃ��BX-���W
*/
function GetMouseX()
{
	return @@_X;
}

/*
	�}�E�X�J�[�\���̈ʒu��Ԃ��BY-���W
*/
function GetMouseY()
{
	return @@_Y;
}
