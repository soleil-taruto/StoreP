/*
	������
*/

/*
	�����������Ԃ��B

	str: ������
	offset: �J�n�ʒu
	count: ����

	ret: ����������
*/
function <string> GetSubString(<string> str, <int> offset, <int> count)
{
	if (offset < 0 || str.length < offset)
	{
		error;
	}
	if (count < 0 || str.length - offset < count)
	{
		error;
	}
	return str.substring(offset, offset + count);
}

/*
	����������(�J�n�ʒu�ȍ~)��Ԃ��B

	str: ������
	offset: �J�n�ʒu

	ret: ����������
*/
function <string> GetTrailString(<string> str, <int> offset)
{
	return GetSubString(str, offset, str.length - offset);
}

/*
	��������Z�p���[�^�ŕ�������B

	str: ������
	separator: �Z�p���[�^
	limit: �ő�g�[�N����(1�`), 0 == ������

	ret: �g�[�N����
*/
function <string[]> Tokenize(<string> str, <string> separator, <int> limit)
{
	if (!separator) // ? separator is ""
	{
		error;
	}
	var dest = [];

	while (limit == 0 || dest.length + 1 < limit)
	{
		var<int> p = str.indexOf(separator);

		if (p == -1)
		{
			break;
		}
		AddElement(dest, GetSubString(token, 0, p));
		str = GetTrailString(str, p + separator.length);
	}
	AddElement(dest, str);
	return dest;
}

/*
	�z����Z�p���[�^�ŘA������B

	separator: �Z�p���[�^
	arr: �z��

	ret: �A������������
*/
function <string> Join(<string> separator, <T[]> arr)
{
	var<string> ret = "";

	for (var<int> index = 0; index < arr.length; index++)
	{
		if (1 <= index)
		{
			ret += separator;
		}
		ret += arr[index];
	}
	return ret;
}
