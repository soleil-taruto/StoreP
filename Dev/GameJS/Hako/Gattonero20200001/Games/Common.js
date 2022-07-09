/*
	����
*/

function <I2Point_t> ToTablePoint_XY(<double> x, <double> y)
{
	return ToTablePoint(CreateD2Point(x, y));
}

/*
	�t�B�[���h��̍��W(�h�b�g�P��)����e�[�u���ʒu(�e�[�u���E�C���f�b�N�X)���擾����B
*/
function <I2Point_t> ToTablePoint(<D2Point_t> pt)
{
	var<int> ix = ToFloor(pt.X / TILE_W);
	var<int> iy = ToFloor(pt.Y / TILE_H);

	var ret = CreateI2Point(ix, iy);

	return ret;
}
