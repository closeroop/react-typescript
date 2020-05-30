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

function farmatTime(data: number, format = 'YYYY-MM-DD hh:mm:ss', zh = false): string {
	const reg = /(Y{4})[:-](M{2})[:-](D{2})\w?(h{4})[:-](m{2})[:-](s{2})/i
	const time = new Date(data)
	const year = time.getFullYear(),
		money = addZero(time.getMonth() + 1),
		day = addZero(time.getDate()),
		hours = addZero(time.getHours()),
		seconds = addZero(time.getSeconds()),
		minutes = addZero(time.getMinutes())
	return money + '月' + day + '日'
}

export default { formatMoney, farmatTime }
