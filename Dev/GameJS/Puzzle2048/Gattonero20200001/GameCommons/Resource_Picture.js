/*
	�摜
*/

function <Picture_t> @@_Load(<string> url)
{
	return LoadPicture(url);
}

// ��������e��摜

// �v���t�B�N�X
// P_ ... �摜

var<Picture_t> P_Dummy = @@_Load(RESOURCE_General__Dummy_png);
var<Picture_t> P_WhiteBox = @@_Load(RESOURCE_General__WhiteBox_png);
var<Picture_t> P_WhiteCircle = @@_Load(RESOURCE_General__WhiteCircle_png);

// �������܂ŌŒ� -- �������_���� -- �T���v���Ƃ��ăL�[�v

var<Picture_t[]> P_�����p�l�� =
[
	@@_Load(RESOURCE_�����p�l��__n1_png),
	@@_Load(RESOURCE_�����p�l��__n2_png),
	@@_Load(RESOURCE_�����p�l��__n4_png),
	@@_Load(RESOURCE_�����p�l��__n8_png),
	@@_Load(RESOURCE_�����p�l��__n16_png),
	@@_Load(RESOURCE_�����p�l��__n32_png),
	@@_Load(RESOURCE_�����p�l��__n64_png),
	@@_Load(RESOURCE_�����p�l��__n128_png),
	@@_Load(RESOURCE_�����p�l��__n256_png),
	@@_Load(RESOURCE_�����p�l��__n512_png),
	@@_Load(RESOURCE_�����p�l��__n1024_png),
	@@_Load(RESOURCE_�����p�l��__n2048_png),
	@@_Load(RESOURCE_�����p�l��__n4096_png),
	@@_Load(RESOURCE_�����p�l��__n8192_png),
	@@_Load(RESOURCE_�����p�l��__n16384_png),
	@@_Load(RESOURCE_�����p�l��__n32768_png),
	@@_Load(RESOURCE_�����p�l��__n65536_png),
	@@_Load(RESOURCE_�����p�l��__n131072_png),
	@@_Load(RESOURCE_�����p�l��__n262144_png),
	@@_Load(RESOURCE_�����p�l��__n524288_png),
	@@_Load(RESOURCE_�����p�l��__n1048576_png),
	@@_Load(RESOURCE_�����p�l��__n2097152_png),
	@@_Load(RESOURCE_�����p�l��__n4194304_png),
	@@_Load(RESOURCE_�����p�l��__n8388608_png),
	@@_Load(RESOURCE_�����p�l��__n16777216_png),
	@@_Load(RESOURCE_�����p�l��__n33554432_png),
	@@_Load(RESOURCE_�����p�l��__n67108864_png),
	@@_Load(RESOURCE_�����p�l��__n134217728_png),
	@@_Load(RESOURCE_�����p�l��__n268435456_png),
	@@_Load(RESOURCE_�����p�l��__n536870912_png),
	@@_Load(RESOURCE_�����p�l��__n1073741824_png),
	@@_Load(RESOURCE_�����p�l��__n2147483648_png),
	@@_Load(RESOURCE_�����p�l��__n4294967296_png),
	@@_Load(RESOURCE_�����p�l��ex__n2p33_png),
	@@_Load(RESOURCE_�����p�l��ex__n2p34_png),
	@@_Load(RESOURCE_�����p�l��ex__n2p35_png),
	@@_Load(RESOURCE_�����p�l��ex__n2p36_png),
	@@_Load(RESOURCE_�����p�l��ex__n2p37_png),
	@@_Load(RESOURCE_�����p�l��ex__n2p38_png),
	@@_Load(RESOURCE_�����p�l��ex__n2p39_png),
	@@_Load(RESOURCE_�����p�l��ex__n2p40_png),
	@@_Load(RESOURCE_�����p�l��ex__n2p41_png),
	@@_Load(RESOURCE_�����p�l��ex__n2p42_png),
	@@_Load(RESOURCE_�����p�l��ex__n2p43_png),
	@@_Load(RESOURCE_�����p�l��ex__n2p44_png),
	@@_Load(RESOURCE_�����p�l��ex__n2p45_png),
	@@_Load(RESOURCE_�����p�l��ex__n2p46_png),
	@@_Load(RESOURCE_�����p�l��ex__n2p47_png),
	@@_Load(RESOURCE_�����p�l��ex__n2p48_png),
	@@_Load(RESOURCE_�����p�l��ex__n2p49_png),
	@@_Load(RESOURCE_�����p�l��ex__n2p50_png),
	@@_Load(RESOURCE_�����p�l��ex__n2p51_png),
	@@_Load(RESOURCE_�����p�l��ex__n2p52_png),
	@@_Load(RESOURCE_�����p�l��ex__n2p53_png),
	@@_Load(RESOURCE_�����p�l��ex__n2p54_png),
	@@_Load(RESOURCE_�����p�l��ex__n2p55_png),
	@@_Load(RESOURCE_�����p�l��ex__n2p56_png),
	@@_Load(RESOURCE_�����p�l��ex__n2p57_png),
	@@_Load(RESOURCE_�����p�l��ex__n2p58_png),
	@@_Load(RESOURCE_�����p�l��ex__n2p59_png),
	@@_Load(RESOURCE_�����p�l��ex__n2p60_png),
	@@_Load(RESOURCE_�����p�l��ex__n2p61_png),
	@@_Load(RESOURCE_�����p�l��ex__n2p62_png),
	@@_Load(RESOURCE_�����p�l��ex__n2p63_png),
	@@_Load(RESOURCE_�����p�l��ex__n2p64_png),
];

var<Picture_t> P_Gravity = @@_Load(RESOURCE_Picture__Gravity_png);

var<Picture_t> P_Star_S = @@_Load(RESOURCE_Picture__���鐯20_png);

var<Picture_t> P_Button_W_Up     = @@_Load(RESOURCE_Button__W_Up_png);
var<Picture_t> P_Button_W_Down   = @@_Load(RESOURCE_Button__W_Down_png);
var<Picture_t> P_Button_H_Up     = @@_Load(RESOURCE_Button__H_Up_png);
var<Picture_t> P_Button_H_Down   = @@_Load(RESOURCE_Button__H_Down_png);
var<Picture_t> P_Button_NP_Up    = @@_Load(RESOURCE_Button__NP_Up_png);
var<Picture_t> P_Button_NP_Down  = @@_Load(RESOURCE_Button__NP_Down_png);
var<Picture_t> P_Button_Auto_CW  = @@_Load(RESOURCE_Button__Auto_CW_png);
var<Picture_t> P_Button_Auto_CCW = @@_Load(RESOURCE_Button__Auto_CCW_png);
