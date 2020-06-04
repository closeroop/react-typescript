### 首页头部支出收入编写
记账本首页大致可划分为两部分，头部支出收入金额部分，以及由支出或收入条目组成的列表，首先完成头部支出收入部分，这部分比较简单。大致完成以下效果（完整可看截图） <br /><br />
<img src="./../snapshot/cat/01-首页-金额头部.jpg" width=375 />
<img src="./../snapshot/cat/01-首页-开眼.jpg" width=375 />
<br />

#### 首先设计组件需要传入的参数
```
interface IStatisticsProps {
	income?: number
	outcome?: number
	isSetBudget?: boolean //预算
	budget?: number // 预算值
}
```
为什么我设置的Props接口都是可选参数呢，我希望组件可以有默认值，在不传参数给组件的时候可以正常显示。当然这里接口都写必传也是没问题的，这里看自己怎样把握，只要遵守接口规范就行。<br /><br />

#### 组件自有状态
由于可通过眼睛按钮控制金额的显示隐藏，借助react16.X版本我们可以使用useState控制显示隐藏的状态。<br />
```
const [showMoney, setShowState] = useState(true)
````
#### 代码编写
定义好接口和状态后，编写组件代码。这一部分是比较简单的。参照界面样式编写比较容易了。传送门：<a href="./../src/components/StatisticsBox/index.tsx">首页头部组件编写</a> 
