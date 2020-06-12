// declare global {
// 	interface tools {
// 		tools: any
// 	}
// }
type formatTimType = 1 | 2 | 3 | 4
interface ITools {
	formatMoney: (money?: number | string, gapTag?: string, decimal?: number, gap?: number) => string
	formatTime: (date: number, type?: formatTimType) => string
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	_debounce: (fn: (...arg: any[]) => any, gap: number | undefined) => any
	qs: (needQsData: { [index: string]: any }) => string
	parseUrlSearch(search: string): { [index: string]: string }
	flatternArr: <U, T extends keyof U>(array: U[], attribute: T) => any
}

interface Window {
	tools: ITools
}
declare const tools: ITools

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
	shopping = 'gouwu',
	think = 'renwen',
	delete = 'shanchu',
	setting = 'shezhi',
	phone = 'shouji',
	menu = 'xitongcaidan',
	redpaket = 'dixiaofei',
	wage = 'gaoxiaofei',
	jianyuede = 'jianyuede',
	goback = 'fanhui',
	deletev2 = 'shanchu1',
}

declare enum paymentType {
	Income = 1,
	Outcome = 2,
}
