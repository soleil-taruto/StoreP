/*
	�摜
*/

function @@_Load(url)
{
	LOGPOS;
	Loading++;

	var image = new Image();

	image.src = url;
	image.onload = function()
	{
		LOGPOS;
		Loading--;
	};

	image.onerror = function()
	{
		error;
	};

	return image;
}

// ��������e��摜

// �v���t�B�N�X
// P_ ... �摜

var P_Dummy = @@_Load(Resources.General__Dummy_png); // ���T���v���Ƃ��ăL�[�v

// �w�i�� [ ����, �[��, ��(�_��), ��(����) ] �̏��ł���B

var P_�w�i_���� =
[
	@@_Load(Resources.�����___house_enterance_interior_a_jpg),
	@@_Load(Resources.�����___house_enterance_interior_b_jpg),
	@@_Load(Resources.�����___house_enterance_interior_c_jpg),
	@@_Load(Resources.�����___house_enterance_interior_d_jpg),
];
var P_�w�i_���� =
[
	@@_Load(Resources.�����___house_room_weekly_apartment_a_jpg),
	@@_Load(Resources.�����___house_room_weekly_apartment_b_jpg),
	@@_Load(Resources.�����___house_room_weekly_apartment_c_jpg),
	@@_Load(Resources.�����___house_room_weekly_apartment_d_jpg),
];
var P_�w�i_����g�C�� =
[
	@@_Load(Resources.�����___house_toilet_a_jpg),
	@@_Load(Resources.�����___house_toilet_b_jpg),
	@@_Load(Resources.�����___house_toilet_c_jpg),
	@@_Load(Resources.�����___house_toilet_d_jpg),
];
var P_�w�i_�w�Z�L�� =
[
	@@_Load(Resources.�����___school_corridor_a_jpg),
	@@_Load(Resources.�����___school_corridor_b_jpg),
	@@_Load(Resources.�����___school_corridor_c_jpg),
	@@_Load(Resources.�����___school_corridor_d_jpg),
];

var @@_�X�ߎ�A_�_�� = @@_Load(Resources.�����___school_dressing_room_a_jpg); // �x���`�L��_�_��
var @@_�X�ߎ�A_���� = @@_Load(Resources.�����___school_dressing_room_b_jpg); // �x���`�L��_����
var @@_�X�ߎ�B_�_�� = @@_Load(Resources.�����___school_dressing_room_c_jpg); // �x���`����_�_��
var @@_�X�ߎ�B_���� = @@_Load(Resources.�����___school_dressing_room_d_jpg); // �x���`����_����

var P_�w�i_�X�ߎ�A = // �x���`�L��
[
	@@_�X�ߎ�A_�_��,
	@@_�X�ߎ�A_�_��,
	@@_�X�ߎ�A_�_��,
	@@_�X�ߎ�A_����,
];
var P_�w�i_�X�ߎ�B = // �x���`����
[
	@@_�X�ߎ�B_�_��,
	@@_�X�ߎ�B_�_��,
	@@_�X�ߎ�B_�_��,
	@@_�X�ߎ�B_����,
];
var P_�w�i_�Z�� =
[
	@@_Load(Resources.�����___school_gate_a_jpg),
	@@_Load(Resources.�����___school_gate_b_jpg),
	@@_Load(Resources.�����___school_gate_c_jpg),
	@@_Load(Resources.�����___school_gate_d_jpg),
];
var P_�w�i_�̈�� =
[
	@@_Load(Resources.�����___school_gym_a_jpg),
	@@_Load(Resources.�����___school_gym_b_jpg),
	@@_Load(Resources.�����___school_gym_c_jpg),
	@@_Load(Resources.�����___school_gym_d_jpg),
];
var P_�w�i_���� =
[
	@@_Load(Resources.�����___town_park_a_jpg),
	@@_Load(Resources.�����___town_park_b_jpg),
	@@_Load(Resources.�����___town_park_c_jpg),
	@@_Load(Resources.�����___town_park_d_jpg),
];
