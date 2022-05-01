/*
	�z��
*/

/*
	�z��ɗv�f��}������B

	arr: �z��
	index: �ʒu
	element: �v�f
*/
function InsertElement(arr, index, element)
{
	if (index < 0 || arr.length < index)
	{
		error;
	}
	arr.push(-1);

	for (var i = arr.length - 1; index < i; i--)
	{
		arr[i] = arr[i - 1];
	}
	arr[index] = element;
}

/*
	�z��ɗv�f��ǉ�����B

	arr: �z��
	element: �v�f
*/
function AddElement(arr, element)
{
	InsertElement(arr, arr.length, element);
}

/*
	�z�񂩂�v�f�����o���B

	arr: �z��
	index: �ʒu

	ret: �v�f
*/
function DesertElement(arr, index)
{
	if (index < 0 || arr.length <= index)
	{
		error;
	}
	var ret = arr[index];

	for (var i = index; i < arr.length - 1; i++)
	{
		arr[i] = arr[i + 1];
	}
	arr.pop();
	return ret;
}

/*
	�z�񂩂�v�f�����o���B

	arr: �z��
	index: �ʒu

	ret: �v�f
*/
function FastDesertElement(arr, index)
{
	if (index < 0 || arr.length <= index)
	{
		error;
	}
	var ret = arr[index];
	arr[index] = arr[arr.length - 1];
	arr.pop();
	return ret;
}

/*
	�z�񂩂�Ō�̗v�f�����o���B

	arr: �z��

	ret: �v�f
*/
function UnaddElement(arr)
{
	return DesertElement(arr, arr.length - 1);
}

/*
	�z��̗v�f�����ւ���B

	arr: �z��
	index_A: ����ւ��ʒu(1)
	index_B: ����ւ��ʒu(2)
*/
function SwapElement(arr, index_A, index_B)
{
	var tmp = arr[index_A];
	arr[index_A] = arr[index_B];
	arr[index_B] = tmp;
}

/*
	�V���b�t������B

	arr: �z��
*/
function Shuffle(arr)
{
	for (var i = arr.length - 1; 2 <= i; i--)
	{
		SwapElement(arr, GetRand(i), i);
	}
}

/*
	�����z���Ԃ��B

	arr: �z��
	offset: �J�n�ʒu
	count: ����

	ret: �����z��
*/
function GetSubArray(arr, offset, count)
{
	if (offset < 0 || arr.length < offset)
	{
		error;
	}
	if (count < 0 || arr.length - offset < count)
	{
		error;
	}
	var dest = [];

	for (var index = 0; index < count; index++)
	{
		dest.push(arr[offset + index]);
	}
	return dest;
}

/*
	�����z��(�J�n�ʒu�ȍ~)��Ԃ��B

	arr: �z��
	offset: �J�n�ʒu

	ret: �����z��
*/
function GetTrailArray(arr, offset)
{
	return GetSubArray(arr, offset, arr.length - offset);
}

/*
	�z��𕡐�����B

	arr: �z��

	ret: �z��̕���
*/
function CloneArray(arr)
{
	return GetSubArray(arr, 0, arr.length);
}

/*
	�}�b�`����v�f���폜����B

	arr: �z��
	match: ���胁�\�b�h
*/
function RemoveAll(arr, match)
{
	var w = 0;

	for (var r = 0; r < arr.length; r++)
	{
		// �}�b�`���Ȃ���Δz��Ɏc���̂ŁAw �̎w���ʒu�֏������ށB
		if (!match(arr[r]))
		{
			arr[w] = arr[r];
			w++;
		}
	}
	while (w < arr.length)
	{
		arr.pop();
	}
}

/*
	�U�ƂȂ�v�f(false, null, undefined, 0, �󕶎���)����������B

	arr: �z��
*/
function RemoveFalse(arr)
{
	RemoveAll(arr, function(token)
	{
		return !token;
	});
}
