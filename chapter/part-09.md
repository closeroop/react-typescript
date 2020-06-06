### <b>添加和修改页之 swiper 组件封装</b>
这里使用了一个react封装的swiper组件
> npm i react-id-swiper -S

使用链接在这： <a href="https://react-id-swiper.ashernguyen.site/doc/get-started">react-id-swiper</a>


#### 组件参数Props
组件的功能要求在之前一节已经的分析过，废话不哆嗦，雷霆嘎巴。
```
// 图标数据接口
interface IconProps {
	id: string
	name: string
	type: number
	icon: keyof typeof IconType
}

interface Iprops {
	iconArr: IconProps[]
	currentIconId?: string //当前高亮icon ID
	onIconClick?: (id: string) => void // 点击回调函数
}
```
#### 组件state
组件使用函数进行编写，因此这里使用 useState 进行状态管理，目前设计的组件只有一个状态，级选中的图标 ID
```
const [currentIconId, setIconId] = useState('0001')
```
我们给定了默认值，当然在传入ID 的情况下需要改变状态，使用以下方法改变：
```
useEffect(() => {
	if (typeof props.currentIconId !== 'undefined') {
		setIconId(props.currentIconId)
	}
}, [])
```
#### 代码编写
我们如何确定swiper组件要分割几部呢?<br />
```
const swiperPage = Array(Math.ceil(props.iconArr.length / 10) | 0).fill(0)
```
有更好的方法吗？<br />
传送门：<a href="./../src/components/AccountSwiper/index.tsx"> swiper 组件</a> <br />