/*
	������
*/

/*
	������𕪊�����B

	str: ������
	separator: �Z�p���[�^
	ignoreEmpty: ��̃g�[�N���𖳎����邩
	limit: �g�[�N������ limit �𒴂��Ȃ��悤�ɂ���B0 == ����
*/
public string[] Tokenize(string str, string separator, boolean ignoreEmpty, int limit)
{
	if (separator == "")
	{
		error();
	}
	string[] dest = [];

	while (dest.length + 1 != limit)
	{
		int index = str.indexOf(separator);

		if (index == -1)
		{
			break;
		}
		dest.push(str.substring(0, index));
		str = str.substring(index + separator.length);
	}
	dest.push(str);
	return dest;
}
