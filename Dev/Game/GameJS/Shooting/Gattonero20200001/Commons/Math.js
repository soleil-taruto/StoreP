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
	ret: value �̏�������؂�̂Ă�������Ԃ��B
		�܂�[�������ōŊ��̐�����Ԃ��B
		��F
			2.4 -> 2
			-3.7 -> 3
*/
function <int> ToFix(<double> value)
{
	return Math.trunc(value);
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
function <int> GetRand(<int> modulo)
{
	return Math.floor(Math.random() * modulo);
}

/*
	0.0 �` 1.0 �̗�����Ԃ��B
*/
function <double> GetRand1()
{
	return GetRand(IMAX + 1) / IMAX;
}

/*
	-1.0 �` 1.0 �̗�����Ԃ��B
*/
function <double> GetRand2()
{
	return GetRand1() * 2.0 - 1.0;
}
