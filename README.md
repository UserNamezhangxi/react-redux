# React-Redux 学习

`react-native` 的数据传递是父类传递给子类，子类通过`this.props.**` 读取数据，这样会造成组件多重嵌套，于是用`redux`可以更好的解决了数据和界面`View`之间的关系， 当然用到的是`react-redux`,是对`redux`的一种封装。

当然我个人局的使用`react-redux` 在频繁刷新`state`的场景下会提升性能。

`react`基础的概念包括：

1.	`action`是纯声明式的数据结构，只提供事件的所有要素，不提供逻辑，同时尽量减少在 `action` 中传递的数据

2.	`reducer`是一个匹配函数，`action`的发送是全局的，所有的`reducer`都可以捕捉到并匹配与自己相关与否，相关就拿走`action`中的要素进行逻辑处理，修改`store`中的状态，不相关就不对`state`做处理原样返回。`reducer`里就是判断语句

3.	`Store` 就是把以上两个联系到一起的对象，`Redux` 应用只有一个单一的 `store`。当需要拆分数据处理逻辑时，你应该使用`reducer`组合 而不是创建多个`store`。

4.	`Provider`是一个普通组件，可以作为顶层`app`的分发点，它只需要`store`属性就可以了。它会将`state`分发给所有被`connect`的组件，不管它在哪里，被嵌套多少层

5.	`connect`一个科里化函数，意思是先接受两个参数（数据绑定`mapStateToProps`和事件绑`mapDispatchToProps`）再接受一个参数（将要绑定的组件本身）。`mapStateToProps`：构建好`Redux`系统的时候，它会被自动初始化，但是你的`React`组件并不知道它的存在，因此你需要分拣出你需要的`Redux`状态，所以你需要绑定一个函数，它的参数是`state`，简单返回你需要的数据，组件里读取还是用`this.props.*`

6.	`container`只做`component`容器和`props`绑定，负责输入显示出来，`component`通过用户的要交互调用`action`这样就完整的流程就如此。



##代码实现步骤如下：

1、`type`:设定事件的所有类别。

2、`actions`:事件预处理过程

3、`reducer`：事件处理过程。

4、`store`：`统一管理应用的state`,`或者data`。

5、`provider`:让所有 `connect` 过的组件都能获取 `store` 的数据。

6、改变`state`通过`component`的`render`更新界面

OK,开始代码,实现一个小小的计数功能，如下:

![DEMO](https://i.imgur.com/Ka7ICcy.gif)

1、安装所需要的相关文件:

	npm install --save redux
	
	npm install --save react-redux
	
	npm install --save redux-thunk


2、`CounterTypes.js`:

	export const COUNT_INCRESS = 'COUNT_INCRESS';//+
	export const COUNT_DECRESS = 'COUNT_DECRESS';//-
	export const COUNT_RESET = 'COUNT_RESET';//R

3、`CounterAction.js`:
	
	'use strict';
	import * as CounterTypes from '../constants/CounterTypes';
	
	export const incress = () => {
		return {type: CounterTypes.COUNT_INCRESS};
	};
	
	export const descress = () => {
		return {type: CounterTypes.COUNT_DECRESS};
	};
	
	export const reset = () => {
		return {type: CounterTypes.COUNT_RESET};
	};

4、`CounterReducer.js` 根据需要在收到相关的`action`时操作`state`:

	'use strict';
	import * as CouterTypes from '../constants/CounterTypes';
	
	const defaultState = {
		count: 5,
		factor: 1,
	};
	
	export default function counter(state = defaultState, action) {
	
		switch (action.type) {
			case CouterTypes.COUNT_INCRESS:
				return {
					...state,
					count: state.count + state.factor,
	
				}
				break;
			case CouterTypes.COUNT_DECRESS:
				return {
					...state,
					count: state.count - state.factor,
				}
				break;
			case CouterTypes.COUNT_RESET:
				return {
					...state,
					count: 0,
				}
				break;
			default:
				return {
					...state
				}
		}
	}

5、`reducers`可以有多个，所以我们需要通过在同级目录下创建`index.js`,来进行管理多个`reduces`:
	
	'use strict';
	
	import {combineReducers} from 'redux';
	import login from './loginReducer';
	import counter from './CounterReducer';
	
	const rootReducter = combineReducers({
		login: login,
		//类似在Reducer 的login方法都可以写在此处
		counter: counter
	});
	
	export default rootReducter;

> 注：在这里`login`是另外一个`Reducer`.与`counter `逻辑相同，暂且忽略。

6、创建`store.js`: 全局仅此一个`store`
	
	'use strict';
	
	import {createStore, applyMiddleware} from 'redux';
	
	import thunkMiddleware from 'redux-thunk';
	
	import rootReducer from '../reducers/index';
	
	const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);
	
	export default function configureStore(initialState) {
	
		const store = createStoreWithMiddleware(rootReducer, initialState);
	
		return store;
	
	}

