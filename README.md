### <b>说明</b>
---
俗话说：学以致用，学了typescript不应用到实际的一个项目中，提升不会很大；于是打算结合react，写个不大不小的应用。<br />
记录下写的过程，感觉网上react结合typescript的教程挺少的，所以应该也会犯一些错误。<br />
推荐一本国外react结合typescript的书，有一定的基础看比较合适：<a href="http://www.java1234.com/a/javabook/webbase/2018/1219/12596.html">《Learn React with TypeScript 3》</a>
<ul>
  <li>1. webApp 界面参考了<b>我的记账本</b> 手机App(安卓)。App 参考截图放在了 snapshot 目录下。
  <li>2. 项目目标是完成 `我的记账本` 95%的功能，使用 typescript 进行代码静态检查。
  <li>3. 希望能够有所收获
  <li>4. 留言可转 closeroop@163.com
</ul>

### <b>初始化项目</b>
---
1.使用官方脚手架工具 npx create-react-app app-name --tempalte typescript <br/>
2.安装eslint代码检查工具 -> npm i eslint -D
  <ul>
    <li> 命令行运行 eslint --init
    <li> 根据提示选择typescript选项和react选项，初始化完成后项目生成 .eslintrc.js 文件
    <li> 在根目录创建 .eslintignore 文件 忽略node_modules里格式检查。
  </ul>
3. 安装 prettierrc 代码格式检查工具 npm i prettierrc eslint-plugin-prettier eslint-config-prettier -D
<ul>
  <li> 修改 .eslintrc.js 文件 extends 和 pulgin 配置
  <li> 创建 .prettierrc.js 文件，定义代码格式要求。
</ul>
4. 运行项目，控制台可能会因为项目里eslint版本问题报错，可根据提示安装相应版本eslint版本。这里的冲突是因为react里面的 npm 命令依赖了eslint 的对应版本。<br /> 
5. 关于项目样式语言选择，这里选择了scss，自己喜欢什么用就好。样式选择不是项目的重点。<br /> 
6.关于其他配置，脚手架已经做的很完善了，可根据自己要求自己拓展。<br /> 
<b>注：2-6步骤不是必须的！</b>

### <b>进度</b>

  <a href="./chapter/part-00.md">目前的开发录截图</a>

### <b>文档</b>
---
<ul>
  <li> <a href="./chapter/part-01.md">1. 项目目录结构安排 </a> 
  <li> <a href="./chapter/part-0S.md">2. 项目的一些说明 </a> 
  <li> <a href="./chapter/part-02.md">2. 项目图标选择和 AccountIcon 组件编写</a> 
  <li> <a href="./chapter/part-03.md">3. StatisticsBox 首页头部支出收入编写</a> 
  <li> <a href="./chapter/part-04.md">4. AccountItem 账目信息组件编写</a> 
  <li> <a href="./chapter/part-05.md">5. 工具函数tools编写，全局挂载以及全局声明（根据需要添加新函数）</a> 
  <li> <a href="./src/container/HomePage/index.tsx">6. 首页组装 </a>
  <li> <a href="./chapter/part-07.md">7. 详情页面编写</a>
  <li> <a href="./chapter/part-08.md">8. 添加和修改页分析</a>
  <li> <a href="./chapter/part-09.md">9. 添加和修改页之 swiper 组件封装</a>
  <li> <a href="./chapter/part-10.md">10. 添加和修改页之 keyboard 组件编写</a>
  <li> <a href="./chapter/part-11.md">11. 添加和修改页之 tab 组件编写</a>
  <li> <a href="./chapter/part-06.md">12. Dialog 组件编写</a>
  <li> <a href="./chapter/part-12.md">12. 添加和修改页之 组件联动</a>
  <li> 13. 账单记录页分析和编写
</ul>

### <b>记录更新（新增）</b>
---

2020-07-02
<ul>
  <li> 添加 [ 添加修改页 ] 键盘 进场动画
  <li> 扩展 Dialog 组件，增加可输入状态
  <li> 补充 [ 添加修改页 ] 备注修改添加的功能
  <li> 补充账目详情页删除功能
</ul>

2020-07-01
<ul>
  <li> 修复添加修改页修改图标后项目 id 值取到图标 id 的问题
  <li> 修复添加修改页修改项目后，新增项目id异常导致修改异常的问题
  <li> 添加 Dialog 组件，用于信息提示
</ul>
