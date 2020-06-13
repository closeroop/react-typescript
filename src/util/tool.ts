function formatMoney(money: number | string = 0, gapTag = ',', gap = 3, decimal = 2): string {
	if (isNaN(Number(money))) {
		return '0.00'
	}
	if (typeof money === 'number') {
		money = String(money)
	}
	let length = money.length
	let formatResult = ''
	let isMatchDot = false
	if (money.match(/\./g)) {
		length = money.split('.')[0].length
		isMatchDot = true
	}
	for (let i = length, j = 1; i >= 1; i--, j++) {
		if (j % gap === 0 && j !== length) {
			formatResult = gapTag + money[i - 1] + formatResult
		} else {
			formatResult = money[i - 1] + formatResult
		}
	}
	if (!isMatchDot) {
		return formatResult + '.' + '0'.repeat(decimal)
	}
	return formatResult + '.' + Number(money).toFixed(decimal).split('.')[1]
}

function addZero(number: number | string) {
	number = Number(number)
	return number < 10 ? '0' + number : number
}
/**
 *
 * @param date 时间戳
 * @param type 1-> 00月00日 2. 今天 00:00  3->0000年00月00日 4->0000年00月00日 00:00:00 5-> 自定义(暂时不上)
 * @param format YYYY-MM-DD hh:mm:ss (暂时不上)
 */
type formatTimType = 1 | 2 | 3 | 4
function formatTime(date: number | undefined, type: formatTimType = 1): string {
	// const reg = /(Y{4})[:-](M{2})[:-]?(D{2})\s+(h{0,2})[:-]?(m{0,2})[:-]?(s{0,2})/i
	if (typeof date === 'undefined') {
		date = Date.now()
	}
	const time = new Date(date)
	const year = time.getFullYear(),
		month = addZero(time.getMonth() + 1),
		day = addZero(time.getDate()),
		hours = addZero(time.getHours()),
		seconds = addZero(time.getSeconds()),
		minutes = addZero(time.getMinutes())
	let timeText = ''
	switch (type) {
		case 1:
			timeText = month + '月' + day + '日'
			break
		case 2:
			timeText = '今天' + hours + ':' + minutes
			break
		case 3:
			timeText = year + '年' + month + '月' + day + '日'
			break
		case 4:
			timeText = year + '年' + month + '月' + day + '日 ' + hours + ':' + minutes + ':' + seconds
			break
		default:
			timeText = date + ''
	}
	return timeText
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function _debounce(fn: (...arg: any[]) => any, gap = 200): any {
	let start: number = Date.now(),
		end: number
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	return function (this: void, ...arg2: any[]) {
		end = Date.now()
		if (end - start < gap) {
			start = end
		} else {
			start = end
			fn.apply(this, arg2)
		}
	}
}

function qs(needQsData: { [index: string]: any }): string {
	const qsSttring: string[] = []
	Object.keys(needQsData).forEach(key => {
		qsSttring.push(`${key}=${needQsData[key]}`)
	})
	return qsSttring.join('&')
}

function parseUrlSearch(search: string): { [index: string]: string } {
	const parse = {} as { [index: string]: string }
	const searchParams = new URLSearchParams(search)
	searchParams.forEach((value, key) => {
		parse[key] = value
	})
	return parse
}

function flatternArr<U, T extends keyof U>(array: U[], attribute: T): any {
	return array.reduce((pre, cur) => {
		pre[cur[attribute]] = cur
		return pre
	}, {} as any)
}

export default { formatMoney, formatTime, _debounce, qs, parseUrlSearch, flatternArr }
