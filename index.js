import {AppRegistry} from 'react-native';
import App from './App';
import Root from './src/Root';
//导入app(使用setState) 或者 root(使用redux) 做为加载工程，查看内存 和 cpu 消耗。
AppRegistry.registerComponent('ReduxDemo', () => Root);
