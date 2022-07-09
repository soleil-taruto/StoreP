/*
	�`��
*/

// �X�N���[���̃N���A
function <void> ClearScreen()
{
	Context.clearRect(0, 0, Screen_W, Screen_H);
}

// �`��ʒu���_
// -- Print.js �ɂ���p����B
//
var<double> Draw_L = 0.0;
var<double> Draw_T = 0.0;

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
	x += Draw_L;
	y += Draw_T;

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

	Context.drawImage(image, l, t, w, h);

	// restore
	Context.translate(x, y);
	Context.rotate(-r);
	Context.translate(-x, -y);
	Context.globalAlpha = 1.0;
}
