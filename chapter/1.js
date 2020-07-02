function debounce(fn, awit, immediate) {
	let time = null
	return function () {
		// eslint-disable-next-line @typescript-eslint/no-this-alias
		let context = this
		let arg = Array.prototype.slice.call(arguments)
		if (time) {
			clearTimeout(time)
		}
		if (immediate) {
			if (!time) fn.apply(context, arg)
			time = setTimeout(function () {
				time = null
			}, awit)
		} else {
			time = setTimeout(function () {
				fn.apply(context, arg)
			}, awit)
		}
	}
}

function throttle(fn, awit, endflag) {
	let start = Date.now()
	let time = null
	let handleFn = function () {
		// eslint-disable-next-line @typescript-eslint/no-this-alias
		let context = this
		let arg = Array.prototype.slice.call(arguments)
		let now = Date.now()
		if (now - start > awit) {
			start = now
			fn.apply(context, arg)
			if (endflag && time) {
				clearTimeout(time)
				time = null
			}
		}
		if (endflag && time == null) {
			time = setTimeout(function () {
				time = null
				fn.apply(context, arg)
			}, awit)
		}
	}
	handleFn.cancel = function () {
		if (time) setTimeout(time)
	}
	return handleFn
}

class NP {
	static pendding = 'pendding'
	static rejected = 'rejected'
	static fulfilled = 'fulfilled'
	constructor(excutor) {
		this.value = null
		this.reason = null
		this.status = NP.pendding
		this.thenCallBack = []
		try {
			excutor(this.resolve, this.rejected)
		} catch (error) {
			this.rejected(error)
		}
	}
	resolve = value => {
		if (this.status === NP.pendding) {
			try {
				this.status = NP.fulfilled
				this.value = value
				setTimeout(() => {
					this.thenCallBack.forEach(fn => {
						fn.onResolved(value)
					})
				})
			} catch (error) {
				console.log(error, 2)
				this.rejected(error)
			}
		}
	}
	rejected = reason => {
		if (this.status === NP.pendding) {
			try {
				this.status = NP.rejected
				this.reason = reason
				setTimeout(() => {
					this.thenCallBack.forEach(fn => {
						fn.onRejected(reason)
					})
				})
			} catch (error) {
				this.rejected(error)
			}
		}
	}
	then = (onResolved, onRejected) => {
		onResolved = typeof onResolved !== 'function' ? value => value : onResolved
		onRejected = typeof onRejected !== 'function' ? reason => reason : onRejected
		let promise2 = new NP((resolve, rejecte) => {
			if (this.status == NP.pendding) {
				this.thenCallBack.push({
					onResolved: value => {
						this.parse(promise2, onResolved(value), resolve, rejecte)
					},
					onRejected: reason => {
						this.parse(promise2, onRejected(reason), resolve, rejecte)
					},
				})
			}
			if (this.status == NP.fulfilled) {
				setTimeout(() => {
					this.parse(promise2, onResolved(this.value), resolve, rejecte)
				})
			}
			if (this.status == NP.rejected) {
				setTimeout(() => {
					this.parse(promise2, onRejected(this.reason), resolve, rejecte)
				})
			}
		})
		return promise2
	}
	parse = (promise, x, resolve, rejecte) => {
		if (promise === x) {
			throw new TypeError('cirle error')
		}
		try {
			if (x instanceof NP) {
				x.then(resolve, rejecte)
			} else {
				resolve(x)
			}
		} catch (error) {
			rejecte(error)
		}
	}
	catch = onRejected => {
		onRejected = typeof onRejected !== 'function' ? reason => reason : onRejected
		return this.then(null, reason => {
			return onRejected(reason)
		})
	}
	static resolved = value => {
		return new NP((resolve, rejecte) => {
			if (value instanceof NP) {
				value.then(resolve, rejecte)
			} else {
				resolve(value)
			}
		})
	}
	static rejecte = value => {
		return new NP((resolve, rejecte) => {
			rejecte(value)
		})
	}
	static all = promiseArr => {
		return new NP((resolve, rejecte) => {
			let resvoleArr = []
			promiseArr.forEach(item => {
				NP.resolved(item).then(
					value => {
						resvoleArr.push(value)
						if (resvoleArr.length === promiseArr.length) {
							resolve(promiseArr)
						}
					},
					reason => {
						rejecte(reason)
					}
				)
			})
		})
	}
	static race = promiseArr => {
		return new NP((resolve, rejecte) => {
			promiseArr.forEach(item => {
				NP.resolved(item).then(
					value => {
						resolve(value)
					},
					reason => {
						rejecte(reason)
					}
				)
			})
		})
	}
}
function deepClone(target) {
	let result
	let toString = Object.prototype.toString
	if (typeof target === 'object' && target !== null) {
		if (toString.call(target) === '[object Array]') {
			result = []
			target.forEach((item, index) => {
				result[index] = deepClone(item)
			})
		}
		if (toString.call(target) === '[object Object]') {
			result = {}
			Object.getOwnPropertySymbols(target).forEach(item => {
				result[Symbol()] = deepClone(target[item])
			})
			Object.getOwnPropertyNames(target).forEach(key => {
				result[key] = deepClone(target[key])
			})
		}
	} else {
		result = target
	}
	return result
}
function add(...arg) {
	let args = arg
	let adder = function (...arg2) {
		return add.apply(null, args.concat(arg2))
	}
	adder.toString = function () {
		return args.reduce((p, n) => {
			return p + n
		}, 0)
	}
	return adder
}
function LSC(word1 = '', word2 = '') {
	let length1 = word1.length
	let length2 = word2.length
	let max = 0,
		index = 0,
		str = ''
	let lcsarr = Array(length1 + 1).fill(0)
	lcsarr.forEach((item, index) => {
		lcsarr[index] = Array(length2 + 1).fill(0)
	})
	for (let i = 1; i <= length1; i++) {
		for (let j = 1; j <= length2; j++) {
			if (word1[i - 1] == word2[j - 1]) {
				lcsarr[i][j] = lcsarr[i - 1][j - 1] + 1
			} else {
				lcsarr[i][j] = 0
			}
			if (max < lcsarr[i][j]) {
				max = lcsarr[i][j]
				index = i
			}
		}
	}
	if (max > 0) {
		while (max--) {
			str = word1[--index] + str
		}
	}
	console.log(lcsarr)
	return str
}
function react(obj, key, value) {
	Object.defineProperty(obj, key, {
		set(val) {
			value = val
			console.log(key, val)
			observe(value)
		},
		get() {
			return value
		},
	})
}
function observe(obj) {
	if (typeof obj !== 'object' || obj === null) {
		return
	}
	Object.keys(obj).forEach(key => {
		observe(obj[key])
		react(obj, key, obj[key])
	})
}
