### <b>添加和修改页之组件联动</b>
---
#### 添加和修改页的组件主要有：
<ul>
	<li> AccountItem 
	<li> AccountSwiper
	<li> AccountTab 
	<li> KeyBoard
</ul>
前面已经将这几个组件实现，现在就通过一些方式将他们联动起来。

#### 定义页面的 state
```
import { IProps as IAcounDetailtProps } from './../../components/AccountItem/index'
type IstateUnite = {
	income: IAcounDetailtProps
	outcome: IAcounDetailtProps
	currentSwiper: number
}
```
由于添加修改页是可以左右滑动切换收入和支出的，因此我们需要分别定义 收入 和 支出 的数据状态，定义 currentSwiper 判断当前页面的类型，以及作为 AccountTab 组件的参数与其联动。

#### 页面的 props 接口
由于我们消费的是顶层组件的数据和方法，因此，我们可以使用 交叉类型 定义接口。这样我们使用的时候就有提示了。
```
import { IAppContext } from './../../App'

type IAddOrModProps = RouteComponentProps & IAppContext
```

#### 定义不需要状态的数据
```
incomeCategories: ICategory[] = []  
outcomeCategories: ICategory[] = []
moneyMaxLength: number
swiperParams: any
queryData: any
iconId: {
	income: string | number
	outcome: string | number
}
```
<ul>
	<li> incomeCategories // 收入Tab页的图标数组
	<li> outcomeCategories // 支出Tab页的图标数组
	<li> moneyMaxLength // 输入金额的最大长度
	<li> swiperParams // swiper组件需要的配置参数
	<li> queryData // 路由传的参
	<li> iconId // 当前选中的图标
</ul>

### 联动
----

#### 初始化 initPage
根据queryData解析后的参数 type 判断当前我们需要进行的操作 <br />

0 - 添加操作: 对 state 的 income 和 outcome 初始化默认值<br />
1 - 修改收入操作: 对 state 的 income 初始化默认值, outcome 使用路由传递的参数 <br />
2 - 修改支出操作: 对 state 的 outcome 初始化默认值, income 使用路由传递的参数 <br />

根据 type 的值初始化 state 的 currentSwiper 值<br />
初始化 iconId 的值<br />

完成后 currentSwiper 作为 Tab组件的 current 参数， income 和 outcome 作为 AccountItem 的参数传入

#### 组件的 回调函数

KeyBoard 组件
<ul>
	<li> handleEnter 
	<li> handleDeleted
	<li> handleConfirm 
</ul>

所有的改变状态的操作都根据 currentSwiper 判断应该修改 imcome 还是 outcome 的值 <br />

AccountTab 组件

<ul>
	<li> handleTabChange 
</ul>

Tab的状态改变后，触发回调，修改 currentSwiper 的值，使页面的滚动到相应页面 <br />

AccountSwiper 组件

<ul>
	<li> handleSelected 
</ul>

选择相应图标后，触发回调更新相应的状态 <br />

传送门：<a href="./../src/container/Addaccount/index.tsx">添加修改页</a>