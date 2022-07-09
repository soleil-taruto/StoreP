/*
	�萔
*/

/*
	�t�B�[���h�̈�
*/
var<int> FIELD_L = 0;
var<int> FIELD_T = 100;
var<int> FIELD_W = Screen_W - 0;
var<int> FIELD_H = Screen_H - 200;
var<int> FIELD_R = FIELD_L + FIELD_W;
var<int> FIELD_B = FIELD_T + FIELD_H;

/*
	�}�b�v�E�T�C�Y (�e�[�u���T�C�Y)
*/
var<int> MAP_W = 20;
var<int> MAP_H = 15;

/*
	�}�b�v�Z���E�T�C�Y (�h�b�g�P�ʁE��ʏ�̃T�C�Y)
*/
var<int> TILE_W = 40;
var<int> TILE_H = 40;

// ----
// �v���C���[��񂱂�����
// ----

/*
	�v���C���[�L�����N�^�̏d�͉����x
*/
var<double> PLAYER_GRAVITY = 1.0;

/*
	�v���C���[�L�����N�^�̗����ō����x
*/
var<double> PLAYER_FALL_SPEED_MAX = 8.0;

/*
	�v���C���[�L�����N�^��(���ړ�)���x
*/
var<double> PLAYER_SPEED = 6.0;

/*
	�v���C���[�L�����N�^�̒ᑬ�ړ�����(���ړ�)���x
*/
var<double> PLAYER_SLOW_SPEED = 2.0;

/*
	�v���C���[�L�����N�^�̃W�����v�ɂ��㏸���x
*/
var<double> PLAYER_�W�����v�ɂ��㏸���x = -8.0;

// �㏸����������ƁA�]�V�������ɑ��ʔ���Ɉ����|�����Ă��܂��\��������B
// -- ( -(PLAYER_�W�����v�ɂ��㏸���x) < �]�V����Pt_Y - ���ʔ���Pt_Y ) ���ێ����邱�ƁB
// ---- ���E�����ڐG���̍Ĕ���ɂ�肱�̐���͊ɘa�����B
// ���~����������ƁA�ڒn�������ɑ��ʔ���Ɉ����|�����Ă��܂��\��������B
// -- ( PLAYER_FALL_SPEED_MAX < �ڒn����Pt_Y - ���ʔ���Pt_Y ) ���ێ����邱�ƁB

var<double> PLAYER_���ʔ���Pt_X = TILE_W / 2.0;
var<double> PLAYER_���ʔ���Pt_Y = 0.0;
var<double> PLAYER_�]�V����Pt_X = TILE_W / 2.0;
var<double> PLAYER_�]�V����Pt_Y = TILE_H / 2.0;
var<double> PLAYER_�ڒn����Pt_X = TILE_W / 2.0;
var<double> PLAYER_�ڒn����Pt_Y = TILE_H / 2.0;

// ----
// �v���C���[��񂱂��܂�
// ----
