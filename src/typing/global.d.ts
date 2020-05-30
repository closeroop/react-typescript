// declare global {
// 	interface window {
// 		tools: any
// 	}
// }
interface Window {
	tools: any
}
declare enum IconType {
	note = 'youji',
	search = 'sousuo',
	editV2 = 'bianji',
	motorcycle = 'motuo',
	brokenline = 'touzi',
	borrow = 'jiekuanshenqing',
	water = 'shuidian1',
	medical = 'yiliao',
	learn = 'xuexi',
	smoke = 'yanjiutangcha',
	relax = 'youxian',
	entertainment = 'yule',
	complex = 'zonghe',
	food = 'wucan',
	snacks = 'canyin',
	travel = 'jingdian',
	house = 'zhusu',
	letter = 'duanxin',
	restaurant = 'canting',
	edit = 'dianping',
	bus = 'gongjiaoche',
	glodcoins = 'huobiduihuan',
	eyeopen = 'attention_light',
	eyeclose = 'attentionforbidfill',
	glodcoinsv2 = 'qian',
	xingcheng = 'xingcheng',
	washin = 'xiyiji',
	shoping = 'gouwu',
	think = 'renwen',
	delete = 'shanchu',
	setting = 'shezhi',
	phone = 'shouji',
	menu = 'xitongcaidan',
	redpaket = 'dixiaofei',
	wage = 'gaoxiaofei',
	jianyuede = 'jianyuede',
	goback = 'fanhui',
}

declare enum paymentType {
	Income = 1,
	Outcome = 2,
}
