/*
	���ʋ@�\�E�֗��@�\�͂ł��邾�����̃t�@�C���ɏW�񂷂�B
*/

/*
	ret: value ���l�̌ܓ�����������Ԃ��B
*/
function ToInt(value)
{
	return Math.round(value);
}

/*
	value �� minval, maxval �͈̔͂ɋ�������B
*/
function ToRange(value, minval, maxval)
{
	return Math.min(Math.max(value, minval), maxval);
}

/*
	ret: 0 �` (modulo - 1) �̐����������_���ɕԂ��B
*/
function GetRand(modulo)
{
	return Math.floor(Math.random() * modulo);
}
