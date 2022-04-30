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
function GetSubString(str, offset, count)
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
function GetTrailString(str, offset)
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
function Tokenize(str, separator, limit)
{
	if (separator == "")
	{
		error;
	}
	var dest = [];

	while (limit == 0 || dest.length + 1 < limit)
	{
		var p = str.indexOf(separator);

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
function Join(separator, arr)
{
	var ret = "";

	for (var index = 0; index < arr.length; index++)
	{
		if (1 <= index)
		{
			ret += separator;
		}
		ret += arr[index];
	}
	return ret;
}