至此redux的几大部分都创建完毕, 非视图部分已基本完成.下一步就是引入项目中. 创建Root.js和Counter.js.


7、`Root.js`

	import React, {Component} from 'react';
	
	import {Provider} from 'react-redux';
	
	import configureStore from './store/ConfigureStore';
	
	import App from './container/App';// app的入口
	import Count from './container/Counter';// app的入口
	
	const store = configureStore();
	
	export default class Root extends Component {
	
		render() {
			return (
				<Provider store={store}>
					<Count/>
				</Provider>
			)
		}
	}
> 使用`Provider`将引用的控件包裹起来，传入`store`属性

8、`Counter.js`

	import React, {Component} from 'react';
	import {
		AppRegistry,
		StyleSheet,
		Text,
		View,
		TouchableOpacity
	} from 'react-native';
	import {incress, descress, reset} from './../actions/CounterAction';
	import {connect} from 'react-redux'; // 引入connect函数
	class Counter extends Component {
		constructor(props) {
			super(props);
			this.state = {count: 5}
		}
	
	
		_onPressReset() {
			this.props.dispatch(reset())
		}
	
		_onPressInc() {
			//为了测试性能，在这里触发一次循环+1000。
			for (let i = 0; i < 1000; i++) {
				this.props.dispatch(incress())
			}
		}
	
		_onPressDec() {
			this.props.dispatch(descress())
		}
	
		render() {
			return (
				<View style={styles.container}>
					<Text style={styles.counter}>{this.props.counters.count}</Text>
					<TouchableOpacity style={styles.reset} onPress={() => this._onPressReset()}>
						<Text>归零</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.start} onPress={() => this._onPressInc()}>
						<Text>加1</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.stop} onPress={() => this._onPressDec()}>
						<Text>减1</Text>
					</TouchableOpacity>
				</View>
			);
		}
	}
	
	const styles = StyleSheet.create({
		container: {
			flex: 1,
			alignItems: 'center',
			justifyContent: 'center',
			flexDirection: 'column'
		},
		counter: {
			fontSize: 50,
			marginBottom: 70
		},
		reset: {
			margin: 10,
			padding: 10,
			backgroundColor: 'yellow'
		},
		start: {
			margin: 10,
			padding: 10,
			backgroundColor: 'yellow'
		},
		stop: {
			margin: 10,
			padding: 10,
			backgroundColor: 'yellow'
		}
	});
	
	const mapStateToProps = state => ({
		counters: state.counter
	});
	
	export default connect(mapStateToProps)(Counter);

## 最终实现完成，整理一张图，代码逻辑如下：
![代码实现逻辑](https://i.imgur.com/KehF7pd.png)

## 附：性能对比

最后在整个工程入口文件 `index.js`导入app(使用setState) 或者 root(使用redux) 做为加载工程，通过as 的adb工具查看内存 和 cpu 消耗

![性能消耗对比](https://i.imgur.com/f63thV0.png)