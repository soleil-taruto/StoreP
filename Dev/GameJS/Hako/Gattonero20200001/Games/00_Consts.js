/*
	�萔
*/

/*
	�t�B�[���h�̈�
*/
var<int> FIELD_L = 50;
var<int> FIELD_T = 100;
var<int> FIELD_W = Screen_W - 100;
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
var<double> PLAYER_GRAVITY = 0.9;

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
var<double> PLAYER_JUMP_SPEED = -8.0;

// �؋󒆂ɕǂɓːi���Ă��A�]�V����E�ڒn����Ɉ����|����Ȃ��悤�ɑ��ʔ�����ɍs���B
// -- ( �]�V����Pt_X < ���ʔ���Pt_X && �ڒn����Pt_X < ���ʔ���Pt_X ) ���ێ����邱�ƁB
// �㏸����������ƁA�]�V�������ɑ��ʔ���Ɉ����|�����Ă��܂��\��������B
// -- ( -(PLAYER_JUMP_SPEED) < �]�V����Pt_Y - ���ʔ���Pt_YT ) ���ێ����邱�ƁB
// ���~����������ƁA�ڒn�������ɑ��ʔ���Ɉ����|�����Ă��܂��\��������B
// -- ( PLAYER_FALL_SPEED_MAX < �ڒn����Pt_Y - ���ʔ���Pt_YB ) ���ێ����邱�ƁB

var<double> PLAYER_���ʔ���Pt_X = TILE_W / 2.0;
var<double> PLAYER_���ʔ���Pt_YT = TILE_H / 4.0;
var<double> PLAYER_���ʔ���Pt_YB = TILE_H / 4.0;
var<double> PLAYER_�]�V����Pt_X = TILE_W / 2.0 - 1.0;
var<double> PLAYER_�]�V����Pt_Y = TILE_H / 2.0;
var<double> PLAYER_�ڒn����Pt_X = TILE_W / 2.0 - 3.001;
var<double> PLAYER_�ڒn����Pt_Y = TILE_H / 2.0;

// ----
// �v���C���[��񂱂��܂�
// ----

/// GameEndReason_e
//
var<int> GameEndReason_e_STAGE_CLEAR = @(AUTO);
var<int> GameEndReason_e_RETURN_MENU = @(AUTO);
