### 首页头部支出收入编写
记账本首页大致可划分为两部分，头部支出收入金额部分，以及由支出或收入条目组成的列表，首先完成头部支出收入部分，这部分比较简单。大致完成以下效果（完整可看截图） <br />
<img src="./../snapshot/cat/01-首页-金额头部.jpg" height=300 />
<img src="./../snapshot/cat/01-首页-开眼.jpg" height=300 />
<br />
首先设计组件需要传入的参数
```
interface countProps {
	income?: number
	outcome?: number
	isSetBudget?: boolean //预算
	budget?: number // 预算值
}
```
由于可通过眼睛按钮控制金额的显示隐藏，借助react16.X版本我们可以使用setState控制状态。
待续。。。。