'use strict';
import * as LoginTypes from '../constants/loginTypes';

let user = {
	name: 'zhangsan',
	age: 24
};

// 供外部调用的登陆接口
export function handleLogin() {
	return dispatch => {
		dispatch(isLoading());
		// 模拟网络登陆成功
		fetch('https://www.hao123.com')
			.then((res) => {
				dispatch(loginSuccess())
			})
			.catch((err) => {
				dispatch(loginError())
			})
	}

}

function isLoading() {
	return {
		type: LoginTypes.LOGIN_IN_DONING,
	}
}

function loginSuccess() {
	return {
		type: LoginTypes.LOGIN_IN_DONE,
		user: user
	}
}

function loginError() {
	return {
		type: LoginTypes.LOGIN_IN_ERROR,
	}
}
