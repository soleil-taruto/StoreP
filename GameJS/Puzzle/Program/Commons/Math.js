/*
	���w�n
*/

/*
	ret: value ���l�̌ܓ�����������Ԃ��B
*/
function ToInt(value)
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
function ToFix(value)
{
	return Math.trunc(value);
}

/*
	value �� minval, maxval �͈̔͂ɋ�������B
*/
function ToRange(value, minval, maxval)
{
	return Math.min(Math.max(value, minval), maxval);
}

/*
	modulo: 1�ȏ�̐���

	ret: 0 �` (modulo - 1) �̐����������_���ɕԂ��B
*/
function GetRand(modulo)
{
	return ToFix(Math.random() * modulo);
}
