/*
	�`��
*/

// �X�N���[���̃N���A
function ClearScreen()
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
function Draw(image, x, y, a, r, z)
{
	var w = image.naturalWidth;
	var h = image.naturalHeight;

	w *= z;
	h *= z;

	var l = x - w / 2;
	var t = y - h / 2;

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
