/*
	�萔
*/

/*
	�}�b�v�T�C�Y (�c�E���}�b�v�Z����)

	�ȉ��̂Ƃ���ɂȂ�悤�ɂ���I
	-- Screen_W == MAP_W_MIN * TILE_W
	-- Screen_H == MAP_H_MIN * TILE_H
*/
var<int> MAP_W_MIN = 25;
var<int> MAP_H_MIN = 19;

/*
	�}�b�v�Z���E�T�C�Y (�h�b�g�P�ʁE��ʏ�̃T�C�Y)
*/
var<int> TILE_W = 32;
var<int> TILE_H = 32;

// ----
// �v���C���[��񂱂�����
// ----

var<int> PLAYER_HP_MAX = 10;

var<int> PLAYER_DAMAGE_FRAME_MAX = 40;
var<int> PLAYER_INVINCIBLE_FRAME_MAX = 60;

/*
	�W�����v�񐔂̏��
	1 == �ʏ�
	2 == 2-�i�W�����v�܂ŉ\
	3 == 3-�i�W�����v�܂ŉ\
	...
*/
var<int> PLAYER_JUMP_MAX = 1;

/*
	�v���C���[�L�����N�^�̏d�͉����x
*/
var<double> PLAYER_GRAVITY = 0.6;

/*
	�v���C���[�L�����N�^�̗����ō����x
*/
var<double> PLAYER_FALL_SPEED_MAX = 10.0;

/*
	�v���C���[�L�����N�^��(���ړ�)���x
*/
var<double> PLAYER_SPEED = 4.0;

/*
	�v���C���[�L�����N�^�̒ᑬ�ړ�����(���ړ�)���x
*/
var<double> PLAYER_SLOW_SPEED = 2.0;

/*
	�v���C���[�L�����N�^�̃W�����v�ɂ��㏸���x
*/
var<double> PLAYER_JUMP_SPEED = -13.0;

// �؋󒆂ɕǂɓːi���Ă��A�]�V����E�ڒn����Ɉ����|����Ȃ��悤�ɑ��ʔ�����ɍs���B
// -- ( �]�V����Pt_X < ���ʔ���Pt_X && �ڒn����Pt_X < ���ʔ���Pt_X ) ���ێ����邱�ƁB
// �㏸����������ƁA�]�V�������ɑ��ʔ���Ɉ����|�����Ă��܂��\��������B
// -- ( -(PLAYER_JUMP_SPEED) < �]�V����Pt_Y - ���ʔ���Pt_YT ) ���ێ����邱�ƁB
// ���~����������ƁA�ڒn�������ɑ��ʔ���Ɉ����|�����Ă��܂��\��������B
// -- ( PLAYER_FALL_SPEED_MAX < �ڒn����Pt_Y - ���ʔ���Pt_YB ) ���ێ����邱�ƁB

var<double> PLAYER_���ʔ���Pt_X = 16.0 / 2;
var<double> PLAYER_���ʔ���Pt_YT = 20.0 / 2;
var<double> PLAYER_���ʔ���Pt_YB = 20.0 / 2;
var<double> PLAYER_�]�V����Pt_X = 14.0 / 2;
var<double> PLAYER_�]�V����Pt_Y = 40.0 / 2;
var<double> PLAYER_�ڒn����Pt_X = 14.0 / 2;
var<double> PLAYER_�ڒn����Pt_Y = 48.0 / 2;

// �L�����摜�I�ɊR���Ղ��M���M���܂ōs����悤�ɂ���B
//
// �R���Ղ��M���M���܂ōs����悤�ɁA���������L���Ă��ǂ���������Ȃ��B-> 46.0 / 2
// ��������ƂP�}�X�̌��ɗ������Ȃ��Ȃ�̂őË��_�Ƃ��Ă��̕��Ƃ���B-> 30.0 / 2
//
var<double> PLAYER_�ڒn����Pt_X_�ڒn���̂� = 30.0 / 2;

// ��q�̈�ԏ�̃}�b�v�Z���̏㕔�̗̈�̂ݐڒn����A���Ƃ���B
// ���̗̈�̍����B
//
// ��q��o�肫�����Ƃ���q�̏�ɗ����Ă����悤�ɁA
// �����ō����x�ŗ������ɂ��蔲���Ȃ��悤�ɁA
// �����ō����x���傫�����ƁB
//
var<int> LADDER_TOP_GROUND_Y_SIZE = PLAYER_FALL_SPEED_MAX + 2;

var<int> PLAYER_SHOOTING_FRAME_MAX = 15;

// ----
// �v���C���[��񂱂��܂�
// ----

/// GameEndReason_e
//
var<int> GameEndReason_e_STAGE_CLEAR = @(AUTO);
var<int> GameEndReason_e_RETURN_MENU = @(AUTO);
