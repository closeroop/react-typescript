### <b>添加和修改页之 keyboard 组件编写</b>
今天更新下 keyboard 组件的文档，整一篇小鸟伏特文，更新这么高，雷霆嘎巴。<br />
<br />
keyboard 组件参考了微信小程序 <b>微信记账本</b> 的键盘样式。因为微信的好看一点。键盘组件使用了CSS3 grid 网格布局，刚好熟练下使用方法。都2020年了，是个最近出道的手机都能兼容了。

#### 组件参数Props 	
```
interface Iprops {
	onEnter?: (val: string) => void
	onClear?: () => void 
	onDelete?: () => void
	onConfirm?: () => void
	okBtnText?: string
	okFontColor?: string
	okBtnColor?: string
	isShowClearBtn?: boolean
}

// 配合一定的默认值，让组件普通的显示：
KeyBoard.defaultProps = {
	okBtnText: '确定',
	okBtnColor: '#fff',
	isShowClearBtn: true,
}
```
<ul>
	<li>onEnter: 传入点击数字，小数点的回调</li>
	<li>onClear: 传入点击 清理 按钮的回调</li>
	<li>onDelete: 传入点击 删除 按钮的回调</li>
	<li>onConfirm: 传入点击 确定 按钮的回调</li>
	<li>okBtnText: 确定按钮文案</li>
	<li>okFontColor: 确定按钮字体颜色</li>
	<li>okBtnColor: 确定按钮颜色</li>
	<li>isShowClearBtn: 是否展示清理按钮</li>
</ul>

#### 组件state
无

#### 代码编写
代码部分就是 keyboard 的html页面布局和css，以及处理接口中的事件。<br />
但是有一个问题我感觉解决的不是很完美：<br />
如何定义点击事件的回调中 event 的类型，让我能够书写 event.target.dataset 不会报错。查阅网上的资料，按以下写法进行了定义。
```
	/**
	 * 
	 * @React.MouseEvent<HTMLUListElement> 因为我把点击事件委托给了ul元素
	 */
	const handleClick = (e: React.MouseEvent<HTMLUListElement>): void => {
		const dataset = (e.target as HTMLUListElement).dataset
	}
```
如果有更好的写法，欢迎留言

传送门：<a href="./../src/components/KeyBoard/index.tsx"> keyboard 组件</a> <br />