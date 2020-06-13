### <b>详情页面编写</b>
详情页面的布局和逻辑都十分简单，这里不过多讲述。但有一个值得注意的地方：我们使用了 react-router-dom 这个库作为路由组件。同时组件也提供了对应的声名文件，我们刚好可以使用它已经定义好的接口作为组件的 props 的接口。

#### 使用 RouteComponentProps 作为组件 props 的接口
>RouteComponentProps 接口定义了 Route 组件传递的 history、location、match 数据和行为规范。

详情页通过路由传参，使用工具函数进行解析得到数据。比较简单，没啥好说的。


记录1.0 以下旧文档内容，可作为知识点补充。

-----
详情页面我们需要通过一个 id 知道当前账目的具体数据。在路由设计时我们设计了一个动态路由，路由的id参数可变。
```
<Route path='/AccountDetail/:id' exact component={AccountDetail}></Route>
```
按照以往的经验，我们可以通过: 丨this.props.match.params.id丨 获取 id 值，所以会写这么写，但是会出事的兄弟萌：
```
import { RouteComponentProps } from 'react-router-dom'
class HomePage extends Component<RouteComponentProps> {
	constructor(props: RouteComponentProps) {
		super(props)
		this.state = {
			id: this.props.match.params.id
      // error 
      // 类型“{}”上不存在属性“id”
		}
	}
  // TODO
}
```
当我们把鼠标移到 params 字段上使会提示：(property) match<{}>.params: {}，这里的意思是match的接口中没有定义任何内容，所以查找id的时候会报错找不到。<br />
查看 RouteComponentProps 接口的定义可以看到
```
interface RouteComponentProps<
    Params extends { [K in keyof Params]?: string } = {}, // <- 先看这
    C extends StaticContext = StaticContext,
    S = H.LocationState
> {
    history: H.History<S>;
    location: H.Location<S>;
    match: match<Params>; // <- 再看这
    staticContext?: C;
}

interface match<Params extends { [K in keyof Params]?: string } = {}> {
    params: Params; // // <- 最后看这
    isExact: boolean;
    path: string;
    url: string;
}
```
你看明白了吗。传入接口 RouteComponentProps 的泛型 Params 默认是空的，那么match传入的泛型 Params 也是空的，最后 params 也接到了空的 {}，里面什么都没有。typescript 不允许访问未定义的变量、属性、值。那么我们就传入一个带有 id 的接口 IRouteProps
```
interface IRouteProps {
	id?: string
}
class HomePage extends Component<RouteComponentProps<IRouteProps>> {
  ///
  this.state = {
    id: this.props.match.params.id,
  }
  ///
}
```
没问题，ZBC!