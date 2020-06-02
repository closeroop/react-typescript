function formatMoney(money: number | string = 0, gapTag = ',', decimal = 2, gap = 3): string {
	if (typeof money === 'number') {
		money = String(money)
	}
	const length = money.length
	const debrisArr = []
	for (let i = 0; i <= length - 1; i += gap) {
		debrisArr.push(money.substr(i, gap))
	}
	return debrisArr.join(gapTag) + '.' + '0'.repeat(decimal)
}

function addZero(number: number | string) {
	number = Number(number)
	return number < 10 ? '0' + number : number
}
/**
 *
 * @param data 时间戳
 * @param type 1-> 00月00日 2. 今天 00:00  3->0000年00月00日 4->0000年00月00日 00:00:00 5-> 自定义(暂时不上)
 * @param format YYYY-MM-DD hh:mm:ss (暂时不上)
 */
type formatTimType = 1 | 2 | 3 | 4
function formatTime(data: number, type: formatTimType = 1): string {
	// const reg = /(Y{4})[:-](M{2})[:-]?(D{2})\s+(h{0,2})[:-]?(m{0,2})[:-]?(s{0,2})/i
	const time = new Date(data)
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
			timeText = data + ''
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

export default { formatMoney, formatTime, _debounce }
