# t

## 环境
```
node 14.15.0
```

## 第三方库版本介绍
[pdf.js](https://mozilla.github.io/pdf.js/) 版本: Stable (v2.14.305) 存放位置：src/libs/pdfjs

## Project setup
```
npm install
```


### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


### 目录介绍
```
├── README.md
├── babel.config.js
├── jsconfig.json
├── mock // 接口数据 mock
│   ├── index.js
│   └── system.js
├── package-lock.json
├── package.json
├── postcss.config.js
├── public // 不经过 webpack 编译的静态文件
│   ├── favicon.ico
│   └── index.html
├── src // 源码
│   ├── App.vue
│   ├── api // 接口
│   │   └── ucenter
│   ├── assets // 经过 webpack 编译的静态文件
│   │   ├── images
│   │   ├── logo.png
│   │   └── styles
│   ├── components // 公用组件
│   ├── directive // vue 指令
│   │   └── index.js
│   ├── filter // vue 过滤器
│   │   └── index.js
│   ├── layout // 页面通用布局
│   ├── libs // 第三方库
│   │   └── pdfjs
│   ├── main.js
│   ├── router // 路由
│   │   └── index.js
│   ├── store // 数据状态管理
│   │   ├── getters.js
│   │   ├── index.js
│   │   └── modules
│   ├── utils // 通用函数方法
│   │   ├── echarts.js
│   │   ├── elementUi.js
│   │   ├── moment.js
│   │   ├── ol.js
│   │   ├── rem.js
│   │   ├── requestAdmin.js
│   │   └── validate
│   └── view // 页面组件
└── vue.config.js
```
## git 使用规范

用于说明 commit 的类别，提交说明需添加前缀例如（feat: ）:后面加空格  
常见类别如下：

feat: 新增功能（feature）  
fix: 修复补丁（bug）  
docs: 修订文档，如 Readme, Change Log, Contribute 等  
refactor: 代码重构，未新增任何功能和修复任何 bug  
style: 仅调整空格、格式缩进等（不改变代码逻辑的变动）  
perf: 优化相关，改善性能和体验的修改  
test: 测试用例的增加/修改  
chore: 非 src 和 test 的修改  
merge: 合并分支或冲突等  
revert: 回滚到上一个版本  
build: 改变构建流程，新增依赖库、工具等（例如 webpack、maven 修改）  
ci: 自动化流程配置修改