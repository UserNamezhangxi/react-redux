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





