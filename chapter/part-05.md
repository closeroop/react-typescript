### 1. 工具函数tools编写

目前我们需要对传入组件的数据需要进行格式化，次文档只展示函数的定义，具体实现可以自己完成或者查看项目<a href="./../src/util/tool.ts">相关文件</a>，现将项目需要用到的工具函数进行列示(你可以编写比这里更好的工具函数)：<br />

#### 1.1 金额格式化函数
```
function formatMoney(money: number | string = 0, gapTag = ',', decimal = 2, gap = 3): string {
  // TODO
}
```
示例： 入参：2000，  返回：2,000.00 <br />
参数说明：<br />
<ul>
  <li> money：输入的金额
  <li> gapTag：分割的符号
  <li> decimal： 保留小数点
  <li> gap： 分割长度
</ul>

#### 1.2 时间格式化函数
```
type formatTimType = 1 | 2 | 3 | 4
function formatTime(date: number, type: formatTimType = 1): string {
  // TODO
}
```
参数说明：<br />
<ul>
  <li> date：时间戳
  <li> type：转换结果的类型
</ul>

#### 1.3 防抖函数（按钮点击用）
```
function _debounce(fn: (...arg: any[]) => any, gap = 200): any {
  // TODO
}
```
参数说明：<br />
<ul>
  <li>fn：被防抖的函数
  <li>gap：防抖时间间隔
</ul>

### 2. 全局挂载以及全局声明
我们可以将工具函数放到顶级对象的 tools 属性上
```
import Tools from './tool' // 导出的函数库
window.tools = Tools
```
这样我们再使用的时候就不用每次都引入工具函数库了。但是你在使用的时候会有两个问题：
<ul>
  <li>使用 tools 的时候没有提示或者联想，我们很容易拼错函数的名字导致程序错误，以及我们也不清楚 tools 上到底有哪些函数，别人在使用时很难受。
  <li>在我们输入了正确的函数后运行，页面会报找不到变量tools错误（Cannot find name 'tools'）。就算 tools 确实以及挂载在了全局上。这个错误与 typescript 静态编译规则有关。
</ul>
因此在挂载到全局后，我们还需要为工具函数编写一份声名文件，这样可以解决上面的两个问题：<br />

> 根据目前流行的做法，我们再src下创建一个叫 `typing` 的文件夹，在文件夹里添加一个 `global.d.ts` 文件，注意文件名的字母 `d` 不能省略。接下来添加工具函数的接口。

```
type formatTimType = 1 | 2 | 3 | 4
interface ITools {
	formatMoney: (money?: number | string, gapTag?: string, decimal?: number, gap?: number) => string
	formatTime: (date: number, type?: formatTimType) => string
	_debounce: (fn: (...arg: any[]) => any, gap: number | undefined) => any
}

interface Window {
	tools: ITools
}
// 先声明window上有个名叫 tools 的变量

declare const tools: ITools

// 这一步可以让我们直接使用变量 tools
```
这样我们便可以在程序各处使用tools函数并且有智能提示了。关于 typescript 的声明的内容可以查看官方中文网以及一个较好的入门学习网站: <a href="https://ts.xcatliu.com/basics/declaration-files.html">Typescript 入门教程</a>

