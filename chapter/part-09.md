### <b>添加和修改页之 图标swiper 组件封装</b>
这里使用了一个react封装的swiper组件
> npm i react-id-swiper -S

使用链接在这： <a href="https://react-id-swiper.ashernguyen.site/doc/get-started">react-id-swiper</a>


#### 组件参数Props
组件的功能要求在之前一节已经的分析过，再粘贴一下，雷霆嘎巴。
<ul>
  <li>传入icon相关的数据以每组10（其他数量也行）个进行渲染，可以自动进行 swiper 页面的分割</li>
  <li>根据不同的icon数据的类型使用不同的颜色进行标记</li>
  <li>组件不依赖父组件的状态、行为，自己可以进行状态改变，发生行为</li>
  <li>组件只使用一次父组件传入的数据，进行状态初始化，之后自己进行状态管理</li>
</ul>

```
// 对传入图标数据定义接口规范

import { ICategory } from './../../App' // 这是预定义的接口

interface Iprops {
	iconArr: ICategory[]
	defaultIconId?: string | number
	onIconClick?: (item: ICategory) => void
	ItemClass?: string
}
```
#### 组件state
组件使用函数进行编写，因此这里使用 useState 进行状态管理，目前设计的组件只有一个状态，即选中的图标 ID
```
const [currentIconId, setIconId] = useState(props.iconArr[0].id)
```
我们给定默认值，并在函数组件挂载时根据传入的 defaultIconId 改变高亮图标的状态：
```
useEffect(() => {
		if (props.defaultIconId && props.defaultIconId !== currentIconId) {
			setIconId(props.defaultIconId)
		}
		// TODO
	}, [])
	// 这里的数组传空，因为我们不依赖任何变量的变化。
```
#### 代码编写
1.我们如何确定swiper组件要分割几部呢?<br />
```
const swiperPage = Array(Math.ceil(props.iconArr.length / 10) | 0).fill(0)
```
有更好的方法吗？<br />

2.我们还提供一个好的体验：当高亮的图标在swiper第二页的时候，可以自己翻页到相应页面。这个体验同样在进入添加和修改页也会体现。
```
useEffect(() => {
		// TODO
		// currenSwiperFn 记忆初始化后高亮对应页的函数
		if (currentSwiper !== currenSwiperFn) {
			currentSwiper = currenSwiperFn
			setTimeout(() => {
				mimiSwiper.slideTo(currentSwiper)
			}, 0)
		}
		// 为什么要使用setTimeout函数呢，我们需要等待 swiper 的实例初始化话完成，在开启下一个任务队列开始时调用，直接调用会因为 swiper 的实例未初始化完成而报错。（更好的解释可以给下吗）
	}, [])
```
传送门：<a href="./../src/components/AccountSwiper/index.tsx"> swiper 组件</a> <br />