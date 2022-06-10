/*
	���w�n
*/

/*
	ret: value ���l�̌ܓ�����������Ԃ��B
*/
function <int> ToInt(<double> value)
{
	return Math.round(value);
}

/*
	value �� minval, maxval �͈̔͂ɋ�������B
*/
function <Number> ToRange(<Number> value, <Number> minval, <Number> maxval)
{
	return Math.min(Math.max(value, minval), maxval);
}

/*
	ret: 0 �` (modulo - 1) �̐����������_���ɕԂ��B
*/
function <double> GetRand(<int> modulo)
{
	return Math.floor(Math.random() * modulo);
}
