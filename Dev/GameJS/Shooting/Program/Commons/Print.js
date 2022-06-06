/*
	�}�`�E������`��
*/

/*
	�F���Z�b�g����B
	color: ex. "#ff0000", "red"
		�A���t�@�l���� -> "#ff000080"
*/
function SetColor(color)
{
	Context.fillStyle = color;
}

/*
	��`��`�悷��B
	(l, t, w, h): ���� X-���W, �㑤 Y-���W, ��, ����
*/
function PrintRect(l, t, w, h)
{
	Context.fillRect(l, t, w, h);
}

/*
	��`��`�悷��B
	(x, y, w, h): ���S X-���W, ���S Y-���W, ��, ����
*/
function PrintRectCenter(x, y, w, h)
{
	Context.fillRect(x - w / 2, y - h / 2, w, h);
}

/*
	�~��`�悷��B
	(x, y, r): ���S X-���W, ���S Y-���W, ���a
*/
function PrintCircle(x, y, r)
{
	Context.fillCircle(x, y, r, 0, Math.PI * 2.0, false);
}

/*
	�t�H���g���Z�b�g����B
	font: ex. "16px '���C���I'"
*/
function SetFont(font)
{
	Context.font = font;
}

var @@_X = 0;
var @@_Y = 0;
var @@_YStep = 50;

/*
	������`��ʒu���Z�b�g����B
	x: ������̍��� X-���W
	y: ������̉��� Y-���W
	yStep: ���s�X�e�b�v Y-��
*/
function SetPrint(x, y, yStep)
{
	@@_X = x;
	@@_Y = y;
	@@_YStep = yStep;
}

/*
	�������`�悷��B
	line: ������
*/
function PrintLine(line)
{
	Context.fillText(line, @@_X, @@_Y);
	@@_Y += @@_YStep;
}
