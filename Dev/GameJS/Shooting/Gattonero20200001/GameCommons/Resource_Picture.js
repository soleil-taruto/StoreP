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

var<Picture_t> P_Enemy_0001 = @@_Load(RESOURCE_Picture__Enemy0001_png);
var<Picture_t> P_Player     = @@_Load(RESOURCE_Picture__Player_png);
var<Picture_t> P_Shot_0001  = @@_Load(RESOURCE_Picture__Shot0001_png);
var<Picture_t> P_Tama_0001  = @@_Load(RESOURCE_Picture__Tama0001_png);
var<Picture_t> P_Wall_0002  = @@_Load(RESOURCE_Picture__Wall0002_png);
var<Picture_t[]> P_Explode =
[
	@@_Load(RESOURCE_�҂ۂ�q��__Explode__0001_png),
	@@_Load(RESOURCE_�҂ۂ�q��__Explode__0002_png),
	@@_Load(RESOURCE_�҂ۂ�q��__Explode__0003_png),
	@@_Load(RESOURCE_�҂ۂ�q��__Explode__0004_png),
	@@_Load(RESOURCE_�҂ۂ�q��__Explode__0005_png),
	@@_Load(RESOURCE_�҂ۂ�q��__Explode__0006_png),
	@@_Load(RESOURCE_�҂ۂ�q��__Explode__0007_png),
	@@_Load(RESOURCE_�҂ۂ�q��__Explode__0008_png),
];
