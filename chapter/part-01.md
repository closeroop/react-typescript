### 目录安排[src目录] （陆续更新。。。）
<ul>
  <li> components 存放通用组价
    <ul>
      <li> AccountIcon 图标组件
      <li> AccountItem 账目信息组件
      <li> AccountSwiper 包含图标的Swiper组件
      <li> IncomeHead 简易收支金额描述组件
      <li> StatisticsBox 首页头部金额展示组件
      <li> AccountTab Tab 组件
      <li> KeyBoard 键盘组件
    </ul>
  <li> container 多页面的容器
    <ul>
      <li> HomePage 首页
      <li> Addaccount 添加或者修改页
      <li> AccountDetail 收支详情页
    </ul>
  <li> moke 模拟数据文件夹
    <ul>
      <li> categories.js 图标数据
      <li> paymentList.js 记账数据
    </ul>
  <li> styles 全局通用样式
    <ul>
      <li> _general.scss
      <li> _iconFont.scss
      <li> _mixins.scss
      <li> _normalize.scss
      <li> _variable.scss
      <li> index.scss
    </ul>
  <li> typing 全局声明文件夹
    <ul>
      <li> global.d.ts 
    </ul>
  <li> util 工具函数文件夹
    <ul>
      <li> tool.ts
      <li> index.ts
    </ul>
  <li> App.tsx 路由逻辑文件
    <ul>
      <li> path='/' 丨 component={HomePage}
      <li>  path='/AddAccount' 丨 component={Addaccount}
      <li>  path='/AccountDetail/:id' 丨 component={AccountDetail}
    </ul>
  <li> index.tsx 入口文件
</ul>