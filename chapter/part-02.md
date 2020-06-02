### 项目图标选择和Icon组件编写
>项目图标来自 <a href="https://www.iconfont.cn">阿里巴巴图标库</a>，Icon组件的功能并不多，主要想要实现的是使用Icon组件时可以对props进行静态检查，及时提醒参数的问题，另外在组件上输入参数时还有参数提醒，体验更好。对Icon组件的处理进行了一下几点处理：

#### 1. 设计Icon组件props参数列表
```
import { IconType, IconTypeArr, IconSize, IconSizeArr } from './iconTypes'

type IconSizes = keyof typeof IconSize //type IconSizes = "small" | "big" | "normal"
type IconNames = keyof typeof IconType // 太长不展示

interface IProps {
	name: IconNames
	size?: IconSizes
	style?: React.CSSProperties
}
```
<li>name代表图标种类；
<li>size代表图标的尺寸（这个还没没及样式：)）；
<li>style 是满足对图标样式的特殊需求，可以和组件的样式进行合并

<b>注意：</b> 
<li>你可以到对应文件里看看引入的 IconType, IconTypeArr, IconSize, IconSizeArr 是什么
  <ul>
    <li> IconType 是对阿里巴巴图标库下载图标名称的枚举
    <li> IconTypeArr 阿里巴巴图标库下载图标名称的枚举的数组
    <li> IconSize 图标大小的枚举
    <li> IconSizeArr 图标大小的枚举的数组
  </ul>
<li>size代表图标的尺寸（这个还没没及样式：)）；
<li>style 是满足对图标样式的特殊需求，可以和组件的样式进行合并

#### 2. 组间无状态
由于Icon目前只是一个展示型组间，添加状态会使组间有点冗余
```
const Icon: React.FC<IProps> = props => {
	// TODO
}
```
#### 3. 使用PropTypes类型检查可能遇到的问题
由于我们定义了组间props数据的接口IProps使用了它，因此使用PropTypes进行类型检查时会默认与IProps中定义的类型进行比较。如果我们在接口中使用了 <b>联合类型</b>、<b>枚举类型</b> 等非基本类型（number、string 等），类型检查时若不做一些处理，就会报错。举个栗子(骚味完整点吧)：

```
enum IconSize {
	small = 'small',
	big = 'big',
	normal = 'normal',
}

type IconSizes = keyof typeof IconSize // 相当于 ->type IconSizes= "small" | "big" | "normal"

interface IProps {
	size: IconSizes 
	// TODO
}

const Icon: React.FC<IProps> = props => {
	// TODO
}

Icon.propTypes = {
	size: PropTypes.oneOf(['small', 'big', 'normal']).isRequired,
  // error 
  //不能将类型“Validator<string>”分配给类型“Validator<"small" | "big" | "normal">”。不能将类型“string”分配给类型“"small" | "big" | "normal"”。
	// TODO
}
```
为啥是：不能将 <b>类型“string”</b>分配给 <b>类型“"small" | "big" | "normal"”</b> ？<br />
原因有几点：
<li> 在typescript中使用type对一个非原始类型类型(如枚举。联合类型，一个具体的值等)进行别名后，在对定义的变量赋予这个定义的类型后，等待被赋予变量的值必须等于非原始类型类型的值，其中枚举和联合类型取其中任意一个值。（undefine和null的情况先不说）
<li>PropTypes.oneOf(['small', 'big', 'normal'])对应Validator< string>，因为传入的是一个字符串数组，这里的字符串数组并没有被任何类型定义，是typescript推断出来的；而Validator<"small" | "big" | "normal">是根据接口 IProps 得到的。其实我们这里定义的数组里面的值是和接口里面的值一一对应的，我们需要做的是让编译器接受和识别。
<li>目前我能知道的有以下两种方法解决:
  <ul>
    <li>
      1. 使用类型断言（不太推荐）<br />
      ->PropTypes.oneOf(['small', 'big', 'normal']<b> as IconSize[]</b>).isRequired<br />
      使用这种方法你会发现数组中有一俩个数据不对应也不会报错。<br />
      ->PropTypes.oneOf(['smalle', 'bige', 'normal']<b> as IconSize[]</b>).isRequired<br />
      断言其实就是欺编译器，我就是许嵩(假的)。
    <li>
      1. 对传入的数组赋予类型（推荐）<br />
      const iconSizeArr:IconSizes[] = ['small', 'big', 'normal']<br />
      // todo <br />
      size: PropTypes.oneOf(iconSizeArr).isRequired,
      iconSizeArr数组的内容必须是IconSizes列举的联合类型中的值，同时你还会发现，修改iconSizeArr中任意一个值，若不在联合类型值范围中就会报错。
  </ul>

  ### 4. 接第三问，如果接口IProps写成size?: IconSizes，PropType类型验证时会怎样呢？
  你可一直使用未进行类型定义的数组字面量，并且可以智能检测数组是否与接口字段类型值匹配
  ```
  PropTypes.oneOf(['small', 'big', 'normal'])
  ```
  鼠标移到oneOF函数上能正常解析类型
  ```
  function oneOf<"small" | "big" | "normal">(types: readonly ("small" | "big" | "normal")[]): PropTypes.Requireable<"small" | "big" | "normal">
  ```
  这是为什么呢？想想。
