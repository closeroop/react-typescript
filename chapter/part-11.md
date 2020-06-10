### <b>添加和修改页之 Tab 组件编写</b>
Tab组件我们使用了以下的形式进行定义
```
<Tab>
	<TabItem value={} label={} />
	<TabItem value={} label={} />
</Tab>
```
为什么不使用传参的形式定义 TabItem 呢？借鉴国内外优秀UI框架的设计，这样可以使项目结构清晰，功能职责分离。

#### Tab组件参数Props 	
```
interface ITab {
	children: React.ReactElement<ITabItem>[]
	onChange?: (infos: { value: string | number; label: string }) => void
	current?: number
	classes?: string
	style?: React.CSSProperties
}
```
<ul>
	<li>onChange: 当用户选择TabItem后的回调</li>
	<li>current: 当前默认的TabItem</li>
	<li>children: 传入TabItem组件数组</li>
	<li>classes: Tab 的 classname 类名</li>
	<li>style: 额外的style样式</li>
</ul>

#### TabItem组件参数Props 	
```
interface ITabItem {
	value: string | number
	label: string
	id?: number
	icon?: keyof typeof IconType
	disable?: boolean
	classes?: string
	style?: React.CSSProperties
	children?: React.ReactElement
}
```
<ul>
	<li>id: TabItem组件的key，不需要手动传入，配合 Tab 组件的 current 参数</li>
	<li>value: 值</li>
	<li>label: 说明</li>
	<li>disable: 是否可点击</li>
	<li>style: 额外的style样式</li>
	<li>classes: TabItem 的 classname 类名</li>
	<li>icon: 内容图标</li>
	<li>children: 传入自定义内容（还没做这个）</li>
</ul>

### <b>关联 TabItem 和 Tab </b>
使用 hook的 useContext 函数，配和 React.createContext 函数，将两者链接起来。

首先定义如下接口
```
type ITabContext = {
	handleTabItemClick: (id: number) => void
	current: number
	onChange?: (infos: { value: string | number; label: string }) => void
}
```
<ul>
	<li>handleTabItemClick: TabItem的状态改变后，触发Tab组件更新的回调函数</li>
	<li>current: 当前 tabItem 的 id</li>
	<li>onChange: 传入 Tab 组件，用于上一层组件回调的函数</li>
</ul>

使用 TabContext.Provider 包裹需要共享数据的组件，  然后在组价内使用 useContext 获取数据和方法。

#### 代码编写

完成后发现，即使被 memo 函数包裹的 TabItem 组件传入的参数没有改变，也会更新，翻阅网站发现：

 >React.memo 仅检查 props 变更。如果函数组件被 React.memo 包裹，且其实现中拥有 useState 或 useContext 的 Hook，当 context 发生变化时，它仍会重新渲染。

传送门：<a href="./../src/components/AccountTab/index.tsx"> Tab 组件</a>