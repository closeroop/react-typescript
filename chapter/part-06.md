### 组件说明

该组件主要用于处理页面与用户交互时的对话，和平时弹出的取消确认框相差无几，接下来我们写个自己封装的 Dialog 组件吧。但我们希望组件可以渲染到存在于父组件以外的 DOM 节点。使用 Portals 方案实现，但相应的，组件只能写成类组件了。

#### 组件需要传入的参数

```
interface IDialog {
	isOpen?: boolean
	title?: string
	content?: string
	type?: 'alert' | 'confirm' | 'textarea'
	okBtnConfig?: {
		text?: string
		callBack?: (value?: string) => void
	}
	cancelBtnConfig?: {
		text?: string
		callBack?: () => void
	}
}
```
<ul>
  <li> type有三个参数， alert 的对话框只有一个确认按钮， 其他两种都另有一个取消按钮
</ul>

#### 组件默认参数

定义下默认参数，便于预览容错
```
Dialog.defaultProps = {
	isOpen: false,
	title: '提示',
	content: '这是内容',
	type: 'alert',
	okBtnConfig: {
		text: '确定',
		callBack: undefined
	},
	cancelBtnConfig: {
		text: '取消',
		callBack: undefined
	}
}
```
#### 代码编写
1. 组件并没有自己的状态，所有的操作都通过传入的 props 参数改变自身的状态。<br />
2. 如何使用 Portals 将子节点渲染到存在于父组件以外的 DOM 节点，查看官网的例子就已经讲得很明白了。剩下的就是样式结构编写，以及一些组件的优化了。 <br />
3. 在处理该组件时需要注意在 卸载 该组件时需要判断该组件是否还挂载在 Dom 上，若已经不再了就不要再进行组件的移除了。 <br />
传送门：<a href="./../src/components/Dialog/index.tsx">Dialog 组件编写</a> 
