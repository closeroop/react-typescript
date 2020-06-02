### 说明
<ul>
  <li>1. webApp界面参考了<b>我的记账本</b> 手机App(安卓)。App参考截图放在了snapshot目录下。
  <li>2. 项目目标是完成 `我的记账本` 的全部功能，使用typescript进行代码静态检查。
  <li>3. 希望能够有所收获
</ul>

### 初始化项目
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
6.关于其他配置，脚手架已经做的很完善了，可根据自己要求自己拓展。

### 进程
<ul>
  <li> <a href="./chapter/part-01.md"> 1. 项目目录结构安排 </a> 
  <li> <a href="./chapter/part-02.md">2. 项目图标选择和Icon组件编写</a> 
  <li> 3. 首页头部支出收入编写
  <li> 4. 工具函数tools编写（根据需要添加新函数）
</ul>
