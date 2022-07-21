/*
	�`��
*/

// �X�N���[���̃N���A
function <void> ClearScreen()
{
	Context.clearRect(0, 0, Screen_W, Screen_H);
}

/*
	�`��

	x: �摜�̒��S�Ƃ��� X-���W
	y: �摜�̒��S�Ƃ��� Y-���W
	a: �s�����x (0.0 ���� �` 1.0 �s����)
	r: ��]
		0.0 == ��]����
		2*PI == ���v����1��]
		-2*PI == �����v����1��]
	z: �g�嗦
		1.0 == ���{
		2.0 == 2�{
		0.5 == 0.5�{
*/
function <void> Draw(<Image> image, <double> x, <double> y, <double> a, <double> r, <double> z)
{
	var<int> w = image.naturalWidth;
	var<int> h = image.naturalHeight;

	w *= z;
	h *= z;

	var<double> l = x - w / 2;
	var<double> t = y - h / 2;

	Context.translate(x, y);
	Context.rotate(r);
	Context.translate(-x, -y);
	Context.globalAlpha = a;

	if (@@_MirrorX || @@_MirrorY)
	{
		Context.drawImage(image, l, t, -w, h);
	}
	else
	{
	Context.drawImage(image, l, t, w, h);
	}

	// restore
	Context.translate(x, y);
	Context.rotate(-r);
	Context.translate(-x, -y);
	Context.globalAlpha = 1.0;
}

var<boolean> @@_MirrorX = false;
var<boolean> @@_MirrorY = false;

function <void> ResetDraw()
{
	@@_MirrorX = false;
	@@_MirrorY = false;
}

function <void> SetMirrorX()
{
	@@_MirrorX = true;
}

function <void> SetMirrorY()
{
	@@_MirrorY = true;
}
