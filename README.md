# template_console

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev：base(项目名称)

# build for production with minification
npm run build：base(项目名称)/all

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


# 支持多入口文件

## 机构说明

``` 
src
	comm		// 公共文件
		assets
			css		
			images	
			js
				constant	// 存放常量
		components	
		mixin
		router
		service
		store
		view
	projectSrc	// 项目对应文件
		assets		
			css
			images
		view
		main.js
		app.vue
```

## 配置修改

prod.env.js
	声明变量
package.json
	通过cross-env控制变量
webpack.base.conf.js
	根据变量及结构修改entry，动态找到main.js
config.js
	根据变量及结构修改build,动态打包到相应项目文件
	



