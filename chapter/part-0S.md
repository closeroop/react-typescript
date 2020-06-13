### 项目的一些约定
<ul>
  <li> 每个容器组件我都使用类进行定义，普通组件都使用函数组件。
  <li> 文档会随着后续改动和优化发生变化，添加、订正、或者删减。
</ul>

### 项目共享数据流动方式

采用 Context 方式有顶层组件提供数据，子组件接收


### 定义的通用接口


app.tsx
------
------

#### 账目信息接口
部分接口含义会在后续解释
```
export interface IAcount {
	id: number | string
	moeny: string
	cid: number | string
	time?: number
	note?: string
}
```
cid 用于和图标信息接口的id对应
#### 图标信息接口
```
export interface ICategory {
	id: string | number
	name: string
	type: paymentType
	icon: keyof typeof IconType
}
```
#### 顶层 Context 接口
```
export interface IAppContext {
	accountTable: {
		accountList: IAcount[]
		category: ICategory[]
	}
	actions: {
		addAccountItem: (item: IAcount) => void
		delAccountItem: (id: number | string) => void
		updateAccountItem: (item: IAcount) => void
	}
}
```
components/AccountIcon/index.tsx
------
------
#### 图标组件 IconType 接口
```
export enum IconType {
	note = 'youji',
	search = 'sousuo',
	editV2 = 'bianji',
	motorcycle = 'motuo',
  // .......
}
```
#### 图标组件 IconSize 接口
```
export enum IconSize {
	small = 'small',
	big = 'big',
	normal = 'normal',
}
```
components/AccountItem/index.tsx
------
------
#### 账目组件 IProps 接口
```
export interface IProps {
	id: number | string
	category: string
	icon: keyof typeof IconType
	paymentType: paymentType
	moeny: string
	time?: number
	note?: string
	formatMoney?: boolean
	onClick?: (item: IProps) => void
}
```
#### 账目组件 paymentType 接口
```
export enum paymentType { //1-收入 2-支出
	Income = 1,
	Outcome = 2,
}
```